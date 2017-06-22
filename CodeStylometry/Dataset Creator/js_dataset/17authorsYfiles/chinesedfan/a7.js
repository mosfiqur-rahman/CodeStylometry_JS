var fs = require('fs');
var _ = require('lodash');

var args = process.argv.slice(2);

var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var lines = fs.readFileSync(args[0]).toString().split('\n');
var t = parseInt(lines[0]);
var l = 1;
for (var i = 0; i < t; i++) {
    var n = lines[l++];
    var list = _.map(lines[l++].split(' '), function(token) { return parseInt(token); });
    console.log('Case #%d: %s', i + 1, solve(list));
}

function solve(arr) {
    var total = _.sum(arr);
    arr = _(arr).map(function(c, i) {
        return {
            count: c,
            ch: ALPHA[i]
        }
    }).sortBy(function(item) {
        return -item.count;
    }).value();

    var steps = [];
    while (total) {
        if (arr.length == 1) {
            if (arr[0].count > 1) {
                steps.push(arr[0].ch + arr[0].ch);
                arr[0].count -= 2;
                total -= 2;
            } else {
                steps.push(arr[0].ch);
                arr[0].count--;
                total--;
            }
        } else if (total - 1 >= 2 * arr[1].count) {
            var item = arr.shift();
            steps.push(item.ch);
            item.count--;
            total--;

            insertItem(arr, item);
        } else {
            var item1 = arr.shift();
            var item2 = arr.shift();
            steps.push(item1.ch + item2.ch);
            item1.count--;
            total--;
            item2.count--;
            total--;

            insertItem(arr, item1);
            insertItem(arr, item2);
        }
    }
    return steps.join(' ');
}

function insertItem(arr, item) {
    if (!item.count) return;

    var i = 0;
    while (i < arr.length && arr[i].count > item.count) i++;
    arr.splice(i, 0, item);
}
