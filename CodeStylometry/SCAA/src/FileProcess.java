import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.TrueFileFilter;
/**
 * Created by Mosfiqur Rahman on 6/25/17.
 */
public class FileProcess
{
	public  static void main(String [] args) throws IOException
	{
		File dir = new File("/home/xps/Documents/CodeStylometry_JS/CodeStylometry/Dataset Creator/js_dataset/17authorsYfiles/");

		//System.out.println("Getting all files in " + dir.getCanonicalPath() + " including those in subdirectories");

		List<File> files = (List<File>) FileUtils.listFiles(dir, TrueFileFilter.INSTANCE, TrueFileFilter.INSTANCE);

		///File[] file_list;

		int counter = 0;
		for (File file : files)
		{
			String temp = file.getCanonicalPath();
			//file_list[counter] = file;
			//counter++;


			String temp_str = temp.substring(temp.length() - 3);

			if(temp_str.equals(".js"))
			{
				String main_filename = temp.substring(0, temp.length() - 3);
				//System.out.println(file.getName());
				//System.out.println(file.isFile());

				boolean b = file.renameTo(new File(main_filename + "***" + counter + ".js"));
				//System.out.println(file.getCanonicalPath());
				System.out.println(b);
				counter++;
			}
		}

	}
}
