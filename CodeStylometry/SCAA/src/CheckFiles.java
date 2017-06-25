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

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;


public class CheckFiles {

	public static void main(String[] args) throws Exception, IOException, InterruptedException {

		String testFolder="githubManySmallSnippets/";
		cleanNonCPPFromFolder(testFolder);

		//to add .c to decompiled filenames
		String testFolder_compiled ="/Users/Aylin/Desktop/Princeton/BAA/"
				+ "datasets/c++/14FilesPerAuthor_2014_decompiledC/";
//	addDotCToDecompiledFileName(testFolder_compiled);

		String testFolder_compiled2 ="/Users/Aylin/Desktop/Princeton/BAA/"
				+ "datasets/c++/14FilesPerAuthor_2014_decompiledC/";
		//rearrangeFolders(testFolder_compiled2);


		//to clean files produced by joern
		String cleanFolder="/Users/Aylin/Desktop/Princeton/BAA/"
				+ "datasets/c++/14FilesPerAuthor_2014_decompiledC_half/";

		String arffFile1 = "/Users/Aylin/Desktop/Princeton/BAA/arffs/"
				+ "C_62Authors14files_decompiledfrom2C++.arff/";



		//to change a particular feature (authorname)
//	fixArffFeature(arffFile1);
	
/*	   String depFileName=null;
       List test_cpp_paths = Util.listCPPFiles(testFolder); //use this for preprocessing
       List test_all_paths = Util.listAllFilesFolders(testFolder); //use this for preprocessing 
       List test_c_paths = Util.listCFiles(testFolder_compiled); //use this for preprocessing
       System.out.println(test_cpp_paths.size());
       System.out.println(test_all_paths.size());
       System.out.println(test_c_paths.size());
 */
	}


	public static void rearrangeFolders(String testFolder_compiled) throws IOException
	{
		//add .c to each filename
//	List test_file_paths = Util.listAllFilesFolders(testFolder_compiled); //use this for preprocessing 
		List test_file_paths = Util.listAllFiles(testFolder_compiled); //use this for preprocessing

		for(int k=0; k< test_file_paths.size(); k++){
			System.out.println(test_file_paths.get(k).toString() + " "+k);



			File testFiles = new File(test_file_paths.get(k).toString());
			File[] children = testFiles.listFiles();
			if(children==null)
			{
/*					 if(test_file_paths.get(k).toString().
							 substring(0,test_file_paths.get(k).toString().length()-2).contains(".c")){*/
				File firstParent = new File(testFiles.getParent());
				File toMove = new File(firstParent.getParent());
				System.out.println("to move path: "+toMove.getPath());
				System.out.println("moved to1: "+toMove.getPath() + "/" + testFiles.getName() );

				testFiles.renameTo(new File(toMove.getPath() + "/" + testFiles.getName() ));
				System.out.println("moved to2: "+ testFiles.getPath());
				//	 testFiles.delete();
				firstParent.delete();
			}

		}

	}

	public static void addDotCToDecompiledFileName(String testFolder_compiled) throws IOException
	{
		//add .c to each filename
//	List test_file_paths = Util.listAllFilesFolders(testFolder_compiled); //use this for preprocessing 
		List test_file_paths = Util.listAllFiles(testFolder_compiled); //use this for preprocessing

		for(int k=0; k< test_file_paths.size(); k++){
			System.out.println(test_file_paths.get(k).toString() + " "+k);



			File testFiles = new File(test_file_paths.get(k).toString());
			File[] children = testFiles.listFiles();
			if(children==null)
			{
				if(!test_file_paths.get(k).toString().contains(".DS_Store")){
					File newFile = new File(test_file_paths.get(k).toString() + ".c");
					System.out.println(newFile.getPath());
					testFiles.renameTo(newFile);
					System.out.println("newCfile");

					if(!newFile.exists()) {

						newFile.createNewFile();
					}


					testFiles.delete();



				}

			}
		}
	}



	public static void cleanNonCPPFromFolder(String cleanFolder) throws IOException{
		List test_cpp_files = Util.listCPPFiles(cleanFolder);
		List all_files = Util.listAllFiles(cleanFolder);


		for(int i=0; i< all_files.size(); i++){

			File file = new File(all_files.get(i).toString());
			if((!(FilenameUtils.getExtension(file.getName()).equals("cpp"))) && (!(FilenameUtils.getExtension(file.getName()).equals("cc")))){
				{	file.delete();
				}

				if(FilenameUtils.getExtension(file.getName()).equals("cc")){
					System.out.println(FilenameUtils.getExtension(file.getName()));
					File destFile = new File(all_files.get(i).toString().substring(0, all_files.get(i).toString().length()-2)+"cpp");
					FileUtils.copyFile(file, destFile);
					file.delete();
				}
			}}



	}
	public static void cleanNonCodeFromFolder(String cleanFolder){
		List test_c_files = Util.listCPPFiles(cleanFolder);
		for(int i=0; i< test_c_files.size(); i++){

			File c_file = new File(test_c_files.get(i).toString());

			//check if there are correct number of dep files for each author
			List test_dep_paths = Util.listDepFiles(c_file.getParent());

			int fileNo=14;
			//check if there are correct number of dep files for each author
			if(test_dep_paths.size()<fileNo){
				// 	System.out.println(test_dep_paths.size()+" dep files "+c_file.getParent());

				File cfiletoDelete = new File(c_file.getPath().toString());
				cfiletoDelete.delete();
				File filetoDelete = new File(c_file.getParentFile().getPath().toString());
				System.out.println(filetoDelete);
				File file2toDelete = new File(filetoDelete.getParent().toString());
				System.out.println(file2toDelete);


				filetoDelete.delete();
				file2toDelete.delete();
				File file3toDelete = new File(file2toDelete.getParent().toString());
				System.out.println(file3toDelete);


			}}}

	public static void fixArffFeature (String arffFile) throws IOException{

		String featureText = Util.readFile( arffFile);
		//start 79756
		//end
		for(int i= 79757; i <80156; i++){
			//	System.out.println(DepthASTNode.readLineNumber(featureText, 80154));
			System.out.println(i);
			String instID = MergeArffFiles.getInstanceID(arffFile, i);

			String instVector = MergeArffFiles.getInstance(arffFile, i);


			String authorName = instID;

			//authorName = authorName.replace(replacement, authorName);
			authorName = authorName.substring(25,authorName.length()-2);

			//System.out.print(instVector);

			System.out.println(authorName);

			String newVector = instVector +","+ authorName +"\n";
			//	System.out.println(newVector);
			Util.writeFile(newVector, "/Users/Aylin/Desktop/Princeton/BAA/arffs/"
					+ "C_62Authors14files_decompiledNEW.arff/", true);}

/*		  try {
		        // input the file content to the String "input"
		        BufferedReader file = new BufferedReader(new FileReader(arffFile));
		        String line;String input = "";
		        int lineNo=0;
		        while ((line = file.readLine()) != null) input += line + '\n';
		        
		        file.close();

		        System.out.println(input); // check that it's inputted right

		        // this if structure determines whether or not to replace "0" or "1"
		            CharSequence target = instID;
					CharSequence replacement = instID + instID;
					input = input.replace(target, replacement); 
		    

		        // write the new String with the replaced line OVER the same file
		        FileOutputStream fileOut = new FileOutputStream(arffFile +"auth");
		        fileOut.write(input.getBytes());
		        fileOut.close();
		        lineNo
		        
		  
	   } catch (Exception e) {
	        System.out.println("Problem reading file.");
	    }*/





	}
}