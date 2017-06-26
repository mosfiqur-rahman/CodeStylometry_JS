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
		File file = new File("/home/xps/Documents/CodeStylometry_JS/CodeStylometry/Authorship_Attribution/sample.arff");

		Scanner scan = new Scanner(file);

		String match = "@data";

		while(scan.hasNext())
		{
			String line = scan.nextLine();
			word_list .add(line);

			/*
			if (line.equals(match))
			{
				break;
			}
			else
			{
				word_list .add(line);
			}
			*/
		}

		//System.out.println(word_list);

		for (int i = 0; i < word_list.size(); i++)
		{
			String store = word_list.get(i);

			while(!store.equals(match))
			{
				if (store.length() > 0)
				{
					if (store.charAt(0) == '@')
					{
						continue;
					}
					else
					{

						System.out.println(store);
						continue;
					}
				}
			}
			break;
		}

	}
}
