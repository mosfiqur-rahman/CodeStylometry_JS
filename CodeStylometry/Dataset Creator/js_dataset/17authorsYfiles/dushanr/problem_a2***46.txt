
_ = require('underscore');
var fs = require('fs');

if (process.argv.length < 3) return console.error('Usage: node program.js inputfile');

var lines = fs.readFileSync(process.argv[2], 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
var l = 0;

var T = parseInt(lines[l++], 10);

for (var t = 0; t < T; t++) {
	var RCW = lines[l++].split(' ').map(function(x) { return parseInt(x, 10); });
	var R = RCW[0];
	var C = RCW[1];
	var W = RCW[2];

	var r = 0;

	for (var i = 0; i < R - 1; i++) {
		r += Math.floor(C / W);
	}

	while (C >= 2 * W) {
		r++;
		C -= W;
	}

	if (C > W) r++;

	r += W;

	console.log('Case #' + (t + 1) + ': ' + r);
}

