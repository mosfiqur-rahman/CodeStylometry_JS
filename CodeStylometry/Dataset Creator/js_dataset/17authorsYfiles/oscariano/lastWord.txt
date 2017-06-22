var args = process.argv.slice(2);
var inputFile = args[0];
const fs = require("fs");
fs.readFile(args[0], 'utf8', (err, data) => {
    if (err) throw err;
    var lines = data.split("\n");
    var numCases = parseInt(lines[0]);
    var currLine = 1;
    var result = "";
    for (var i = 1; i <= numCases; i++) {
	var s = lines[currLine++];
	result += "Case #" + i + ": " + solve(s) + "\n";
    }
    var outputFile = inputFile.split('.')[0] + ".out";
    fs.writeFile(outputFile, result, (err) => {
	if (err) throw err;
	console.log("Done");
    });
});
var solve = function(s) {
    var result = "";
    var ini = false;
    for (var i = 0; i < s.length; i++) {
	var c = s.charAt(i);
	if (ini === false || c >= ini) {
	    result = c + result;
	    ini = c;
	} else {
	    result += c;
	}
    }
    return result;
}
