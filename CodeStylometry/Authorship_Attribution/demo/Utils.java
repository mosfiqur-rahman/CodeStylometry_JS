import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

public class Utils {

	public static File openFile(String name){
		File file = new File(name);
		if(file.exists()){
			return file;
		}else{
			return null;
		}
	}
	
	public static File createFile(String name) throws IOException{
		File file = new File(name);
		createDirectory(file.getParent());
		if(file.exists()){
			return null;
		}else{
			file.createNewFile();
			return file;
		}
	}
	
	public static File createDirectory(String name){
		File dir = new File(name);
		dir.mkdirs();
		return dir;
	}
	
	public static void writeStringToFile(String text, String filename) throws IOException{
		createFile(filename);
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filename), "UTF-8"));
		writer.write(text);
		writer.flush();
		writer.close();
	}
	
	public static void writeStringArrayToFile(String text[], String filename) throws IOException{
		createFile(filename);
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filename), "UTF-8"));
		for(int i = 0; i < text.length; i++){
			writer.write(text[i] + "\r\n");
		}
		writer.flush();
		writer.close();
	}
}
