/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author dns43
 */
public class EsprimaWrapper {
    
        public static void main(String args[]) {
        
            String source = "";
            String path ="";
        try {
            path = "C:\\Users\\dns43\\Documents\\NetBeansProjects\\CodeStylometry\\testJS\\protobuf.js";
            File file = new File(path);
            BufferedReader reader = new BufferedReader(new FileReader(file));
            
            char nextChar;
            
            while (reader.ready()) { // TODO can extract features here
                nextChar = (char) reader.read();
                String charStr = "" + nextChar;
                source = source + nextChar;
            }
            reader.close();
           //source=source.replaceAll("\n", " ");
           //source=source.replaceAll("\r", " ");
           //source=source.replaceAll("-1", " ");
           //source=source.replaceAll("\"", "\'");
//           source=source.replaceAll("\\$", " ");
           //source=source.replaceAll("\"", "\'");
           
           //source=source.replaceAll("@", "");
           
            System.out.println(source);   
        } catch (IOException ex) {
                Logger.getLogger(EsprimaWrapper.class.getName()).log(Level.SEVERE, null, ex);
        }
        System.out.println("test");
        try {
            // Run "netsh" Windows command
            Process process = Runtime.getRuntime().exec("node C:\\Users\\dns43\\Documents\\NetBeansProjects\\CodeStylometry\\testJS\\esprimawrapper.js \""+source+"\"");
//          Process process = Runtime.getRuntime().exec("node C:\\Users\\dns43\\Documents\\NetBeansProjects\\CodeStylometry\\testJS\\esprimawrapper.js \"$('.dropdown-toggle').dropdown()\"");

            // Get input streams
            BufferedReader stdInput = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader stdError = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            process.waitFor();
            // Read command standard output
            String s;
            System.out.println("Standard output: ");
            while ((s = stdInput.readLine()) != null){
                System.out.println(s);
            }
            
            // Read command errors
            System.out.println("Standard error: ");
            while ((s = stdError.readLine()) != null) {
                System.out.println(s);
            }
            
            
            
            
            
            
            
       /*     
            process.waitFor()
            Process process2 = Runtime.getRuntime().exec("const esprima = require('esprima')");
            
            // Get input streams
            BufferedReader stdInput1 = new BufferedReader(new InputStreamReader(process1.getInputStream()));
            BufferedReader stdError1 = new BufferedReader(new InputStreamReader(process1.getErrorStream()));

            // Read command standard output
            System.out.println("Standard output: ");
            while ((s = stdInput.readLine()) != null) {
                System.out.println(s);
            }

            // Read command errors
            System.out.println("Standard error: ");
            while ((s = stdError.readLine()) != null) {
                System.out.println(s);
            }
         
            Process process3 = Runtime.getRuntime().exec("var x = esprima.parse('"+source+")");
         
            
            // Get input streams
            BufferedReader stdInput3 = new BufferedReader(new InputStreamReader(process3.getInputStream()));
            BufferedReader stdError3 = new BufferedReader(new InputStreamReader(process3.getErrorStream()));

            // Read command standard output
            System.out.println("Standard output: ");
            while ((s = stdInput.readLine()) != null) {
                System.out.println(s);
            }

            // Read command errors
            System.out.println("Standard error: ");
            while ((s = stdError.readLine()) != null) {
                System.out.println(s);
            }
            
       */     
        } catch (Exception e) {
            e.printStackTrace(System.err);
        }
    }

}
