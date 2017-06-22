var fs = require('fs');
var esprima = require('esprima');
	 var escope = require('escope');
	 
 //var esprima = require('esprima');
 //var escope = require('escope');
 
 var FileAPI = require('file-api')
 , File = FileAPI.File
 , FileList = FileAPI.FileList
 , FileReader = FileAPI.FileReader
 ;
 var loc = "/home/xps/Documents/CodeStylometry_JS/CodeStylometry/Dataset Creator/js_dataset/17authorsYfiles/";
 var path = require('path');
 var js_files = [];

 
 //var FileReader = require('filereader');  
 function trimHashbang(code) {
	    if (code.substring(0, 2) === '#!') {
	        var end = code.indexOf('\n');
	        var filler = '';
	        for (var i = 0; i < end; ++i) {
	           filler += ' ';
	        }
	        code = filler + code.substring(end, code.length);
	    }
	    return code;
	}
 
 
 function processDir(startPath,filter)
 {
	 	   //var fs = require('fs');
	 	  //var esprima = require('esprima');
	 	 //var escope = require('escope');
           if (!fs.existsSync(startPath))
           {
               console.log("no dir ",startPath);
               return;
           }

           var files=fs.readdirSync(startPath);
           
           var extension = '.js';
       //    js_files = files.filter(function(file){
       // 	    return file.indexOf(extension) !== -1;
       // 	});
           
           //console.log(files);
           
           for(var i=0;i<files.length;i++)
           {
        	  
        	   
        	   //var filename=path.join(startPath,files[i]);

        	   
        	  // var fileReader = new FileReader();
        	   
        	   var filename=path.join(startPath,files[i]);
        	   
        	   var filename_without_path = files[i];
        	  
               
               var stat = fs.lstatSync(filename);
               if (stat.isDirectory()){
            	   processDir(filename,filter); //recurse
               }
               else if (filename.indexOf(filter)>=0) 
               {
            	   (function(file){
            	   
            	   js_files.push(filename);
            		   var file = new File(filename);
            	   
            	   var exact_filename = filename_without_path.slice(0, -3);
            	   	 //console.log(exact_filename);
            	   	   var txt_filename = startPath + '/' + exact_filename + '.txt';
            	   	//console.log(txt_filename);
            	   	 // var ast_filename = startPath + '/' + exact_filename + '.ast'; 
            	   
            	   var fileReader = new FileReader();

               	  fileReader.readAsBinaryString(file, 'utf-8');
            	   //fileReader.readAsBinaryString(file);
            	   fileReader.onload = function(event) 
             	  {
            		  
            		  var contents = fileReader.result;
            		  //console.log(contents);
            		  
            		  //content.push(contents); 
            		  
            		  
            		  //var data = JSON.stringify(esprima.parse(contents),null, 4);
            		  //var data = esprima.parse(contents);
             	 
            	   //console.log(filename_without_path);
            	  
            	  //console.log(data);
            	  //console.log(contents);
            	  //console.log('  ');
            	  //console.log('*******************************************************************************');
            	  //console.log('  ');
            	  
             	  
            	  
            	  // fileReader.onload = function(event) 
            	  //{
            	   
            		   //var contents = fileReader.result; 
            		   
            		  //console.log(contents);
            		   //var fs = require('fs');
            		   //var data = JSON.stringify(esprima.parse(contents),null, 4);
            		   //console.log('Done');
       
            		   //var filename_without_path = files[i];
            		   //console.log(filename_without_path);
            	   	   
            	   
            	   //console.log('-- found: ',filename);
                   //console.log(i, filename_without_path);
                   //console.log(i, exact_filename);
            	   	//console.log('Done');
                   fs.writeFile(txt_filename, contents, function(error)
           	    	 	{
           	    	 		if(error)
           	    	 			{
           	    	 				console.error("write error: " + error.message);
           	    	 			}
           	    	 		//console.log('1');
           	    	 	//	else
           	    	 	//		{
           	    	 	//			console.log("successful write to " + txt_filename);
           	    	 	//		}
           	    	 	});
           	 
 /*          	 fs.writeFile(ast_filename, data, function(error)
           	 	{
           	 		if(error)
           	 			{
           	 				console.error("write error: " + error.message);
           	 			}
           	 		else
           	 			{
           	 				console.log("successful write to " + ast_filename);
           	 			}
           	 	});
*/                   
              // };
               
               //fileReader.onerror = function(event) 
         	  //{
         	  //    console.error("File could not be read! Code " + event.target.error.code);
         	  //}; 
             	
               //};
               
        	  };
        	  //fileReader.readAsBinaryString(file);
           
            	   })(files[i]);
        	  
        	  
           };
       };
 };
       //fromDir('../LiteScript','.html');       
       
 processDir(loc,'.js');
       
       //console.log(js_files);
       
       function processAST(startPath)
       {
    	   
  	 	 
  	 	for(var i=0;i<js_files.length;i++)
        {
  	 		//console.log(i + ' ' + js_files[i]);
  	 		
  	 	 (function(file){
  	 		var file = new File(js_files[i]);
     	   
     	   var exact_filename = js_files[i].slice(0, -3)
     	   	
     	   	   var ast_filename = exact_filename + '.ast'; 
     //console.log(ast_filename);
     	   var fileReader = new FileReader();

        	  fileReader.readAsBinaryString(file, 'utf-8');
        	  
        	  fileReader.onload = function(event) 
         	  {
        		  var  contents = fileReader.result; 
        		  var processed_content = trimHashbang(contents);
        		//  var module = { exports: {} } (function (require, module, exports) {  processed_content })(require, module, exports)
        		  var data = JSON.stringify(esprima.parse(processed_content, { sourceType: 'script',
        			  sourceType: 'module', jsx: true, tolerant: true, tokens: true, range: true, loc: true, comment: true }),null, 4);
        		  
        		 // var data = esprima.parse(processed_content, { sourceType: 'script',
        		//	  sourceType: 'module', jsx: true, tolerant: true, tokens: true, range: true, loc: true, comment: true });
        		  
        		  /***
    			   * 
    			   * try without JSON
    			   * 
    			   * 
    			   ***/
        		  
        		  //console.log(contents);
        		  //console.log('*****************');
        		  
        		  fs.writeFile(ast_filename, data, function(error)
        	           	 	{
        	           	 		if(error)
        	           	 			{
        	           	 				console.error("write error: " + error.message);
        	           	 			}
        	           	 		else
        	           	 			{
        	           	 				console.log("successful write to " + ast_filename);
        	           	 			}
        	           	 	});
        		  
         	  };
  	 		
  	 	 })(js_files[i]);  
  	 		
        };
  	 	 
       };
       
       processAST(loc);

       
       
       
       function processDOT(startPath)
       {
    	   
  	 	 
  	 	for(var i=0;i<js_files.length;i++)
        {
  	 		//console.log(i + ' ' + js_files[i]);
  	 		
  	 	 (function(file){
  	 		var file = new File(js_files[i]);
     	   
     	   var exact_filename = js_files[i].slice(0, -3)
     	   	
     	   	   var dot_filename = exact_filename + '.dot'; 
     console.log(dot_filename);
     	   var fileReader = new FileReader();

        	  fileReader.readAsBinaryString(file, 'utf-8');
        	  
        	  fileReader.onload = function(event) 
         	  {
        		  var  contents = fileReader.result; 
        		  //var processed_content = trimHashbang(contents);
        		//  var module = { exports: {} } (function (require, module, exports) {  processed_content })(require, module, exports)
        		  
        		  var dot_data = JSON.stringify(esprima.tokenize(contents, { range: true, loc: true, comment: true }),null, 4);
        		  //var dot_data = esprima.tokenize(contents, { range: true, loc: true, comment: true });
        		  /***
    			   * 
    			   * try without JSON
    			   * 
    			   * 
    			   ***/
        		  
        		  //console.log(contents);
        		  //console.log('*****************');
        		  
        		  fs.writeFile(dot_filename, dot_data, function(error)
        	           	 	{
        	           	 		if(error)
        	           	 			{
        	           	 				console.error("write error: " + error.message);
        	           	 			}
        	           	 		else
        	           	 			{
        	           	 				console.log("successful write to " + dot_filename);
        	           	 			}
        	           	 	});
        		  
         	  };
  	 		
  	 	 })(js_files[i]);  
  	 		
        };
  	 	 
       };
       
       processDOT(loc);
//  fileReader.onerror = function(event) 
// {
//     console.error("File could not be read! Code " + event.target.error.code);
 //};

// fileReader.readAsBinaryString(file, 'utf-8');
//console.log(JSON.stringify(esprima.parse(program),null, 4));
//console.log(JSON.stringify(esprima.parse(fs.readFileSync('', 'utf-8')), null, 4));

 //var filename = process.argv[2];
 
 
 //var ast = esprima.parse(srcCode, {
 //	    loc: true
 //	});
 
//console.log(ast);
//console.log('Done');



