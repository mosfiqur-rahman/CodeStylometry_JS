import java.io.IOException;
import java.util.Random;
import weka.classifiers.Evaluation;
import weka.classifiers.trees.RandomForest;
import weka.core.Instances;

public class AuthorAttribution {
	
	private boolean cv;
	private Instances training;
	private Instances testing;
	
	public AuthorAttribution(String cvArff) throws IOException{
		cv = true;
		training = ArffUtils.readArff(Utils.openFile(cvArff));
		training.setClassIndex(training.numAttributes()-1);
	}
	
	public AuthorAttribution(String trainArff, String testArff) throws IOException{
		cv = false;
		training = ArffUtils.readArff(Utils.openFile(trainArff));
		testing = ArffUtils.readArff(Utils.openFile(trainArff));
		training.setClassIndex(training.numAttributes()-1);
		testing.setClassIndex(training.numAttributes()-1);
	}
	
	public String doSingleSeedDefaultCV() throws Exception{
		RandomForest rf = ClassifierUtils.createForestDefault();
		Evaluation eval = new Evaluation(training);
		eval.crossValidateModel(rf, training, 10, new Random(1));
		String results = "10 folds, seed 1: " + eval.toSummaryString();
		return results;

	}
	
	public String doSingleSeedDefaultCV(int numFolds) throws Exception{
		RandomForest rf = ClassifierUtils.createForestDefault();
		Evaluation eval = new Evaluation(training);
		eval.crossValidateModel(rf, training, numFolds, new Random(1));
		String results = numFolds + " folds, seed 1: " + eval.toSummaryString();
		return results;
	}
	
	public String doSingleSeedDefaultCV(int numFolds, int seed) throws Exception{
		RandomForest rf = ClassifierUtils.createForestDefault(seed);
		Evaluation eval = new Evaluation(training);
		eval.crossValidateModel(rf, training, numFolds, new Random(seed));
		String results = numFolds + " folds, seed " + seed + ": " + eval.toSummaryString();
		return results;
	}

	public String[] doMultipleSeedDefaultCV(int numSeeds) throws Exception{
		String results[] = new String[numSeeds];
		for(int i = 1; i <= numSeeds; i++){
			results[i-1] = doSingleSeedDefaultCV(10, i);
		}
		return results;
	}
	
	public String[] doMultipleSeedDefaultCV(int numSeeds, int numFolds) throws Exception{
		String results[] = new String[numSeeds];
		for(int i = 1; i <= numSeeds; i++){
			results[i-1] = doSingleSeedDefaultCV(numFolds, i);
		}
		return results;
	}
	
	public String[] doMultipleSeedDefaultCV(int minSeed, int maxSeed, int numFolds) throws Exception{
		String results[] = new String[maxSeed-minSeed+1];
		for(int i = minSeed; i <= maxSeed; i++){
			results[i-1] = doSingleSeedDefaultCV(numFolds, i);
		}
		return results;
	}
}
