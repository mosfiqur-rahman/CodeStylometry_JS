//Usage: npm install big-integer
//Usage: node solution.js file.in > file.out
'use strict';

var fs = require('fs');
var bigInt = require('big-integer');
var data = fs.readFileSync(process.argv[2], 'utf-8').replace(/\r/g, '').split('\n').filter(String);

var solutions = {};
var globalSetup = {};

function findDivisor(value) {
	for(var i = 2; i <= 97; i++) {
		if(value.isDivisibleBy(i)) {
			return i;
		}
	}
	return false;
}

function check(value) {
	var checkSums = {
		value: value.toString()
	};
	for(var i = 2; i <= 10; i++) {
		var current = bigInt(value, i);
		if(current.isPrime()) {
			return false;
		}
		var divisor = findDivisor(current);
		if(!divisor) {
			return false;
		}
		checkSums[i] = divisor;
	}
	return checkSums;
}

function printSolution() {
	var solution = '';
	console.log('Case #1: ');
	Object.keys(solutions).forEach(function(key) {
		var obj = solutions[key];
		console.log(key + ' ' + solutions[key].join(' '));
	});
	process.exit();
}

function recBase(value) {
	var match = check(value.join(''));
	if(match) {
		var divisors = [];
		for(var i = 2; i <= 10; i++) {
			divisors.push(match[i]);
		}
		var strRep = match.value.toString();
		solutions[strRep] = divisors;
		if(Object.keys(solutions).length == globalSetup.num) {
			printSolution();
		}
	}
}

function findPotential(value, index) {
	if(index == 0) {
		recBase(value);
		return;
	}
	
	var zValues = value.slice();
	var oValues = value.slice();
	oValues[index] = '1';

	findPotential(zValues, index - 1);
	findPotential(oValues, index - 1);
}

function prepare(data) {
	var setup = data.shift();

	var cases = [];
	for(var i = 0; i < setup; i++) {
		var param = data.shift().split(' ');
		cases.push({
			length: param[0],
			num: param[1]
		});
	}

	globalSetup = cases[0];

	return {
		cases: cases
	};
}

function solve(data) {
	data.cases.forEach(function(item, index) {
		
		var iValue = ['1'];
		for(var i = 1; i < item.length - 1; i++) {
			iValue.push('0');
		}
		iValue.push('1');

		findPotential(iValue, item.length - 2);
	});
}

solve(prepare(data));