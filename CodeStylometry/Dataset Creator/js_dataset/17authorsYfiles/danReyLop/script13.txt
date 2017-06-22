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
        console.log(`Case #${n}:`);
        solve(chunks[0], chunks[1]);
    }
});

function solve(n, j) {
    const num = Math.pow(2, n - 2);
    for (let i = 0; i < num; i++) {
        let s = i.toString(2);
        while (s.length < n - 2) {
            s = '0' + s;
        }
        s = '1' + s + '1';
        const divisors = [];
        let valid = true;
        for (let i = 2; i <= 10; i++) {
            const n = parseInt(s, i);
            const limit = Math.sqrt(n);
            let found = false;
            for (let div = 2; div <= limit; div++) {
                if (n % div === 0) {
                    found = true;
                    divisors.push(div);
                    break;
                }
            }
            if (!found) {
                valid = false;
                break;
            }
        }
        if (valid) {
            console.log(s + ' ' + divisors.join(' '));
            if (!--j) {
                return;
            }
        }
    }
}
