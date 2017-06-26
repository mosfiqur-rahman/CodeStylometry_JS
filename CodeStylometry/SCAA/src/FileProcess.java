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
	private static File[] filess;
	public  static void main(String [] args) throws IOException
	{
		File dir = new File("/home/xps/Documents/CodeStylometry_JS/CodeStylometry/Dataset Creator/js_dataset/7authors4file/");

		//System.out.println("Getting all files in " + dir.getCanonicalPath() + " including those in subdirectories");

		List<File> files = new ArrayList<>();
		files = (List<File>) FileUtils.listFiles(dir, TrueFileFilter.INSTANCE, TrueFileFilter.INSTANCE);

		List<String> file_list = new ArrayList<>();

		///File[] file_list;

		int counter = 0;
		for (File file : files)
		{
			String temp = file.getCanonicalPath();
			//file_list[counter] = file;
			//counter++;

			/*
			String temp_str = temp.substring(temp.length() - 3);
			if(temp_str.equals(".js"))
			{
				File f = file;
				f.renameTo(new File(temp_str + counter + ".js"));
				//System.out.println(file.getCanonicalPath());
			}
			*/
			file_list.add(temp);
			//System.out.println("file: " + file.getCanonicalPath());
		}

		for (int i = 0; i < file_list.size(); i++)
		{

			//File f = new File(file_list.get(i));
			//filess[i] = f;

			String temp_filename = file_list.get(i);
			String temp_str = temp_filename.substring(temp_filename.length() - 3);
			//System.out.println(file_list.get(i));
			String main_filename = temp_filename.substring(0, temp_filename.length() - 3);
			if(temp_str.equals(".js"))
			{
				File f = new File(temp_filename);
				f.renameTo(new File(main_filename + i + ".js"));

				//System.out.println(main_filename);
			}

		}
	}
}
