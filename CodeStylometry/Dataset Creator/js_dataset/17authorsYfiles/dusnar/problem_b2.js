
var fs = require('fs');
// var Big = require('big.js');
var BigNumber = require('bignumber.js');

var lines = (fs.readFileSync(process.argv[2]) + '').replace(/\r/g, '').split('\n');
var T = parseInt(lines[0], 10);
var li = 1;

function r(x, n) {
	var s = ''
	for (var i = 0; i < n; i++) s += x;

	return s;
}

for (var ti = 0; ti < T; ti++)
{
	var l = lines[li++].split(' ');
	var B = parseInt(l[0], 10);
	var M = new BigNumber(l[1]);

	var max = new BigNumber(2).pow(B - 2);
	var possible = M.lte(max);

	console.log('Case #' + (ti + 1) + ': ' + (possible ? 'POSSIBLE' : 'IMPOSSIBLE'));

	if (!possible) continue;

	if (M.eq(max)) {
		console.log('0' + r('1', B - 1));
	} else {
		var f = M.toString(2) + '0';
		f = r('0', B - f.length) + f;
		console.log(f);
	}

	for (var i = 1; i < B; i++) {
		console.log(r('0', i + 1) + r('1', B - i - 1));
	}
}


