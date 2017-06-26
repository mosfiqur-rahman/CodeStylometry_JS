
// Usage (assumes input file contains "in" and outputs to a similar file with
//"out" instead of "in"
//
// node main.js inputfile.in
//
var fs = require('fs'),
    filePath = process.argv[2] || "in.txt",
    outfile = fs.createWriteStream(filePath.replace(/in/,"out"), {flags : 'w'}),
    contentLines = fs.readFileSync(filePath,'utf-8').split('\n').filter(String).slice(1);

console.log("Reading cases from " + filePath);
console.log("Writing answers to " + filePath.replace(/in/,"out"));
var o = function(num, output) {
  outfile.write("Case #" +  num + ": " + output + "\n");
};


contentLines.forEach(function(S,idx){
  S+="+";
  var ans = 0;
  S.split("").reduce(function(prev, curr){
    if(curr!=prev) ans++;
    return curr;
  });
  o(idx+1, ans);
});
