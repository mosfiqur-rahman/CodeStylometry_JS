'use strict';

// Test remotely:
// time cat INPUT | ssh Daniel@192.168.1.XX "node -e \"`cat script.js | tr '\n' ' '`\"" | diff -y --ignore-all-space - EXPECTED_OUTPUT
// Run remotely:
// time cat INPUT | ssh Daniel@192.168.1.XX "node -e \"`cat script.js | tr '\n' ' '`\"" > OUTPUT

// Test locally:
// node script.js 1 < INPUT | diff -y --ignore-all-space - EXPECTED_OUTPUT
// Run locally:
// node script.js 1 < INPUT > OUTPUT

const cluster = require('cluster');
const nCPUs = +process.argv[process.argv.length - 1] || require('os').cpus().length;

function parseInput(callback) {
    var readline = require('readline');
    var lines = [];
    lines.next = function (n) {
        if (!n) {
            return lines.shift();
        }
        return lines.splice(0, n);
    };
    readline.createInterface({
        input: process.stdin
    }).on('line', line => lines.push(line))
        .on('close', () => callback(lines));
}

if (cluster.isMaster) {
    parseInput(lines => {
        const nCases = +lines.next();
        let n = 0;
        let nSolved = 0;
        const results = [];
        const nThreads = Math.min(nCases, nCPUs);
        if (typeof precompute !== 'undefined') {
            precompute(lines);
        }

        if (nThreads === 1) {
            while (nSolved < nCases) {
                console.log(`Case #${++nSolved}: ${solve.apply(null, getNextCase(lines))}`);
            }
            return;
        }

        function printResults() {
            console.warn('============');
            console.log(results.map((res, i) => `Case #${i + 1}: ${res}`).join('\n'));
        }

        function assignWork(worker) {
            if (n >= nCases) {
                return;
            }
            worker.nCase = n;
            worker.send(getNextCase(lines));
            n++;
        }

        function processResult(worker, res) {
            console.warn(`Case #${worker.nCase + 1}: ${res}`);
            results[worker.nCase] = res;
            nSolved++;
            if (nSolved === nCases) {
                printResults();
                process.exit();
            } else {
                assignWork(worker);
            }
        }

        for (let i = 0; i < nThreads; i++) {
            const worker = cluster.fork();
            worker.on('message', (msg) => {
                switch (msg.action) {
                    case 'ready':
                        assignWork(worker);
                        break;
                    case 'result':
                        processResult(worker, msg.payload);
                        break;
                }
            });
        }
    });
} else {
    let processing = false;
    process.on('message', args => {
        processing = true;
        process.send({action: 'result', payload: solve.apply(null, args)})
    });

    (function sendReady() {
        if (!processing) {
            process.send({action: 'ready'});
            setTimeout(sendReady, 100);
        }
    })();
}

/* Until this point is all boilerplate */

function getNextCase(lines) {
    return [lines.next()];
}

const numbers = [
    'ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'
].map(x => x.split(''));

const letters = [
    [0,  'Z'],
    [2,  'W'],
    [8,  'G'],
    [4,  'U'],
    [5,  'F'],
    [6,  'X'],
    [7,  'V'],
    [3,  'T'],
    [1,  'O'],
    [9,  'I']
];

function solve(str) {
    const chars = str.split('').sort();
    const nChars = {};
    chars.forEach(ch => {
        if (!nChars[ch]) {
            nChars[ch] = 0;
        }
        nChars[ch]++;
    });
    const acc = numbers.map(x => 0);
    letters.forEach(pack => {
        const n = pack[0];
        const l = pack[1];
        const q = nChars[l];
        if (q) {
            numbers[n].forEach(ch => {
                nChars[ch] -= q;
            });
            acc[n] += q;
        }
    });
    return acc.map((q, n) => (n + '').repeat(q)).join('');
}
