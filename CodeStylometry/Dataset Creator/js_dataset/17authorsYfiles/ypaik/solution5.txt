//Usage: node solution.js file.in > file.out
'use strict';

var fs = require('fs');
var data = fs.readFileSync(process.argv[2], 'utf-8').replace(/\r/g, '').split('\n').filter(String);

function prepare(data) {
	var caseNum = data.shift();

	var cases = [];
	for(var i = 0; i < caseNum; i++) {
		cases.push({
			word: data.shift().split('')
		});
	}

	return {
		cases: cases
	};
}

function solve(data) {
	data.cases.forEach(function(item, index) {
		var solution = item.word[0];

		for(var i = 1; i < item.word.length; i++) {
			var btemp = item.word[i] + solution;
			var atemp = solution + item.word[i];
			solution = btemp < atemp ? atemp : btemp;
		}
		

		console.log('Case #' + (index + 1) + ': ' + solution);
	});
}

solve(prepare(data));