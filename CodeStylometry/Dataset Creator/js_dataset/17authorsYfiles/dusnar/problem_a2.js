var fs = require('fs');

var lines = (fs.readFileSync(process.argv[2]) + '').replace(/\r/g, '').split('\n');
var T = parseInt(lines[0], 10);
var li = 1;

var digits = ['ZERO', 'TWO', 'FOUR', 'SIX', 'EIGHT', 'SEVEN', 'ONE', 'FIVE', 'THREE', 'NINE'];

var map = [0, 2, 4, 6, 8, 7, 1, 5, 3, 9];

var w = {};
for (var di = 0; di < digits.length; di++) {
	var d = digits[di];
	w[d] = {};

	for (var k = 0; k < d.length; k++) {
		if (!w[d][d[k]]) w[d][d[k]] = 0;
		w[d][d[k]]++;
	}
}

for (var ti = 0; ti < T; ti++)
{
	var l = lines[li++];

	var count = {};
	for (var di = 0; di <= 9; di++) {
		var d = digits[di];
		for (var k = 0; k < d.length; k++) {
			count[d[k]] = 0;
		}
	}

	var totalCount = l.length;
	for (var i = 0; i < l.length; i++) {
		var ch = l[i];
		count[ch]++;
	}

	var r = [];
	while (totalCount > 0) {
		for (var di = 0; di < digits.length; di++) {
			var d = digits[di];

			var ok = true;
			for (var k = 0; k < d.length; k++) {
				if (count[d[k]] < w[d][d[k]]) ok = false;
			}

			if (ok) {
				r.push(map[di]);
				for (var k = 0; k < d.length; k++) count[d[k]]--;
				totalCount -= d.length;
				break;
			}
		}
	}

	r.sort(function(a, b) { return a - b });

	console.log('Case #' + (ti + 1) + ': ' + r.join(''));
}


