
var fs = require('fs');

if (process.argv.length < 3) return console.error('Usage: node program.js inputfile');

var lines = fs.readFileSync(process.argv[2], 'utf8').replace(/^\uFEFF/, '').split('\n');
var l = 0;

var m = [[0]];

function numOfSplits(n, t) {
	if (t >= n) return 0;
	else return m[n - 1][t - 1];
}

function buildMatrix(max) {
	for (var i = 2; i <= max; i++) {
		var u = [];
		for (var t = 1; t < i; t++) {
			var r = i - 1;
			for (var k = 1; k <= i / 2; k++) {
				r = Math.min(r, numOfSplits(k, t) + numOfSplits(i - k, t) + 1);
			}
			u.push(r);
		}
		m.push(u);
	}
}

buildMatrix(1001);


var T = parseInt(lines[l++], 10);

for (var t = 0; t < T; t++) {
	var D = parseInt(lines[l++], 10);
	var p = lines[l++].split(' ').map(function(x) { return parseInt(x, 10); });

	var maxp = p[0];
	for (var i = 1; i < p.length; i++) maxp = Math.max(p[i], maxp);

	var r = maxp;
	for (var ti = 1; ti <= maxp; ti++) {
		var s = 0;
		for (var k = 0; k < p.length; k++) s += numOfSplits(p[k], ti);
		r = Math.min(r, s + ti);
	}

	console.log('Case #' + (t + 1) + ': ' + r);
}
