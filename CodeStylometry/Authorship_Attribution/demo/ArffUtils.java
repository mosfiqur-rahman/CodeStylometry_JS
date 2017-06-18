import java.io.File;
import java.io.IOException;

import weka.core.Instances;
import weka.core.converters.ArffLoader;
import weka.core.converters.ArffSaver;

public class ArffUtils {

	public static Instances readArff(File arff) throws IOException{
		ArffLoader loader = new ArffLoader();
		loader.setSource(arff);
		return loader.getDataSet();
	}
	
	public static void saveArff(File arff, Instances insts) throws IOException{
		ArffSaver saver = new ArffSaver();
		saver.setDestination(arff);
		saver.writeBatch();
	}
}
