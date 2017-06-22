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
    const line = lines.next().split(' ').map(x => x.split('').map(y => y === '?' ? y : +y));
    return [line[0], line[1]];
}

function solve(a, b) {
    return solverec(a, b, 0).join(' ');
}

function solverec(aa, bb, diff) {
    if (aa.length === 0) {
        return ['', ''];
    }
    let r = [];
    const a = aa.slice();
    const b = bb.slice();
    let na = a.shift();
    let nb = b.shift();
    if (diff === 0) {
        if (na === '?') {
            if (nb === '?') {
                na = nb = 0;
                let newDiff = diff + 1;
                r.push([0, 1, solverec(a, b, newDiff * 10)]);
                newDiff = diff - 1;
                r.push([1, 0, solverec(a, b, newDiff * 10)]);
            } else {
                na = nb;
                if (na === 9) {
                    let newDiff = diff + 9;
                    r.push([0, nb, solverec(a, b, newDiff * 10)]);
                } else {
                    let newDiff = diff - 1;
                    r.push([nb + 1, nb, solverec(a, b, newDiff * 10)]);
                }
                if (na === 0) {
                    let newDiff = diff - 9;
                    r.push([9, nb, solverec(a, b, newDiff * 10)]);
                } else {
                    let newDiff = diff + 1;
                    r.push([nb - 1, nb, solverec(a, b, newDiff * 10)]);
                }
            }
        } else {
            if (nb === '?') {
                nb = na;
                if (nb === 9) {
                    let newDiff = diff - 1;
                    r.push([na, 0, solverec(a, b, newDiff * 10)]);
                } else {
                    let newDiff = diff + 1;
                    r.push([na, na + 1, solverec(a, b, newDiff * 10)]);
                }
                if (nb === 0) {
                    let newDiff = diff + 9;
                    r.push([na, 9, solverec(a, b, newDiff * 10)]);
                } else {
                    let newDiff = diff - 1;
                    r.push([na, na - 1, solverec(a, b, newDiff * 10)]);
                }
            }
        }
        const newDiff = diff + (nb - na);
        r.push([na, nb, solverec(a, b, newDiff * 10)]);
    } else {
        if (diff > 0) { // b bigger
            if (na === '?') {
                na = 9;
            }
            if (nb === '?') {
                nb = 0;
            }
        }
        if (diff < 0) { // a bigger
            if (na === '?') {
                na = 0;
            }
            if (nb === '?') {
                nb = 9;
            }
        }
        const newDiff = diff + (nb - na);
        r.push([na, nb, solverec(a, b, newDiff * 10)]);
    }
    r = r.map(elem => {
        const a = elem[0] + elem[2][0];
        const b = elem[1] + elem[2][1];
        return [a, b];
    });
    let bestElem = r[0];
    let diffBest = Math.abs(bestElem[0] - bestElem[1]);
    r.forEach(elem => {
        const diff = Math.abs(elem[0] - elem[1]);
        if (diff < diffBest) {
            diffBest = diff;
            bestElem = elem;
        } else if (diff === diffBest) {
            if (elem[0] < bestElem[0]) {
                diffBest = diff;
                bestElem = elem;
            } else if (elem[0] === bestElem[0]) {
                if (elem[1] < bestElem[1]) {
                    diffBest = diff;
                    bestElem = elem;
                }
            }
        }
    });
    return [bestElem[0], bestElem[1]];
}
