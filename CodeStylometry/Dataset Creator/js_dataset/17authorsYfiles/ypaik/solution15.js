//Usage: npm install big-integer
//Usage: node solution.js file.in > file.out
'use strict';

var fs = require('fs');
var bigInt = require('big-integer');
var data = fs.readFileSync(process.argv[2], 'utf-8').replace(/\r/g, '').split('\n').filter(String);

function prepare(data) {
	var setup = data.shift();

	var cases = [];
	for(var i = 0; i < setup; i++) {
		var params = data.shift().split(' ');
		cases.push({
			k: params[0],
			c: params[1],
			s: params[2]
		});
	}

	return {
		cases: cases
	};
}

function solve(data) {
	data.cases.forEach(function(item, index) {
		var solution = '';
		var proposal = item.k / item.c
		if(proposal > item.s) {
			solution = 'IMPOSSIBLE';
		}
		else if(item.k == 1) {
			solution = 1;
		}
		else if(item.c == 1) {
			var sArray = [];
			for(var i = 1; i <= item.k; i++) {
				sArray.push(i);
			}
			solution = sArray.join(' ');
		}
		else {
			var sArray = [];
			var cPtr = 0;
			var kArray = Array.apply(null, {length: item.k}).map(Number.call, Number);
			while(cPtr < kArray.length) {
				var tArray = kArray.slice(cPtr, cPtr + item.c);
				var score = bigInt(0);
				for(var i = 0; i < tArray.length; i++) {
					var tScore = bigInt(item.k).pow(item.c - 1 - i).times(tArray[i]);
					score = score.add(tScore);
				}
				cPtr += parseInt(item.c);
				score = score.add(1);
				sArray.push(score.toString());
			}
			solution = sArray.join(' ');
		}
		console.log('Case #' + (index + 1) + ': ' + solution);
	});
}

solve(prepare(data));