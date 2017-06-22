_ = require('underscore');
var fs = require('fs');

if (process.argv.length < 3) return console.error('Usage: node program.js inputfile');

var lines = fs.readFileSync(process.argv[2], 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
var l = 0;

var T = parseInt(lines[l++], 10);

function startedCutting(M, time) {
	var s = 0;
	for (var i = 0; i < M.length; i++) {
		s += ~~(time / M[i]);
		if (time % M[i] > 0) s++;
	}

	return s;
}

function LCM(A) {
	var n = A.length,
		a = Math.abs(A[0]);
	for (var i = 1; i < n; i++) {
		var b = Math.abs(A[i]),
			c = a;
		while (a && b) {
			a > b ? a %= b : b %= a;
		}
		a = Math.abs(c * A[i]) / (a + b);
	}
	return a;
}

for (var t = 0; t < T; t++) {
	var BN = lines[l++].split(' ').map(function(x) { return parseInt(x, 10); });
	var B = BN[0];
	var N = BN[1];

	var M = lines[l++].split(' ').map(function(x) { return parseInt(x, 10); });

	var lc = LCM(M);
	var p = 0;
	for (var i = 0; i < M.length; i++) {
		p += (lc / M[i]);
	}

	N = (N - 1) % p + 1;

	var t1 = 0;
	var t2 = 1;

	while (startedCutting(M, t2) < N) {
		t1 = t2;
		t2 *= 2;
	}

	while (t2 - t1 > 1) {
		var tm = t1 + ~~((t2 - t1) / 2);
		if (startedCutting(M, tm) < N) t1 = tm;
		else t2 = tm;
	}

	var beforeMe = N - startedCutting(M, t1) - 1;

	var ind = [];
	for (var i = 0; i < M.length; i++) {
		if (t1 % M[i] === 0) ind.push(i);
	}

	var r = ind[beforeMe] + 1;

	console.log('Case #' + (t + 1) + ': ' + r);
}


