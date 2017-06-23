public class Driver {

	/**
	 * Dependencies: Apache Commons IO, Util.java, ARFFFactory*.java, everything
	 * else in the Naive-Baseline package
	 */
	public static void main(String args[])
	{
		if (args.length != 2)
		{
			System.err
					.println("Usage: <root directory of all test files> <target ARFF file>");
			System.exit(1);
		}
		(new ARFFFactory4()).makeARFF(args[0], args[1]);
		
		for(int datasetNo=101; datasetNo<102; datasetNo++)
		{
			args[0] ="/home/xps/Documents/CodeStylometry_JS/CodeStylometry/Dataset Creator/js_dataset/7authors4file/";
			args[1] ="/home/xps/Documents/CodeStylometry_JS/CodeStylometry/Dataset Creator/7authors4fileNB.arff";
			(new ARFFFactory4()).makeARFF(args[0], args[1]);
		}
	}
}