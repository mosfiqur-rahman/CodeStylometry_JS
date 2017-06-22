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
    var result = [];
    _.each(line, function(c, i) {
        if (i == 0 || c < result[0]) {
            result.push(c);
            return;
        } else {
            result.unshift(c);
        }
    });
    return result.join('');
}
