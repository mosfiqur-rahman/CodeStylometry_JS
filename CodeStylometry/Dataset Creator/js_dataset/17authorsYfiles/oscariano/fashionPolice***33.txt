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
	var line = lines[currLine++];
	var pieces = line.split(" ");
	var j = parseInt(pieces[0]);
	var p = parseInt(pieces[1]);
	var s = parseInt(pieces[2]);
	var k = parseInt(pieces[3]);
	result += "Case #" + i + ": " + solve(j, p, s, k) + "\n";
    }
    var outputFile = inputFile.split('.')[0] + ".out";
    fs.writeFile(outputFile, result, (err) => {
	if (err) throw err;
	console.log("Done");
    });
});
var solve = function(j, p, s, k) {
    var cJP = {};
    var cJS = {};
    var cPS = {};
    var lista = "";
    var count = 0;
    for (var i1 = 1; i1 <= j; i1++) {
	var ini1 = 1;
	var dir1 = 1;
	if (i1 % 2 == 0) {
	    ini1 = p;
	    dir1 = -1;
	}
	for (var i2 = ini1; i2 >= 1 && i2 <= p; i2 += dir1) {
	    var ini2 = 1;
	    var dir2 = 1;
	    if ((i1 + i2) % 2 == 0) {
		ini2 = s;
		dir2 = -1;
	    }
	    for (var i3 = ini2; i3 >= 1 && i3 <= s; i3 += dir2) {
		var jp = i1 + "x" + i2;
		var js = i1 + "x" + i3;
		var ps = i2 + "x" + i3;
		if (!cJP[jp]) cJP[jp] = 0;
		if (!cJS[js]) cJS[js] = 0;
		if (!cPS[ps]) cPS[ps] = 0
		if (cJP[jp] >= k || cJS[js] >= k || cPS[ps] >= k)
		    continue;
		cJP[jp]++;
		cJS[js]++;
		cPS[ps]++;
		count++;
		lista += "\n" + i1 + " " + i2 + " " + i3; 
	    }
	}
    }
/*
    if (j * p  * s != count) {
	console.log(count + " " + j + "," + p + "," + s + "," + k);
	return count + " " + j + "," + p + "," + s + "," + k + lista;
    } else {
	return "";
    }
*/
    return count + lista;
}
