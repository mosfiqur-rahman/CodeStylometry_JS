
var fs = require('fs');
var path = require('path');

if (process.argv.length < 3) return console.log('Usage: node program.js inputfile');

var inputPath = path.resolve(process.argv[2]);
var f = fs.readFileSync(inputPath, 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '');

var lines = f.split('\n');
var l = 0;
var T = parseInt(lines[l++], 10);

for (var t = 0; t < T; t++) {
	var s = lines[l++].split(' ');
	var smax = parseInt(s[0], 10);
	var sc = [];

	for (var i = 0; i < s[1].length; i++) {
		sc.push(s[1].charCodeAt(i) - '0'.charCodeAt(0));
	}

	var ss = 0;
	var r = 0;

	for (var i = 0; i < sc.length; i++) {
		if (sc[i] === 0) continue;

		if (i > ss) {
			r += (i - ss);
			ss += sc[i] + (i - ss);
		} else {
			ss += sc[i];
		}

	}

	console.log('Case #' + (t + 1) + ': ' + r);
}

