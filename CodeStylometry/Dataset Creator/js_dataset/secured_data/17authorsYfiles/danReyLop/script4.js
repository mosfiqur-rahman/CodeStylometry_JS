'use strict';

function parseInput(callback) {
    let readline = require('readline');
    let lines = [];
    lines.next = function (n) {
        return lines.splice(0, n || 1);
    };
    readline.createInterface({
        input: process.stdin
    }).on('line', line => lines.push(line))
      .on('close', () => callback(lines));
}

parseInput(lines => {
    let nCases = +lines.next();
    for (let n = 1; n <= nCases; n++) {
        console.log(`Case #${n}: ${solve(+lines.next())}`);
    }
});

function solve(n) {
    if (n === 0) {
        return 'INSOMNIA';
    }
    let nFill = 0;
    let mult = 1;
    const fill = [];
    for (; nFill < 10; mult++) {
        ((n * mult) + '').split('').map(x => +x).forEach(x => {
            if (!fill[x]) {
                fill[x] = true;
                nFill++;
            }
        });
    }
    return n * (mult - 1);
}
