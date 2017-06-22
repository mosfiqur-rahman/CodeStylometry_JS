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
	var stack = lines[currLine++];
	result += "Case #" + i + ": " + solve(stack) + "\n";
    }
    var outputFile = inputFile.split('.')[0] + ".out";
    fs.writeFile(outputFile, result, (err) => {
	if (err) throw err;
	console.log("Done");
    });
});
var solve = function(stack) {
    var flips = 0;
    var reverse = true;
    var posStart = 0;
    var posEnd = stack.length - 1;
    while (posStart <= posEnd) {
	var charS = stack.charAt(posStart);
	var charE = stack.charAt(posEnd);
	if (reverse) {
	    if (charE === '+') {
		posEnd--;
		continue;
	    }
	    flips++;
	    if (charS === '+') {
		flips++;
		while (stack.charAt(posStart++) === '+') {}
	    }
	    reverse = !reverse;
	} else {
	    if (charS === '-') {
		posStart++;
		continue;
	    }
	    flips++;
	    if (charE === '-') {
		flips++;
		while (stack.charAt(posEnd--) === '-') {}
	    }
	    reverse = !reverse;
	}
    }
    return flips;
}
