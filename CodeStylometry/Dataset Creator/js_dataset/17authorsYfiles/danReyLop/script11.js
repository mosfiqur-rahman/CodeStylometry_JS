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

function solve(input) {
    return solveRec(input.split('').map(x => x === '+'));
}

function solveRec(stack) {
    if (stack.length === 0) {
        return 0;
    } else if (stack[stack.length - 1]) {
        return solveRec(stack.slice(0, stack.length - 1));
    } else {
        return 1 + solveRec(stack.slice(0, stack.length - 1).map(x => !x));
    }
}
