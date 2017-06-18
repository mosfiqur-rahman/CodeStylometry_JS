import java.io.*;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.script.ScriptException;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

/**
 * Calculators.
 * These features are currently being extended.
 * 
 * @author Mosfiqur Rahman (mosfiqur.rahman@drexel.edu)
 **/


public class FeatureCalculators {
	

	public  FeatureCalculators(){}

	public static void main(String[] args) throws Exception, IOException, InterruptedException
	{
		String testFolder  =  "/home/xps/workspace/js_work/js_esprima/js_dataset/";
		
		List test_file_paths = Util.listJSFiles(testFolder);

		for(int i = 0; i < test_file_paths.size(); i++)
		{
			System.out.println(test_file_paths.get(i).toString());
		}
	}
        
	public static String[] uniqueASTTypes(String  dirPath) throws IOException
	{
		List test_file_paths = Util.listASTFiles(dirPath);
		HashSet<String> uniqueWords = new HashSet<String>();

		for(int i = 0; i < test_file_paths.size(); i++)
		{
			String filePath = test_file_paths.get(i).toString();

			String inputText = Util.readFile(filePath);
			Pattern pattern = Pattern.compile("type:(.*?)\n");
			Matcher matcher = pattern.matcher(inputText);

			while(matcher.find())
			{
				uniqueWords.add(matcher.group(1));
			}
		}
				String[] words = uniqueWords.toArray(new String[0]);

			return words;
	}
 
	public static String[] uniqueAPISymbols (String dirPath) throws IOException
	{
		List test_file_paths = Util.listTextFiles(dirPath);
		HashSet<String> uniqueWords = new HashSet<String>();

		for(int i = 0; i < test_file_paths.size(); i++)
		{
			String filePath = test_file_paths.get(i).toString();

			String inputText = Util.readFile(filePath);
			Pattern pattern = Pattern.compile("u'(.*?)'");
			Matcher matcher = pattern.matcher(inputText);

			while(matcher.find())
			{
				uniqueWords.add(matcher.group(1));
			}
		}		
		String[] words = uniqueWords.toArray(new String[0]);

		return words;
	}
     
	public static String[] uniqueDepASTTypes(String dirPath) throws IOException
	{
		List test_file_paths = Util.listDepFiles(dirPath);
		HashSet<String> uniqueWords = new HashSet<String>();

		for(int i = 0; i < test_file_paths.size(); i++)
		{
			String filePath = test_file_paths.get(i).toString();

			String inputText = Util.readFile(filePath);
			Pattern pattern = Pattern.compile("([\\w']+)");
			Matcher matcher = pattern.matcher(inputText);

			while(matcher.find())
			{
				uniqueWords.add(matcher.group(1));
			}
		}
		String[] words = uniqueWords.toArray(new String[0]);

		return words;
	}
   
	public static String[] wordUnigramsJS(String dirPath) throws IOException
	{
		List test_file_paths = Util.listJSFiles(dirPath);
		String[] words = null;

		for(int i= 0; i < test_file_paths.size(); i++)
		{
			String filePath = test_file_paths.get(i).toString();

			String inputText = Util.readFile(filePath);
			String [] arr = inputText.split("\\s+");
			words = ArrayUtils.addAll(words, arr);
		}
		HashSet<String> uniqueWords = new HashSet<String>(Arrays.asList(words));
		words = uniqueWords.toArray( new String[0]);

		return words;		
	}
     
	public static float[] WordUnigramTF(String featureText, String [] wordUnigrams)
	{
		float symbolCount = wordUnigrams.length;
		float[] counter = new float [(int)symbolCount];

		for(int i = 0; i < symbolCount; i++)
		{
			//if case insensitive, make lowercase
			String str = wordUnigrams[i].toString();

			//if case insensitive, make lowercase
			//counter[i] = StringUtils.countMatches(featureText.toLowerCase(), str);
			//else
			counter[i] = StringUtils.countMatches(featureText, str);
		}
		return counter;
	}

	public static  float[] APISymbolTF(String featureText, String[] APISymbols)
	{
		float symbolCount = APISymbols.length;
		float[] counter = new float[(int) symbolCount];

		for(int i = 0; i < symbolCount; i++)
		{
			//if case insensitive, make lowercase
			//String str = APISymbols[i].toString().toLowerCase();
			//else
			String str = "u'"+APISymbols[i].toString()+"'";

			//if case insensitive, make lowercase
			//counter[i] = StringUtils.countMatches(featureText.toLowerCase(), str);
			//else
			counter[i] = StringUtils.countMatches(featureText, str);
		}
		return counter;
	}
     
