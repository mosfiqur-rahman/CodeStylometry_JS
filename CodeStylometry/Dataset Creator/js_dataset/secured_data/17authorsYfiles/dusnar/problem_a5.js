
var fs = require('fs');

var lines = (fs.readFileSync(process.argv[2]) + '').replace(/\r/g, '').split('\n');
var T = parseInt(lines[0], 10);
var li = 1;

function solution(s) {
	var r = s[0];

	for (var i = 1; i < s.length; i++) {
		if (s[i].charCodeAt() >= r[0].charCodeAt()) r = s[i] + r;
		else r = r + s[i];
	}

	return r;
}

for (var ti = 0; ti < T; ti++)
{
	var S = lines[li++];

	console.log('Case #' + (ti + 1) + ': ' + solution(S));
}

