import java.util.*;
import java.io.*;
import java.util.ArrayList;

/**
 * Created by Mosfiqur Rahman on 6/25/17.
 */
public class LineFIx
{

	private static List<String> word_list = new ArrayList<>();

	public static void main(String args[]) throws FileNotFoundException
	{
		File file = new File("/home/xps/Documents/CodeStylometry_JS/CodeStylometry/Authorship_Attribution/mixed.arff");

		Scanner scan = new Scanner(file);

		String match = "@data";

		while(scan.hasNext())
		{
			String line = scan.nextLine();
			word_list .add(line);
		}

		//System.out.println(word_list);

		for (int i = 0; i < word_list.size(); i++)
		{
			String store = word_list.get(i);

			if(store.equals(match))
			{
				break;
			}
			else
			{
				if (store.length() > 0)
				{
					if (store.charAt(0) == '@')
					{
						continue;
					}
					else
					{
						//System.out.println(store);
						String temp = word_list.get(i-1) + word_list.get(i);
						word_list.set(i-1, temp);
						word_list.remove(i);
						i--;

						continue;
					}
				}
			}
		}
		
		try
		{
			PrintWriter writer = new PrintWriter("/home/xps/Documents/CodeStylometry_JS/CodeStylometry/Authorship_Attribution/final.arff");

			for (int i = 0; i < word_list.size(); i++)
			{
				writer.println(word_list.get(i));
			}
			System.out.println("Successfully written to /home/xps/Documents/CodeStylometry_JS/CodeStylometry/Authorship_Attribution/final.arff");
			writer.close();

		}
		catch (IOException e)
		{
			System.out.println("Error while writing in the file!!!");
		}

	}
}
