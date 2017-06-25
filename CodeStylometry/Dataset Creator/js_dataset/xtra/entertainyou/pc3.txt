'use strict';

function pancake(num) {
    var limit = Math.floor((num + 1) / 2);
    var result = num;
    for (var i = 2; i <= limit; i++) {
	var cut = Math.floor((num + i - 1) / i);
	var r = cut - 1 + i;
	//console.log(num, i, result, cut, r)
	result = Math.min(result, r);
    }

    return result;
}

function pancakes(nums) {
    var max = Math.max.apply(null, nums);
    var result = max;
    //var limit = Math.floor((max + 1) / 2);
    var limit = max;
    for (var i = 2; i <= limit; i++) {
	var tc = 0;
	nums.forEach(function (elem) {
	    var cut = Math.floor((elem + i - 1) / i);
	    tc += cut - 1;

	});
	//console.log('i', i, 'result', result, tc + i, nums);
	// if (tc + i < result) {
	//     console.log(i, max, tc + i);
	// }
	result = Math.min(result, tc + i);
    }
    return result;
}

function brute2(num) {
    //x + f / (x + 1)
    var min = num;
    for (var i = 1; i < num; i++) {
	min = Math.min(min, i + Math.floor((num + i) / (i + 1)));
    }
    return min;
}

var util = require('util');
var input = '';

var assert = require('assert');

function test() {
    for (var i = 1; i < 32; i++) {
	assert.equal(pancakes([i]), brute2(i), 'Not equat at ' + i);
    }
    assert.equal(pancakes([2, 7, 10]), 7);
    assert.equal(pancakes([3, 9]), 5);
}

test();
process.stdin.on('data', function (data) {
    input += data.toString();
});

process.stdin.on('end', function () {
    var lines = input.split('\n');
    var tc = +lines[0];

    for (var i = 0; i < tc; i++) {
	var count = +lines[1 + 2 * i];
	var vals = lines[1 + 2 * i + 1].split(' ').map(function (elem) { return +elem });
	console.log(util.format('Case #%d: %d', i + 1, pancakes(vals)));
    }
});


