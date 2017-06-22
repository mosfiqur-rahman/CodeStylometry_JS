var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
_.each(lines, function(line, i) {
    if (i == 0) return;

    console.log('Case #%d: %s', i, solve(line));
});

function solve(line) {
    var count, cur;
    _.each(line, function(c, i) {
        if (i == 0) {
            count = 0;
            cur = c;
        } else if (c != cur) {
            count++;
            cur = c;
        }
    });

    if (line[line.length - 1] == '-') count++;
    return count;
}
