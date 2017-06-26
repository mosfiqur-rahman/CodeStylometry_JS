
var fs = require('fs');

var lines = (fs.readFileSync(process.argv[2]) + '').replace(/\r/g, '').split('\n');
var T = parseInt(lines[0], 10);
var li = 1;

function solution(l) {
	var plusFirst = (l[0] === '+');
	var ch = '';
	var minusCount = 0;

	for (var i = 0; i < l.length; i++) {
		if (l[i] === '-' && ch !== '-') minusCount++;
		ch = l[i];
	}

	var r = minusCount * 2 - 1;
	if (plusFirst) r++;

	return r;
}

for (var ti = 0; ti < T; ti++)
{
	var l = lines[li++];

	var r = solution(l);
	console.log('Case #' + (ti + 1) + ': ' + r);
}

