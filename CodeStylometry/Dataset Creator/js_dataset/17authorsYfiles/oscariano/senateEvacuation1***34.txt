// oscar.campos at gmail.com
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
	var line = lines[currLine++];
	var pieces = line.split(" ");
	result += "Case #" + i + ": " + solve(n, pieces) + "\n";
    }
    var outputFile = inputFile.split('.')[0] + ".out";
    fs.writeFile(outputFile, result, (err) => {
	if (err) throw err;
	console.log("Done");
    });
});
var solve = function(n, pieces) {
    var parties = [];
    var total = 0;
    for (var i = 0; i < pieces.length; i++) {
	var value = parseInt(pieces[i]);
	total += value;
	parties.push({
	    name: i,
	    members: value
	});
    }
    var sortFunc = function(a,b) {return b.members - a.members;};
    var gChar = function(value) {return String.fromCharCode(65 + value);};
    parties.sort(sortFunc);
    var answer = "";
    while (total > 0) {
	var first = parties[0];
	var second = parties[1];
	var third = parties[2] || {members: 0};
	if (total == 2) {
	    answer += " " + gChar(first.name) + gChar(second.name);
	    total = 0;
	    break;
	}
	if (first.members > second.members) {
	    if (second.members > (total / 2 - 1)) {
		first.members -= 1;
		total -= 1;
		answer += " " + gChar(first.name);
	    } else {
		first.members -= 2;
		total -= 2;
		answer += " " + gChar(first.name) + gChar(first.name);
	    }
	} else {
	    if (third.members > (total / 2 - 1)) {
		first.members--;
		total--;
		answer += " " + gChar(first.name);
	    } else {
		first.members--;
		second.members--;
		total -= 2;
		answer += " " + gChar(first.name) + gChar(second.name);
	    }
	}
	parties.sort(sortFunc);
    }
    return answer;
}
