var fs = require('fs');
var _ = require('lodash');
var BigInteger = require('biginteger').BigInteger;

var args = process.argv.slice(2);

var lines = fs.readFileSync(args[0]).toString().split('\n');
var t;
_.each(lines, function(line, i) {
    if (i == 0) {
        t = parseInt(line);
        return;
    } else if (i <= t) {
        var tokens = line.split(' ');
        var n = parseInt(tokens[0]);
        var j = parseInt(tokens[1]);
        console.log('Case #%d:\n%s', i, solve(n, j));
    }
});

function solve(n, j) {
    var mid = 0;
    var result = [];
    var jamcoin, ds;

    while(1) {
        jamcoin = '1' + leftPad(Number(mid).toString(2), n - 2) + '1';
        ds = [];
        for (var base = 2; base <= 10; base++) {
            var bigX = BigInteger.parse(jamcoin, base);
            var d = findDivisor(bigX);
            if (d <= 0) break; // prime

            ds.push(d);
        }
        if (ds.length == 9) result.push(jamcoin + ' ' + ds.join(' '));
        if (result.length >= j) break;

        mid++;
    }
    return result.join('\n');
}
function leftPad(str, len) {
    var count = len - str.length;
    while(count--) str = '0' + str;
    return str;
}
function findDivisor(x) {
    // FIXME: no BigInteger.sqrt
    var limit = BigInteger(100000);
    for (var i = BigInteger(2); i.compare(limit) <= 0; i = i.next()) {
        if (x.remainder(i).compare(0) != 0) continue;

        return i.toJSValue();
    }
    return -1;
}
