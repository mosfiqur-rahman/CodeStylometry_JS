import weka.classifiers.trees.RandomForest;

public class ClassifierUtils {

	public static RandomForest createForestDefault(){
		RandomForest rf = new RandomForest();
		rf.setNumTrees(300);
		rf.setNumFeatures(0);
		rf.setMaxDepth(0);
		rf.setSeed(1);
		return rf;
	}
	
	public static RandomForest createForestDefault(int seed){
		RandomForest rf = new RandomForest();
		rf.setNumTrees(300);
		rf.setNumFeatures(0);
		rf.setMaxDepth(0);
		rf.setSeed(seed);
		return rf;
	}
	
	public static RandomForest createForestCustom(int numTrees, int numFeatures, int maxDepth, int seed){
		RandomForest rf = new RandomForest();
		rf.setNumTrees(numTrees);
		rf.setNumFeatures(numFeatures);
		rf.setMaxDepth(maxDepth);
		rf.setSeed(seed);
		return rf;
	}
}
