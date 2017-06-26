
_ = require('underscore');
var fs = require('fs');

if (process.argv.length < 3) return console.error('Usage: node program.js inputfile');

var lines = fs.readFileSync(process.argv[2], 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
var l = 0;

var c = {};
var d = {};
c[1] = 1;
d[1] = 1;
var m = 1000001;
// var m = 300;

function rev(x) {
	if (x === undefined) return m + 1;
	return parseInt(x.toString().split('').reverse().join(''), 10);
}

for (var i = 2; i < m; i++) c[i] = i;

for (var i = 2; i < m; i++) {
	c[i] = Math.min(c[i - 1] + 1, c[i]);

	var r = rev(i);
	if (r > i) {
		c[r] = Math.min(c[i] + 1, c[r]);
	}
}

// console.log(c[200]);
// return;

// for (var i = 1; i < 30; i++) console.log(i, c[i]);

var T = parseInt(lines[l++], 10);

for (var t = 0; t < T; t++) {
	var N = parseInt(lines[l++], 10);

	console.log('Case #' + (t + 1) + ': ' + c[N]);
}




