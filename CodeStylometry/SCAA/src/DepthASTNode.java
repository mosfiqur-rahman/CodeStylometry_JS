import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;


public class DepthASTNode {

	public static void main(String[] args) throws Exception, IOException, InterruptedException {
		String dataDir ="/Users/Aylin/Desktop/Drexel/2014/ARLInternship/"
				+ "SCAA_Datasets/AnalysisCode/for/";
		String fileName =dataDir+"simpleforlabels.dep";
		String[] DepASTTypes = FeatureCalculators.uniqueDepASTTypes(dataDir);
		String featureText = Util.readFile( fileName);
		float [] depFeature =getAvgDepthASTNode(featureText,DepASTTypes);
		for(int i=0;i<depFeature.length;i++)
			System.out.println(DepASTTypes[i]+","+depFeature[i]);

	}
	public static float[] getJSAvgDepthASTNode(String featureText, String[] ASTTypes) throws IOException
	{
		// lines = {line of first function ID, line of second function ID, line of ith functionID,,,}
		float [] avgDepth=new float[ASTTypes.length];
		int[] occurrences = new int[ASTTypes.length];

		// lines = {line of first function ID, line of second function ID, line of ith functionID,,,}
		//int [] lines = getASTDepLines(featureText);
		int [] totalDepth=new int[ASTTypes.length];
		List<String> lines = IOUtils.readLines(new StringReader(featureText));
		// again... only iteration the first .depfile line of each function
		for (int i=0; i<lines.size()-1; i++)
		{
			// debug line
			//System.out.println("line "+i);
			//System.out.println(lines.get(i));
			for (int j=0; j< ASTTypes.length; j++){
				if(lines.get(i).contains(ASTTypes[j])){
					// debug line
					//System.out.println(i+" FOUND!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					occurrences[j]++;
					totalDepth[j] = totalDepth[j]+lines.get(i).indexOf("t");
				}
			}
		}
		for (int j=0; j< ASTTypes.length; j++){
			if(occurrences[j] == 0){
				avgDepth[j] =0;
			}else{
				avgDepth[j]= totalDepth[j]/occurrences[j];

			}// debug output
			//System.out.println(ASTTypes[j]+" avgDepth: "+avgDepth[j] + " of  "+occurrences[j]+" in total");
		}
		return avgDepth;
	}

	public static float[] getAvgDepthASTNode(String featureText, String[] ASTTypes) throws IOException
	{
		// lines = {line of first function ID, line of second function ID, line of ith functionID,,,}
		int [] lines = getASTDepLines(featureText);
		float [] occurrences=new float[ASTTypes.length];
		float [] totalDepth=new float[ASTTypes.length];
		float [] avgDepth=new float[ASTTypes.length];

		String textAST=null;
		for (int i=0; i<lines.length; i++)
		{
			textAST = readLineNumber(featureText, lines[i]);
			for (int j=0; j< ASTTypes.length; j++)
			{
				String str = ASTTypes[j].toString();
				WholeWordIndexFinder finder = new WholeWordIndexFinder(textAST);
				List<IndexWrapper> occurrencesHere = finder.findIndexesForKeyword(str);
				occurrences[j] = occurrences[j] + occurrencesHere.size();


				for(int k=0; k<occurrencesHere.size(); k++)
				{
					int rightParanthesis =0;//(
					int leftParanthesis =0;//)

					for (Character c: textAST.substring(0,occurrencesHere.get(k).getStart()).toCharArray()) {
						if (c.equals('(')) {
							rightParanthesis++;
						}
						if (c.equals(')')) {
							leftParanthesis++;
						}
					}
					totalDepth[j]= totalDepth[j]+rightParanthesis-leftParanthesis;
				}

				if(occurrences[j]==0)
//			  		avgDepth[j]=-1;
					avgDepth[j]=0;

				else if (totalDepth[j]==0)
					avgDepth[j]=0;
				else
					avgDepth[j]= totalDepth[j]/occurrences[j];
			}
		}
		return avgDepth;
	}


	//Caller is FeatureExtractor
	//arg1 = content of dep file
	//arg2 = String of unique words in dep file
	public static int getMaxDepthASTLeaf(String featureText, String[] ASTTypes) throws IOException
	{
		// lines = {line of first function ID, line of second function ID, line of ith functionID,,,}
		int [] lines = getASTDepLines(featureText);
		int [] occurrences=new int[ASTTypes.length];
		int [] maxDepth=new int[ASTTypes.length];

		String textAST=null;
		// again... only iteration the first .depfile line of each function
		for (int i=0; i<lines.length; i++)
		{

			textAST = readLineNumber(featureText, lines[i]);
			for (int j=0; j< ASTTypes.length; j++)
			{
				String str = ASTTypes[j].toString();
				WholeWordIndexFinder finder = new WholeWordIndexFinder(textAST);
				List<IndexWrapper> occurrencesHere = finder.findIndexesForKeyword(str);
				occurrences[j] = occurrences[j] + occurrencesHere.size();


				for(int k=0; k<occurrencesHere.size(); k++)
				{
					int rightParanthesis =0;//(
					int leftParanthesis =0;//)

					// for a certain word/expression looks how many unclosed paranthesis existe before
					// thereby gets how deeply nested the word/expression is used
					for (Character c: textAST.substring(0,occurrencesHere.get(k).getStart()).toCharArray()) {
						if (c.equals('(')) {
							rightParanthesis++;
						}
						if (c.equals(')')) {
							leftParanthesis++;
						}
					}
					// saves the deepest use
					if((rightParanthesis-leftParanthesis) > maxDepth[j])
						maxDepth[j]= rightParanthesis-leftParanthesis;
				}

				if(occurrences[j]==0)
					maxDepth[j]=0;
			}
		}
		List<Integer> maxDepthall = Arrays.asList(ArrayUtils.toObject(maxDepth));
		// casted 'comparable' output of .max() to Integer
		return Collections.max(maxDepthall);

	}