	public static float APISymbolIDF (String datasetDir, String APISymbol ) throws IOException
	{
		float counter = 0;
		float IDFcounter = 0;

		File file = new File(datasetDir);
		String[] directories = file.list(new FilenameFilter()
		{		
			@Override
			public boolean accept(File current, String name) 
			{
				return new File(current, name).isDirectory();
			}
		});

		int dirLen = directories.length;
			
		for(int j=0; j< dirLen; j++)
		{
			String authorName = directories[j];
			List test_file_paths = Util.listTextFiles(datasetDir+authorName+"/");

			for(int i=0; i< test_file_paths.size(); i++)
			{
				String featureText = Util.readFile(test_file_paths.get(i).toString());
				String str = "u'"+APISymbol+"'";
				int termFrequencyAuthor = StringUtils.countMatches(featureText, str);  	

			if (termFrequencyAuthor>0)
				counter++;
			}		 
			
			if(counter>0)
				IDFcounter++;
			 		
		}

		if (IDFcounter==0)
		{
			return 0;
		}

		return (float) ((Math.log(dirLen/IDFcounter))/ (Math.log(2)));
	}

	public static float [] APISymbolTFIDF (String featureText, String datasetDir,String[] APISymbols ) throws IOException
	{    
		float symbolCount = APISymbols.length;
		float[] tf = APISymbolTF(featureText, APISymbols);

		float idf = 0;
		float [] counter = new float[(int) symbolCount];

		for (int i =0; i<symbolCount; i++)
		{
			//if case insensitive, make lowercase
			//String str = APISymbols[i].toString().toLowerCase();
			//else			
			String str = "u'"+APISymbols[i].toString()+"'";

			if ((tf[i] != 0) )
			{
				idf = APISymbolIDF(datasetDir, APISymbols[i].toString());
			}
			else 
			{
				idf =0;    		
			}
		    	 
			if ((tf[i] != 0) && (idf != 0))
				counter[i] = tf[i] * idf;
			else
				counter[i]=0;     
		}

		return counter;
	}  
     
	public static float [] DepASTTypeTF (String featureText, String[] ASTTypes )
	{    
		float symbolCount = ASTTypes.length;
		float [] counter = new float[(int) symbolCount];

		for (int i =0; i<symbolCount; i++)
		{
			//if case insensitive, make lowercase
			//do they ever appear withuot the paranthesis?
			String str = ASTTypes[i].toString();
			String str1 = "(" + str + ")";
			String str2 = "(" + str + "(";
			String str3 = ")" + str + ")";
			String str4 = ")" + str + "(";

			//if case insensitive, make lowercase
			counter[i] =  StringUtils.countMatches(featureText, str1) 
									+StringUtils.countMatches(featureText, str2)
									+StringUtils.countMatches(featureText, str3)
									+StringUtils.countMatches(featureText, str4);
		}
		return counter;
	}   
	
	public static float DepASTTypeIDF (String datasetDir, String ASTType ) throws IOException
	{    
		float counter = 0;
		float IDFcounter = 0;

		File file = new File(datasetDir);
		String[] directories = file.list(new FilenameFilter() 
		{
			@Override
			public boolean accept(File current, String name) 
			{
				return new File(current, name).isDirectory();
			}
		});

		float dirLen = directories.length;
		for(int j=0; j< dirLen; j++)
		{
			String authorName = directories[j];
			List test_file_paths = Util.listDepFiles(datasetDir+authorName+"/");

			for(int i=0; i< test_file_paths.size(); i++)
			{
				String featureText = Util.readFile(test_file_paths.get(i).toString());
				String str = ASTType;

				int termFrequencyAuthor = StringUtils.countMatches(featureText, str);  	
				if(termFrequencyAuthor>0)
					counter++;
			} 

			if(counter>0)
				IDFcounter++;
			 		
		}
		if (IDFcounter==0)
		{
			return 0;
		}
		return (float) ((Math.log(dirLen/IDFcounter))/ (Math.log(2)));	
	}
	
	public static float [] DepASTTypeTFIDF (String featureText, String datasetDir, String[] DepASTTypes ) throws IOException
	{    
		float symbolCount = DepASTTypes.length;
		float idf = 0;
		float[] tf = DepASTTypeTF(featureText, DepASTTypes);
		float [] counter = new float[(int) symbolCount];
		//tf = StringUtils.countMatches(featureText, str);  	

		for (int i =0; i<symbolCount; i++)
		{
			//if case insensitive, make lowercase
			//String str = DepASTTypes[i].toString().toLowerCase();
				 
			//if case insensitive, make lowercase
			//strcounter = StringUtils.countMatches(featureText.toLowerCase(), str);
			
			if ((tf[i] != 0))
			{
				idf = DepASTTypeIDF(datasetDir, DepASTTypes[i].toString());
			}
			else
			{
				idf =0;
			}

			if ((tf[i] != 0) && (idf != 0))
				counter[i] = tf[i] * idf;
			else
				counter[i]=0;
		}
		return counter;
	}

