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
	var txt = lines[currLine++];
	result += "Case #" + i + ": " + solve(txt) + "\n";
    }
    var outputFile = inputFile.split('.')[0] + ".out";
    fs.writeFile(outputFile, result, (err) => {
	if (err) throw err;
	console.log("Done");
    });
});
var solve = function(txt) {
    var letras = {};
    for (var i = 0; i < txt.length; i++) {
	var letra = txt.charAt(i);
	if (!letras[letra])
	    letras[letra] = 0;
	letras[letra]++;
    }
    console.log(JSON.stringify(letras));
    var checar = [
	{letra: "Z", palabra: "ZERO", num: 0},
	{letra: "W", palabra: "TWO", num: 2},
	{letra: "U", palabra: "FOUR", num: 4},
	{letra: "X", palabra: "SIX", num: 6},
	{letra: "S", palabra: "SEVEN", num: 7},
	{letra: "V", palabra: "FIVE", num: 5},
	{letra: "O", palabra: "ONE", num: 1},
	{letra: "N", palabra: "NINE", num: 9},
	{letra: "R", palabra: "THREE", num: 3},
	{letra: "E", palabra: "EIGHT", num: 8}
    ];
    var digitos = [0,0,0,0,0,0,0,0,0,0];
    for (var i = 0; i < checar.length; i++) {
	var actual = checar[i];
	while (letras[actual.letra]) {
	    digitos[actual.num]++;
	    for (var j = 0; j < actual.palabra.length; j++) {
		letras[actual.palabra.charAt(j)]--;
	    }
	}
    }
    var resultado = "";
    for (var i = 0; i < digitos.length; i++) {
	for (var j = 0; j < digitos[i]; j++) {
	    resultado += "" + i;
	}
    }
    return resultado;
}
