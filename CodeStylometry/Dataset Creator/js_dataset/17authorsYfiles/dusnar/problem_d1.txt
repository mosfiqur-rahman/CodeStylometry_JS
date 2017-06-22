
var fs = require('fs');
var BigNumber = require('bignumber.js');

var lines = (fs.readFileSync(process.argv[2]) + '').replace(/\r/g, '').split('\n');
var T = parseInt(lines[0], 10);
var li = 1;

function solution(K, C, S) {
	var n = Math.floor((K - 1) / C) + 1;
	if (n > S) return 'IMPOSSIBLE';

	var s = [];

	for (var i = 0; i < n; i++) {
		var c = new BigNumber(0);
		for (var j = 0; j < C && i * C + j < K; j++) {
			c = c.add(new BigNumber(K).pow(C - j - 1).mul(j + i * C));
			// c += Math.pow(K, C - j - 1) * (j + i * C);
		}
		s.push(c.add(1).toFixed());
	}

	// for (var i = 0; i < S; i++) {
	// 	var rs = new BigNumber(K).pow(C - 1).mul(i).add(1).toFixed();
	// 	s.push(rs);
	// }

	return s.join(' ');
}

for (var ti = 0; ti < T; ti++)
{
	var l = lines[li++].split(' ').map(function(s){ return parseInt(s, 10); });
	var K = l[0];
	var C = l[1];
	var S = l[2];

	console.log('Case #' + (ti + 1) + ': ' + solution(K, C, S));
}

