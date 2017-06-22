// Library used big-integer
// npm install big-integer
args = process.argv.slice(2);
var inputFile = args[0];
const fs = require("fs");
const bigInt = require("big-integer");
fs.readFile(args[0], 'utf8', (err, data) => {
    if (err) throw err;
    var lines = data.split("\n");
    var numCases = parseInt(lines[0]);
    var currLine = 1;
    var result = "";
    for (var i = 1; i <= numCases; i++) {
	var pieces = lines[currLine++].split(" ");
	var k = parseInt(pieces[0]);
	var c = parseInt(pieces[1]);
	var s = parseInt(pieces[2]);
	result += "Case #" + i + ":" + solve(k, c, s) + "\n";
    }
    var outputFile = inputFile.split('.')[0] + ".out";
    fs.writeFile(outputFile, result, (err) => {
	if (err) throw err;
	console.log("Done");
    });
});
const impossible = " IMPOSSIBLE";
var solve = function(k, c, s) {
    var result = "";
    if (c === 1) {
	if (k > s)
	    return impossible;
	for (var i = 1; i <= k; i++)
	    result += " " + i;
	return result;
    }
    if (Math.ceil(k / 2) > s)
	return impossible;
    if (k === 1)
	return " 1";
    var delta = bigInt(k).pow(c - 1).times(2);
    var pos = bigInt(2);
    var current = 1;
    while (current <= k) {
	if (current === k)
	    pos = pos.minus(1);
	result += " " + pos.toString();
	current += 2;
	pos = pos.add(delta).add(2);
    }
    return result;
}










