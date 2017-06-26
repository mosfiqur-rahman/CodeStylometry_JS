
var fs = require('fs');

var lines = (fs.readFileSync(process.argv[2]) + '').replace(/\r/g, '').split('\n');
var T = parseInt(lines[0], 10);
var li = 1;

function solution(N) {
	if (N == 0) return 'INSOMNIA';

	var r = 1;
	var seen = {};
	var seenCount = 0;

	while (true) {
		var sn = (N * r) + '';
		for (var i = 0; i < sn.length; i++) {
			var ch = sn[i];
			if (!seen[ch]) {
				seen[ch] = true;
				seenCount++;
			}
		}

		if (seenCount == 10) return (sn);
		r++;
	}
}

for (var ti = 0; ti < T; ti++)
{
	var l = lines[li++].split(' ').map(function(s){ return parseInt(s, 10); });
	var N = l[0];

	console.log('Case #' + (ti + 1) + ': ' + solution(N));
}

