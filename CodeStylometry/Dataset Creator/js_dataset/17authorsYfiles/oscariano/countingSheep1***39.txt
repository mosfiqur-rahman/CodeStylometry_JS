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
	var n = parseInt(lines[currLine++]);
	result += "Case #" + i + ": " + solve(n) + "\n";
    }
    var outputFile = inputFile.split('.')[0] + ".out";
    fs.writeFile(outputFile, result, (err) => {
	if (err) throw err;
	console.log("Done");
    });
});
var solve = function(n) {
    if (n === 0)
	return "INSOMNIA";
    var found = 0;
    var numsFound = {};
    var currValue = 0;
    while (found < 10) {
	currValue += n;
	var str = "" + currValue;
	for (var i = 0; i < str.length; i++) {
	    var d = str.charAt(i);
	    if (!numsFound[d]) {
		numsFound[d] = true;
		found++;
	    }
	}
    }
    return currValue;
}
