var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    console.log('Case #%d: %s', i + 1, solve(lines[l++]));
}

function solve(line) {
    var count = {};
    _.each(line, function(c, i) {
        count[c] = count[c] || 0;
        count[c]++;
    });

    var result = [];
    var special = [
        [0, 'Z', 'ZERO'],
        [2, 'W', 'TWO'],
        [4, 'U', 'FOUR'],
        [6, 'X', 'SIX'],
        [7, 'S', 'SEVEN'],
        [5, 'V', 'FIVE'],
        [1, 'O', 'ONE'],
        [8, 'G', 'EIGHT'],
        [3, 'R', 'THREE'],
        [9, 'I', 'NINE']
    ];
    _.each(special, function(arr) {
        addNum(result, arr[0], count[arr[1]])
        updateCount(count, arr[2], count[arr[1]]);
    });

    return _.sortBy(result).join('');
}

function addNum(result, n, c) {
    c = c || 0;
    _.each(_.range(c), function() {
        result.push(n);
    });
}

function updateCount(count, str, c) {
    c = c || 0;
    _.each(str, function(ch) {
        if (count[ch]) {
            count[ch] -= c;
        }
    });
}