	public static float [] ASTTypeTF (String featureText, String[] ASTTypes )
	{    
		float symbolCount = ASTTypes.length;
		float [] counter = new float[(int) symbolCount];

		for (int i =0; i<symbolCount; i++)
		{
			//if case insensitive, make lowercase
			//String str = APISymbols[i].toString().toLowerCase();
			String str = "type:"+ASTTypes[i].toString()+"\n";
			//if case insensitive, make lowercase
			//strcounter = StringUtils.countMatches(featureText.toLowerCase(), str);
			counter[i] = StringUtils.countMatches(featureText, str);  	   
		}
		return counter;
	}

	public static float ASTTypeIDF (String datasetDir, String ASTType ) throws IOException
	{    
		float counter = 0;
		float IDFcounter=0;
		File file = new File(datasetDir);
		String[] directories = file.list(new FilenameFilter()
		{
			@Override
			public boolean accept(File current, String name) 
			{
				return new File(current, name).isDirectory();
			}
		});

		float dirLen = directories.length;

		for(int j=0; j< dirLen; j++)
		{
			String authorName = directories[j];
			List test_file_paths = Util.listASTFiles(datasetDir+authorName+"/");

			for(int i=0; i< test_file_paths.size(); i++)
			{
				String featureText = Util.readFile(test_file_paths.get(i).toString());
				String str = "type:"+ASTType+"\n";
				int termFrequencyAuthor = StringUtils.countMatches(featureText, str);  	

				if (termFrequencyAuthor>0)
					counter++;
			}	 
			if(counter>0)
				IDFcounter++;
			 		
		}
		if (IDFcounter==0)
		{
			return 0;
		}
		return (float) ((Math.log(dirLen/IDFcounter))/ (Math.log(2)));
	}			
	
	public static float [] ASTTypeTFIDF (String featureText, String datasetDir, String[] ASTTypes ) throws IOException
	{    
		float symbolCount = ASTTypes.length;
		float idf = 0;
		float[] tf = ASTTypeTF(featureText, ASTTypes);
		float [] counter = new float[(int) symbolCount];

		for (int i =0; i<symbolCount; i++)
		{
			//if case insensitive, make lowercase
			//String str = APISymbols[i].toString().toLowerCase();
			String str = "type:"+ASTTypes[i].toString()+"\n";
		  	 
			//if case insensitive, make lowercase
			//strcounter = StringUtils.countMatches(featureText.toLowerCase(), str);
		  	 
			if((tf[i] != 0))
			{
				idf = ASTTypeIDF(datasetDir, ASTTypes[i].toString());
			}
			else
			{
				idf =0;
			}
			counter[i] = tf[i] * idf;
			if((tf[i] != 0) && (idf != 0))
				counter[i] = tf[i] * idf;
			else
				counter[i]=0; 
		}
		return counter;
	}   
     
	public static float wordCountIndex(String inputText)
	{
		//returns the word count separated by spaces
		if (inputText == null)
			return 0;
			return inputText.trim().split("\\s+").length;
	}
  
	public static void wordsCount (String featureText) throws IOException 
	{
		String[] splitted = featureText.split(" ");
		HashMap hm = new HashMap();
		int x;
			   
		for (int i = 0; i < splitted.length; i++) 
		{
			if (!hm.containsKey(splitted[i]))
			{
				hm.put(splitted[i], 1);
			} 
			else
			{
				hm.put(splitted[i], (Integer) hm.get(splitted[i]) + 1);
			}
		}
			   
		for (Object word : hm.keySet())
		{
			System.out.println(word + " " + (Integer) hm.get(word));
		}
	}

	public static int functionIDCount (String featureText)
	{
		int counter = 0;
		String str = "FunctionId";
		counter = StringUtils.countMatches(featureText, str);

		return counter;
	}   
		   
	public static int CFGNodeCount (String ASTText)
	{
		int counter = 0;
		String str = "isCFGNode:";
		counter = StringUtils.countMatches(ASTText, str);

		return counter;
	}      
		   
	public static int ASTFunctionIDCount (String ASTText)
	{
		int counter = 0;
		String str = "functionId:";
		counter = StringUtils.countMatches(ASTText, str);

		return counter;
	} 
   
	public static float averageASTDepth (String ASTText)
	{    
		float ASTFunctionIDCountNo = ASTFunctionIDCount(ASTText);
		float counter = 0;   
		   
		//   String str1 = ")";
		//   String str2 = "(";

		String lines[] =  ASTText.split("\\n");
		for (int i =0; i<lines.length; i++)
		{
			if (lines[i].startsWith("functionId:"))
			{
				for(char c : lines[i].toCharArray())
				{
					if(c == ')' )
					{
						counter++;
					}
					if(c == '(' )
					{
						counter++;
					}

					//counter = counter + StringUtils.countMatches(ASTText, str1);
					//counter = counter + StringUtils.countMatches(ASTText, str2);
				}	   
			}
		}
		//return counter;
		return counter/ASTFunctionIDCountNo;
	}  
   
