//Usage: node solution.js file.in > file.out
'use strict';

var fs = require('fs');
var data = fs.readFileSync(process.argv[2], 'utf-8').replace(/\r/g, '').split('\n').filter(String);

function prepare(data) {
	var numCase = data.shift();	

	var cases = [];
	for(var i = 0; i < numCase; i++) {
		cases.push({
			letters: data.shift().split('')
		});
	}

	return {
		cases: cases
	};
}

function buildFreqMap(list) {
	var map = {};
	list.forEach(function(letter) {
		if(map[letter]) {
			map[letter] = map[letter] + 1;
		}
		else {
			map[letter] = 1;
		}
	});
	return map;
}

function countFIter(map, list, target, num, all) {
	var ts = map[target];
	var letters = all.split('');
	if(!ts) return;
	for(var i = 0; i < ts; i++) {
		list.push(num);
	}
	letters.forEach(function(letter) {
		map[letter] = map[letter] - ts;
	});
}

function solve(data) {
	data.cases.forEach(function(item, index) {

		var freqMap = buildFreqMap(item.letters);

		var solution = [];
		countFIter(freqMap, solution, 'Z', 0, 'ZERO');
		countFIter(freqMap, solution, 'W', 2, 'TWO');
		countFIter(freqMap, solution, 'U', 4, 'FOUR');
		countFIter(freqMap, solution, 'F', 5, 'FIVE');
		countFIter(freqMap, solution, 'X', 6, 'SIX');
		countFIter(freqMap, solution, 'G', 8, 'EIGHT');
		countFIter(freqMap, solution, 'O', 1, 'ONE');
		countFIter(freqMap, solution, 'H', 3, 'THREE');
		countFIter(freqMap, solution, 'V', 7, 'SEVEN');
		countFIter(freqMap, solution, 'I', 9, 'NINE');

		solution.sort();

		console.log('Case #' + (index + 1) + ': ' + solution.join(''));
	});
}

solve(prepare(data));