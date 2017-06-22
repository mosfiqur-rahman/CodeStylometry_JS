var fs = require('fs');

if (process.argv.length < 3) return console.error('Usage: node program.js inputfile');

var lines = fs.readFileSync(process.argv[2], 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
var l = 0;

var T = parseInt(lines[l++], 10);

var M = {
	'1': { '1': '1', 'i': 'i', 'j': 'j', 'k': 'k', '-1': '-1', '-i': '-i', '-j': '-j', '-k': '-k' },
	'i': { '1': 'i', 'i': '-1', 'j': 'k', 'k': '-j', '-1': '-i', '-i': '1', '-j': '-k', '-k': 'j' },
	'j': { '1': 'j', 'i': '-k', 'j': '-1', 'k': 'i', '-1': '-j', '-i': 'k', '-j': '1', '-k': '-i' },
	'k': { '1': 'k', 'i': 'j', 'j': '-i', 'k': '-1', '-1': '-k', '-i': '-j', '-j': 'i', '-k': '1' },
	'-1': { '1': '-1', 'i': '-i', 'j': '-j', 'k': '-k', '-1': '1', '-i': 'i', '-j': 'j', '-k': 'k' },
	'-i': { '1': '-i', 'i': '1', 'j': '-k', 'k': 'j', '-1': 'i', '-i': '-1', '-j': 'k', '-k': '-j' },
	'-j': { '1': '-j', 'i': 'k', 'j': '1', 'k': '-i', '-1': 'j', '-i': '-k', '-j': '-1', '-k': 'i' },
	'-k': { '1': '-k', 'i': '-j', 'j': 'i', 'k': '1', '-1': 'k', '-i': 'j', '-j': '-i', '-k': '-1' }
};

var D = {
	'1': { '1': '1', 'i': '-i', 'j': '-j', 'k': '-k', '-1': '-1', '-i': 'i', '-j': 'j', '-k': 'k' },
	'i': { '1': 'i', 'i': '1', 'j': 'k', 'k': '-j', '-1': '-i', '-i': '-1', '-j': '-k', '-k': 'j'},
	'j': { '1': 'j', 'i': '-k', 'j': '1', 'k': 'i', '-1': '-j', '-i': 'k', '-j': '-1', '-k': '-i' },
	'k': { '1': 'k', 'i': 'j', 'j': '-i', 'k': '1', '-1': '-k', '-i': '-j', '-j': 'i', '-k': '-1' },
	'-1': { '1': '-1', 'i': 'i', 'j': 'j', 'k': 'k', '-1': '1', '-i': '-i', '-j': '-j', '-k': '-k' },
	'-i': { '1': '-i', 'i': '-1', 'j': '-k', 'k': 'j', '-1': 'i', '-i': '1', '-j': 'k', '-k': '-j' },
	'-j': { '1': '-j', 'i': 'k', 'j': '-1', 'k': '-i', '-1': 'j', '-i': '-k', '-j': '1', '-k': 'i' },
	'-k': { '1': '-k', 'i': '-j', 'j': 'i', 'k': '-1', '-1': 'k', '-i': 'j', '-j': '-i', '-k': '1' }
}

var a = ['1', 'i', 'j', 'k', '-1', '-i', '-j', '-k'];

function w(s) {
	return s.length == 1 ? ' ' + s : s;
}

function n(s) {
	if (s[0] == '-') return s[1];
	else return '-' + s[0];
}

function calcHarminoc(s) {
	var h;
	var p = '1';
	for (var i = 0; i < s.length; i++) p = M[p][s[i]];

	if (p == '1') h = 1;
	else {
		p = M[p][p];
		if (p == '1') h = 2;
		else {
			p = M[p][p];
			if (p == '1') h = 4;
			else console.error('error');
		}
	}

	return h;
}

function reduceX(x, h) {
	return Math.min(x, 2 * h + x % h);
}

for (var t = 0; t < T; t++) {
	var LX = lines[l++].split(' ').map(function(x) { return parseInt(x, 10); });
	var L = LX[0];
	var X = LX[1];
	var s = lines[l++];

	var h = calcHarminoc(s);
	var rx = reduceX(X, h);

	var ss = '';
	for (var i = 0; i < rx; i++) ss += s;

	var ch = '1';
	var q = [];
	for (var i = 0; i < ss.length; i++) {
		ch = M[ch][ss[i]];
		q.push(ch);
	}

	var r = null;

	for (var a = 0; a < Math.min(q.length - 2, 300) && r == null; a++) {
		for (var b = a + 1; b < q.length - 1 && r == null; b++) {
			var q1 = q[a];
			var q2 = q[b];
			var q3 = q[q.length - 1];
			var p2 = D[q2][q1];
			var p3 = D[q3][q2];

			if (q1 == 'i' && p2 == 'j' && p3 == 'k') r = 'YES';
		}
	}

	if (r == null) r = 'NO';

	console.log('Case #' + (t + 1) + ': ' + r);
}