	// needs .ast file as input
	// doesnt use ASTTypes[]
	// returns array of max depths, but no reference array (no asttypes)
	public static int getJSMaxDepthASTLeaf(String featureText, String[] ASTTypes) throws IOException
	{
		// lines = {line of first function ID, line of second function ID, line of ith functionID,,,}
		//int [] lines = getASTDepLines(featureText);
		int [] maxDepth=new int[ASTTypes.length];
		List<String> lines = IOUtils.readLines(new StringReader(featureText));
		// again... only iteration the first .depfile line of each function
		for (int i=0; i<lines.size()-1; i++)
		{
			for (int j=0; j< ASTTypes.length; j++){
				if( lines.get(i).contains(ASTTypes[j])){
					if(maxDepth[j] < lines.get(i).indexOf("\"")){
						// debug line
						//System.out.println("Max Depth of "+ASTTypes[j]+ ", alt: "+ maxDepth[j] + " neu: "+ lines.get(i).indexOf("\"")+" at line "+i);
						maxDepth[j] = lines.get(i).indexOf("\"");
					}
				}
			}
		}
		List<Integer> maxDepthall = Arrays.asList(ArrayUtils.toObject(maxDepth));
		// casted 'comparable' output of .max() to Integer
		// actually this is super stupid, it would be enoough to walk lines and count whitespaces
		return Collections.max(maxDepthall);

	}


	//line number starts from 0
	public static int[] getASTDepLines(String featureText)
	{

		// functionIDs is used to count how many IDs there are and scale array ASTDepLines[]
		HashSet<String> functionIDs = new HashSet<String>();
		// helps to write functionIDs in ASTDepLines[] to the index of their first occurence
		HashSet<String> functionIDs2 = new HashSet<String>();

		//take the function id in the beginning of the line.

		// split .dep file into lines store line content into array
		String[] lines = featureText.split("\n");
		// stores first functionID occurence to functionIDs
		for(int i=0; i< lines.length; i++)
		{
			String firstWord = "";
			// sourrounded with if statement so non-occurence does not throw error
			if(featureText.indexOf('\t') > -1){
				if(!lines[i].isEmpty()){
					firstWord = lines[i].substring(0, featureText.indexOf('\t'));
				}
			}
			if(!functionIDs.contains(firstWord))
				functionIDs.add(firstWord);
		}
		// new Integer Array of same size as HashSet functionIDs
		int [] ASTDepLines=new int[functionIDs.size()];

		// stores linenumber of first occurence of each functionID to ASTDepLines[]
		for(int i=0; i< lines.length; i++)
		{
			// sourrounded with if statement so non-occurence does not throw error
			String firstWord = "";
			if(featureText.indexOf('\t') > -1){
				if(!lines[i].isEmpty()){
					firstWord = lines[i].substring(0, featureText.indexOf('\t'));
				}
			}
			if(i==0)
			{
				functionIDs2.add(firstWord);
			}
			else
			{
				if(!functionIDs2.contains(firstWord))
				{
					int lineNumber = i-1;
					ASTDepLines[functionIDs2.size()-1] = lineNumber;
				}
				// if last line
				if(i==lines.length-1)
				{
					int lineNumber = i;
					ASTDepLines[functionIDs2.size()-1] = lineNumber;
				}
				// first wird is only add if NEW
				// remember: funcutionIDs2 is a HashSet!!!
				functionIDs2.add(firstWord);
			}
		}
		// looks somehow like: {line0,line1,line i,,line n}
		return ASTDepLines;
	}


	//starts from 0
	public static String readLineNumber (String featureText, int lineNumber) throws IOException
	{
		// reads featureText into a List of lines, returns the chosen line "lineNumber" which contains the CODE of that line
		List<String> lines = IOUtils.readLines(new StringReader(featureText));
		return lines.get(lineNumber);
	}

	public static float[] InfoGainsgetAvgDepthASTNode(String featureText, String[] ASTtypesAvgDepth) throws IOException
	{

		int [] lines = getASTDepLines(featureText);
		float [] occurrences=new float[ASTtypesAvgDepth.length];
		float [] totalDepth=new float[ASTtypesAvgDepth.length];
		float [] avgDepth=new float[ASTtypesAvgDepth.length];

		String textAST=null;
		for (int i=0; i<lines.length; i++)
		{
			textAST = readLineNumber(featureText, lines[i]);
			for (int j=0; j< ASTtypesAvgDepth.length; j++)
			{
				String str = ASTtypesAvgDepth[j].toString();
				WholeWordIndexFinder finder = new WholeWordIndexFinder(textAST);
				List<IndexWrapper> occurrencesHere = finder.findIndexesForKeyword(str);
				occurrences[j] = occurrences[j] + occurrencesHere.size();


				for(int k=0; k<occurrencesHere.size(); k++)
				{
					int rightParanthesis =0;//(
					int leftParanthesis =0;//)

					for (Character c: textAST.substring(0,occurrencesHere.get(k).getStart()).toCharArray()) {
						if (c.equals('(')) {
							rightParanthesis++;
						}
						if (c.equals(')')) {
							leftParanthesis++;
						}
					}
					totalDepth[j]= totalDepth[j]+rightParanthesis-leftParanthesis;
				}

				if(occurrences[j]==0)
//			  		avgDepth[j]=-1;
					avgDepth[j]=0;

				else if (totalDepth[j]==0)
					avgDepth[j]=0;
				else
					avgDepth[j]= totalDepth[j]/occurrences[j];
			}
		}
		return avgDepth;
	}


}