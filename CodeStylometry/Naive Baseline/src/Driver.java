public class Driver
{

	/**
	 * Dependencies: Apache Commons IO, Util.java, ARFFFactory*.java, everything
	 * else in the Naive-Baseline package
	 */
	public static void main(String args[])
	{
		/*if (args.length != 2) {
			System.err
					.println("Usage: <root directory of all test files> <target ARFF file>");
			System.exit(1);
		}
		(new ARFFFactory4()).makeARFF(args[0], args[1]);

		for(int datasetNo=101; datasetNo<102; datasetNo++){

                args[0] ="/Users/Aylin/Desktop/Drexel/2014/ARLInternship/SCAA_Datasets/"
				+ "forMallory/mallory_new_SFS/malloryDataset_"+datasetNo+"/";
		args[1] ="/Users/Aylin/Desktop/Drexel/2014/ARLInternship/SCAAarffs/mallory_150/malloryDataset_andrew_"+datasetNo+".arff";
                */
		String[] arg = new String[2];
		arg[0] ="/home/xps/Documents/CodeStylometry_JS/CodeStylometry/Dataset Creator/js_dataset/17authorsYfiles/";

		arg[1] ="/home/xps/Documents/CodeStylometry_JS/CodeStylometry/Authorship_Attribution/17authorsYfilesNB.arff";

		(new ARFFFactory4()).makeARFF(arg[0], arg[1]);
	}
	//}
}



