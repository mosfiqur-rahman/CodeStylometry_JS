//Usage: node solution.js file.in > file.out
'use strict';

var fs = require('fs');
var data = fs.readFileSync(process.argv[2], 'utf-8').replace(/\r/g, '').split('\n').filter(String);

function group(data) {
	var result = [data[0]];
	var index = 0;
	data.forEach(function(item) {
		if(item !== result[index]) {
			index += 1;
			result.push(item);
		}
	});
	return result;
}

function prepare(data) {
	var setup = data.shift();

	var cases = [];
	for(var i = 0; i < setup; i++) {
		cases.push(data.shift());
	}

	return {
		cases: cases
	};
}

function solve(data) {
	data.cases.forEach(function(item, index) {
		var grouped = group(item.split(''));
		var count = grouped.length;
		if(grouped[count-1] === '+') {
			count -= 1;
		}
		console.log('Case #' + (index + 1) + ': ' + count);
	});
}

solve(prepare(data));