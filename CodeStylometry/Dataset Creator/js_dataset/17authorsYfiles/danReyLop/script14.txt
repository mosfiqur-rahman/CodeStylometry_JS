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
        const chunks = lines.next().split(' ').map(x => +x);
        console.log(`Case #${n}: ${solve(chunks[0], chunks[1], chunks[2])}`);
        solve(chunks[0], chunks[1]);
    }
});

function solve(k, c, s) {
    if (s < k) {
        return 'IMPOSSIBLE';
    } else {
        const tiles = [];
        for (let i = 0; i < s; i++) {
            tiles.push(i + 1);
        }
        return tiles.join(' ');
    }
}
