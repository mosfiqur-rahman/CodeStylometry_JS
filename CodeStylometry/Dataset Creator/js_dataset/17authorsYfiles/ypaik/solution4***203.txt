//Usage: node solution.js file.in > file.out
'use strict';

var fs = require('fs');
var data = fs.readFileSync(process.argv[2], 'utf-8').replace(/\r/g, '').split('\n').filter(String);

function addArray(src, addv) {
	var srcR = src.reverse()

	var sum = [],
			carry = 0;
	for(var i = 0; i < src.length; i++) {
		var cSrcR = srcR[i],
				cAddv = addv.length > i ? addv[i] : 0,
		    cSum = cSrcR + cAddv + carry,
				cSumV = cSum % 10;
				carry = cSum > 9 ? 1 : 0;
		sum.push(cSumV);
	}

	if(carry) {
		sum.push(carry);
	}

	return sum.reverse();
}

function trackApp(count, map) {
	count.forEach(function(item) {
		if(!(item in map)) {
			map[item] = true;
		}
	});
}

function prepare(data) {
	var setup = data.shift();

	var cases = [];
	for(var i = 0; i < setup; i++) {
		cases.push(data.shift().split('').map(Number));
	}

	return {
		cases: cases
	};
}

function solve(data) {
	data.cases.forEach(function(item, index) {
		var cCount = item.slice();
		var cMap = {};
		
		if(item.length === 1 && item[0] === 0) {
			console.log('Case #' + (index + 1) + ': INSOMNIA');
		}
		else {
			trackApp(cCount, cMap);
			item.reverse();
			while(Object.keys(cMap).length < 10) {
				cCount = addArray(cCount, item);
				trackApp(cCount, cMap);
			}

			console.log('Case #' + (index + 1) + ': ' + cCount.join(''));
		}
	});
}

solve(prepare(data));