	public static int DictionaryIndex (String inputText)
	{
		String [] dictionaryWords = {"a choice",	"a lie",   "your option"};

		int counter = 0;
		int privacyPhraseCount = dictionaryWords.length;

		for (int i =0; i<privacyPhraseCount; i++)
		{
			int strcounter=0;
			String str = dictionaryWords[i].toString().toLowerCase();
			//if case insensitive, make lowercase
			strcounter = StringUtils.countMatches(inputText.toLowerCase(), str);
			counter=counter+strcounter;
		}   
		return counter;
	}

	public static int countQuotesIndex (String inputText)
	{
		int quote_score =0;

		for (Character c: inputText.toCharArray()) 
		{
			if (c.equals('\"')) 
			{
				quote_score++;
			}
		}
		return quote_score;
	}	
   
	public static float [] getJSKeywordsTF(String sourceCode)
	{
		String [] JSKeywords = {	"do", "if", "in", "for", "let","new", "try", "var", "case", "else", "enum", "eval", "this", "true", "void",
									"with", "await", "break", "catch", "class", "const", "false", "super", "throw","while", "yield", 
									"delete", "export", "import", "public","return","static", "switch", "typeof", "default", "extends",
									"finally","package", "private", "continue", "debugger", "function", "arguments","interface",
									"protected", "implements", "instanceof", "await","int", "byte", "goto", "long", "final", "float",
									"short", " double", " native", " throws", " boolean", " abstract", " volatile", " transient",
									"synchronized", " NaN", " Infinity", " undefined"	};
				  
		float symbolCount = JSKeywords.length;
		float [] counter = new float[(int) symbolCount];

		for (int i =0; i<symbolCount; i++)
		{
			String str = JSKeywords[i].toString();
			counter[i] = StringUtils.countMatches(sourceCode, str);  	   
		}
		return counter;
	}
	  
	public static float [] InfoGainsDepASTTypeTF(String featureText,String[] ASTtypesTF)
	{	  
		float symbolCount = ASTtypesTF.length;
		float [] counter = new float[(int) symbolCount];

		for (int i =0; i<symbolCount; i++)
		{
			//if case insensitive, make lowercase
			//String str = APISymbols[i].toString().toLowerCase();
			//do they ever appear withuot the paranthesis?
			String str = ASTtypesTF[i].toString();
			String str1 = "(" + str + ")";
			String str2 = "(" + str + "(";
			String str3 = ")" + str + ")";
			String str4 = ")" + str + "(";

			//if case insensitive, make lowercase
			//strcounter = StringUtils.countMatches(featureText.toLowerCase(), str);
			counter[i] = StringUtils.countMatches(featureText, str1) 
						+StringUtils.countMatches(featureText, str2)
						+StringUtils.countMatches(featureText, str3)
						+StringUtils.countMatches(featureText, str4); 
		}
		return counter;		  
	}
			
	public static float [] InfoGainsDepASTTypeTFIDF (String featureText, String datasetDir, String[] ASTtypesTFIDF ) throws IOException
	{    
		float symbolCount = ASTtypesTFIDF.length;
		float idf = 0;
		float[] tf = DepASTTypeTF(featureText, ASTtypesTFIDF);
		float [] counter = new float[(int) symbolCount];
		//tf = StringUtils.countMatches(featureText, str);  	

		for (int i =0; i<symbolCount; i++)
		{
			//if case insensitive, make lowercase
			//String str = APISymbols[i].toString().toLowerCase();
			//String str = DepASTTypes[i].toString();
				 
			//if case insensitive, make lowercase
			//strcounter = StringUtils.countMatches(featureText.toLowerCase(), str);
			
			if ((tf[i] != 0))
			{
				idf = DepASTTypeIDF(datasetDir, ASTtypesTFIDF[i].toString());
			}
			else
			{
				idf =0;
			}
			if ((tf[i] != 0) && (idf != 0))
				counter[i] = tf[i] * idf;
			else
				counter[i]=0;
		}
		return counter;
	}

	public static float [] getInfoGainJSKeywordsTF(String sourceCode, String [] JSKeywords )
	{		  
		float symbolCount = JSKeywords.length;
		float [] counter = new float[(int) symbolCount];

		for (int i =0; i<symbolCount; i++)
		{
			String str = JSKeywords[i].toString();
			counter[i] = StringUtils.countMatches(sourceCode, str);  	   
		}
		return counter;
	}
}	
	
	