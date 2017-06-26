
var fs = require('fs');

if (process.argv.length < 3) return console.error('Usage: node program.js inputfile');

var lines = fs.readFileSync(process.argv[2], 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
var l = 0;

var T = parseInt(lines[l++], 10);

var dir = [{ y: -1, x: 0 }, { y: 0, x: 1 }, { y: 1, x: 0 }, { y: 0, x: -1 }];
var dird = { '^': 0, '>': 1, 'v': 2, '<': 3 };

function findNext(R, C, m, y, x, di) {
	var i = 1;
	var dd = dir[di];

	while (y + dd.y * i >= 0 && y + dd.y * i < R && x + dd.x * i >= 0 && x + dd.x * i < C) {
		if (m[y + dd.y * i][x + dd.x * i] in dird) return 1;
		i++;
	}

	return 0;
}

// var m = [
// '^'.split(''),
// '^'.split(''),
// ];

// console.log(findNext(2, 1, m, 0, 0, 2));
// return;

for (var t = 0; t < T; t++) {
	var RC = lines[l++].split(' ').map(function(x) { return parseInt(x, 10); });
	var R = RC[0];
	var C = RC[1];

	var m = [];
	for (var y = 0; y < R; y++) m.push(lines[l++].split(''));

	var r = 0;
	for (var y = 0; y < R && r !== null; y++) {
		for (var x = 0; x < C && r !== null; x++) {
			if (m[y][x] == '.') continue;

			var di = dird[m[y][x]];
			var n = findNext(R, C, m, y, x, di);

			if (n == 0) {
				var c = 0;
				for (k = 1; k < 4; k++) {
					c += findNext(R, C, m, y, x, (di + k) % 4);
				}

				if (c == 0) r = null;
				else r++;
			}
		}
	}

	if (r == null) r = 'IMPOSSIBLE';

	console.log('Case #' + (t + 1) + ': ' + r);
}

