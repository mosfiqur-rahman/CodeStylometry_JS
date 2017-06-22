var fs = require('fs');

var lines = (fs.readFileSync(process.argv[2]) + '').replace(/\r/g, '').split('\n');
var T = parseInt(lines[0], 10);
var li = 1;

for (var ti = 0; ti < T; ti++)
{
	var l = lines[li++].split(' ').map(function(s){ return parseInt(s, 10); });
	var N = l[0];
	var p = lines[li++].split(' ').map(function(s){ return parseInt(s, 10); });
// if (ti != 0) continue;

	var r = [];
	var s = 0;
	for (var i = 0; i < p.length; i++) s += p[i];

	while (s > 0) {
		var maxi = 0;
		for (var i = 1; i < p.length; i++) if (p[i] > p[maxi]) maxi = i;

		var d = [];
		for (var i = 0; i < p.length; i++) d.push(i);
		d.sort(function(a, b) { return p[b] - p[a]; });

		if (p[d[0]] > 1) {
			if (p[d[0]] == p[d[1]]) {
				r.push(String.fromCharCode('A'.charCodeAt() + d[0]) + String.fromCharCode('A'.charCodeAt() + d[1]));
				p[d[0]]--;
				p[d[1]]--;
				s -= 2;
			} else {
				r.push(String.fromCharCode('A'.charCodeAt() + d[0]));
				p[d[0]]--;
				s--;
			}
		} else {
			var f = -1;
			for (var i = 2; i < p.length; i++) {
				if (p[i] > 0) {
					f = i;
					break;
				}
			}

			if (f > 0) {
				r.push(String.fromCharCode('A'.charCodeAt() + f));
				p[f]--;
				s--;
			} else {
				r.push('AB');
				p[0]--;
				p[1]--;
				s -= 2;
			}
		}

		for (var i = 0; i < p.length; i++) {
			if (s !== 0) {
				if (p[i] / s > 0.5) {
					console.log('!!!!');
				}
			}
		}
	}

	r = r.join(' ');

	console.log('Case #' + (ti + 1) + ': ' + r);
}


