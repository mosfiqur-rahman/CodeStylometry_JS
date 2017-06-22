var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
_.each(lines, function(line, i) {
    if (i == 0) return;

    var n = parseInt(line);
    console.log('Case #%d: %s', i, solve(n));
});

function solve(n) {
    if (n == 0) return 'INSOMNIA';

    var cur = n;
    var digits = {};
    while(1) {
        updateDigits(digits, cur);
        if (_.keys(digits).length == 10) break;

        cur += n;
    }
    return cur;
}
function updateDigits(digits, n) {
    n = n.toString();
    _.each(n, function(c) {
        digits[c] = 1;
    });
}
