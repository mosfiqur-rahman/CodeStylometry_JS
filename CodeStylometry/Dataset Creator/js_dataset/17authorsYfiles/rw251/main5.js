
// Usage (assumes input file contains "in" and outputs to a similar file with
//"out" instead of "in"
//
// node main.js inputfile.in
//
var fs = require('fs'),
    filePath = process.argv[2] || "in.txt",
    outfile = fs.createWriteStream(filePath.replace(/in/,"out"), {flags : 'w'}),
    contentLines = fs.readFileSync(filePath,'utf-8').split('\n').filter(String).slice(1);

//Make sure the input and output files are correct
console.log("Reading cases from " + filePath);
console.log("Writing answers to " + filePath.replace(/in/,"out"));

//Print answer line to file
var o = function(num, output) {
  outfile.write("Case #" +  num + ": " + output + "\n");
};

var ln = function(text) {
  outfile.write(text +"\n");
};

contentLines.forEach(function(line,idx){
  var els = line.split(" "), K = +els[0], C = +els[1], S = +els[2];

  var ans = [];
  for(var i =0; i<S;i++){
    ans.push(i+1);
  }
  o(idx+1, ans.join(" "));
});
