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
    lines.next();
    return [lines.next().split(' ').map(x => +x)];
}

const A = 65;

function maxIndex(arr) {
    let i = -1;
    let m = -1;
    arr.forEach((n, index) => {
        if (n > m) {
            m = n;
            i = index;
        }
    });
    return i;
}

function solve(senators) {
    let n = senators.reduce((a, b) => a + b, 0);
    let res = '';
    while (n) {
        let i = maxIndex(senators);
        senators[i]--;
        n--;
        res += String.fromCharCode(A + i);
        if (n && senators[maxIndex(senators)] <= n / 2) {
            res += ' ';
        }
    }
    return res;
}
