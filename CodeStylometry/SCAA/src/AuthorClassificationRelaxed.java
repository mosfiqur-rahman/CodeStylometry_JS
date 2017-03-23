import weka.attributeSelection.InfoGainAttributeEval;
import weka.attributeSelection.Ranker;
import weka.classifiers.*;
import weka.classifiers.evaluation.ThresholdCurve;
import weka.classifiers.meta.FilteredClassifier;
import weka.classifiers.trees.RandomForest;
import weka.core.Attribute;
import weka.core.AttributeStats;
import weka.core.Instances;
import weka.core.Range;
import weka.core.Utils;
import weka.filters.Filter;
import weka.filters.supervised.attribute.AttributeSelection;
import weka.filters.unsupervised.attribute.Remove;
import weka.filters.unsupervised.instance.RemoveRange;
import weka.filters.unsupervised.instance.RemoveWithValues;

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.*;


//dns43: this is where the magic happens

public class AuthorClassificationRelaxed {


	public static void main(String[] args) throws Exception 
	{
		double accuracy=0;
		int endRelax = 5;
		int numberFiles;
		int numFeatures=0; //0 is the default logM+1
		int seedNumber;
		double total =0;
		double average =0;

		String fileName  ="textFile";
		

		//dns43: for Authors 9-10, why?
		for(int authorNo=9; authorNo<10; authorNo++){
			//dns43: for files 9-10, why?
			for(numberFiles=9; numberFiles<10; numberFiles++){
				//dns43: from 28 to 558 in steps of 9
				//dns43: cuz there are 9 files per Author?
				for (int x=28; x<=(18*31); x=x+9){
				String arffFile = "path";
				//dns43: write a file "textFile" mentioning Numbers of Files per Author
			  	Util.writeFile(numberFiles+"FilesPerAuthor: \n",fileName, true);	
			  	//dns43: for each PAR (here a relaxed amount)
			  	for(int relaxPar = 5; relaxPar<=endRelax; relaxPar++){
			  		//dns43: reset vars 
				  	total=0;				  
				  	average=0;

				  	for(seedNumber=1; seedNumber<2; seedNumber++){
						int foldNumber=numberFiles;

						//dns43: creat empty random forest
						RandomForest cls = new RandomForest();
						
						Instances data = new Instances(new FileReader(arffFile));
						data.setClassIndex(data.numAttributes() - 1);
				//		data.setClassIndex(0);

						//do not stratify if you are going to remove instances for training and testing
				//		data.stratify(foldNumber);
						

						//write classes that have 9 samples to a new arff
				//		System.out.println(data.instance(2).stringValue(0));
				//		System.out.println(data.instance(2).value(0));

				/*		for(int i=0; i<=data.numInstances();i++){
							int count = data.attributeStats(0).nominalCounts[(int) data.instance(i).value(0)];
							if(count==9){
						System.out.println(data.attributeStats(0));

								Util.writeFile(data.instance(i).toString() + "\n", "/Users/Aylin/Desktop/"
							 		+ "python9files.arff", true);

							}
							
						}*/
						
						//Start information gain that selects up to 200 features that have nonzero infogain
						int n = 500; // number of features to select 
					    AttributeSelection attributeSelection = new  AttributeSelection(); 
					    Ranker ranker = new Ranker(); 
					    ranker.setNumToSelect(n); 
					    ranker.setThreshold(0.001);
					    InfoGainAttributeEval infoGainAttributeEval = new InfoGainAttributeEval(); 
					    attributeSelection.setEvaluator(infoGainAttributeEval); 
					    attributeSelection.setSearch(ranker); 
					    attributeSelection.setInputFormat(data); 
					    data = Filter.useFilter(data, attributeSelection); 
					    //end of infogain
					     
						
						
						RemoveRange rm = new RemoveRange();
						rm.setInputFormat(data);
					//	rm.setInstancesIndices("first-"+(x-19)+","+x+"-last");
						Instances testData = Filter.useFilter(data, rm);
						System.out.println("testData size " + testData.numInstances());


						FilteredClassifier fc = new FilteredClassifier();
						fc.setClassifier(new RandomForest());
						fc.setFilter(rm);
						
						String[] options = weka.core.Utils.splitOptions("-I 300 -K "+numFeatures+" -S "+seedNumber);
						fc.setOptions(options);
					//	fc.buildClassifier(data);
					    Evaluation eval_mal = new Evaluation(data);		
						
						System.out.println("Number of instances: " + data.numInstances()+" and number of authors: " + data.numClasses());
						
						
						String[] options1 = weka.core.Utils.splitOptions("-I 300 -K "+numFeatures+" -S "+seedNumber);
						cls.setOptions(options);
					//	cls.buildClassifier(data);
						
						

						Evaluation eval=null;
						

						if(endRelax==1)
						 eval = new Evaluation(data);
						else
						 eval= new RelaxedEvaluation(data, relaxPar);
						
						
								eval.crossValidateModel(cls, data,foldNumber , new Random(seedNumber));
							
						System.out.println("Relaxed by, "+relaxPar+", seedNo,"+seedNumber+", files,"+numberFiles+", authors,"+data.numClasses());
						Util.writeFile("Relaxed by, "+relaxPar+", seedNo,"+seedNumber+", files,"+numberFiles+", authors,"+data.numClasses(),
								fileName, true);

					     accuracy=eval.pctCorrect();
					     total =total+accuracy;
					     average = total/seedNumber;
							}	

								  System.out.println("total is "+total);
								  System.out.println("avg is "+average);
								  System.out.println("accuracy is "+accuracy);

						System.out.println("\nThe average accuracy with "+numberFiles+"files is "+average+"\n");	
					     Util.writeFile("\nThe average accuracy with "+numberFiles+"files is "+average+", relaxed by, "+relaxPar+", \n",
					    		 fileName, true);
					     
			  }
			  

	     }}
		}
	}
	
}