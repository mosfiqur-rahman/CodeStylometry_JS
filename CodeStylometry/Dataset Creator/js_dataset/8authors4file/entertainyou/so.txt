'use strict';

function so(levels) {
    var standing = 0;
    var result = 0;
    levels.forEach(function (count, shyLevel) {
	if (standing < shyLevel) {
	    result += shyLevel - standing;
	    standing = shyLevel;
	}

	standing += count;
    });
    return result;
}

var util = require('util');
var input = '';
process.stdin.on('data', function (data) {
    input += data.toString();
});

process.stdin.on('end', function () {
    var lines = input.split('\n');
    var tc = +lines[0];

    for (var i = 0; i < tc; i++) {
	var line = lines[1 + i];
	//console.log(line, line.split(' ')[1].split(''));
	var levels = line.split(' ')[1].split('').map(function (elem) { return +elem });
	console.log(util.format('Case #%d: %d', i + 1, so(levels)));
    }
});
