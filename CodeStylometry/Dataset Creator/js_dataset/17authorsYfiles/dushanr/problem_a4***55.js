
_ = require('underscore');
var fs = require('fs');

if (process.argv.length < 3) return console.error('Usage: node program.js inputfile');

var lines = fs.readFileSync(process.argv[2], 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
var l = 0;

var T = parseInt(lines[l++], 10);

for (var t = 0; t < T; t++) {
	var N = parseInt(lines[l++], 10);
	var m = lines[l++].split(' ').map(function(x) { return parseInt(x, 10); });

	var r1 = 0;
	var r2 = 0;

	for (var i = 0; i < m.length - 1; i++) {
		r1 += Math.max(0, m[i] - m[i + 1]);
	}

	var ps = 0;
	for (var i = 0; i < m.length - 1; i++) {
		ps = Math.max(ps, m[i] - m[i + 1]);
	}

	for (var i = 0; i < m.length - 1; i++) {
		r2 += Math.min(m[i], ps);
	}

	console.log('Case #' + (t + 1) + ': ' + r1 + ' ' + r2);
}




