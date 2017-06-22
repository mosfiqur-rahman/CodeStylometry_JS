'use strict';

function parseInput(callback) {
    let readline = require('readline');
    let lines = [];
    lines.next = function (n) {
        n = n || 1;
        return n === 1 ? lines.shift() : lines.splice(0, n);
    };
    readline.createInterface({
        input: process.stdin
    }).on('line', line => lines.push(line))
      .on('close', () => callback(lines));
}

parseInput(lines => {
    let nCases = +lines.next();
    for (let n = 1; n <= nCases; n++) {
        console.log(`Case #${n}: ${solve(lines.next())}`);
    }
});

function solve(str) {
    const s = str.split('').map(x => x.charCodeAt(0));
    const w = [];
    s.forEach(ch => {
        if (w.length === 0 || w[0] > ch) {
            w.push(ch);
        } else {
            w.unshift(ch);
        }
    });
    return w.map(x => String.fromCharCode(x)).join('');
}
