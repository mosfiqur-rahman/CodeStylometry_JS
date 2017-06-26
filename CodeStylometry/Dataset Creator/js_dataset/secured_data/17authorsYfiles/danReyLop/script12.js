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
        const num = +(lines.next());
        const l = lines.next((2*num)-1).map(x => x.split(' ').map(x => +x));
        console.log(`Case #${n}: ${solve(num, l)}`);
    }
});

function solve(n, l) {
    const rows = [];
    let nRows = n;
    let min = 2500;
    let max = 1;
    const mults = {};
    l.forEach(line => {
        min = Math.min(min, Math.min.apply(null, line));
        max = Math.max(max, Math.max.apply(null, line));
        const key = line.join(',');
        if (mults[key]) {
            mults[key]++;
        } else {
            mults[key] = 1;
        }
    });
    for (let i = 0; i < n; i++) {
        rows[i] = false;
    }
    const cols = [];
    let nCols = n;
    for (let i = 0; i < n; i++) {
        cols[i] = false;
    }
    const formation = [];
    for (let i = 0; i < n; i++) {
        formation[i] = [];
    }
    while (nCols + nRows > 1) {
        for (let i = 0; i < l.length; i++) {
            let line = l[i];
            let mult = mults[line.join(',')];
            let valids = 0;
            let isCol, index;
            for (let i = 0; i < n; i++) {
                if (cols[i]) {
                    continue;
                }
                let valid = true;
                for (let a = 0; a < n; a++) {
                    if (formation[a][i] && line[a] !== formation[a][i]) {
                        valid = false;
                        break;
                    }
                    let h = min - 1;
                    for (let b = 0; b < n; b++) {
                        let newH = formation[a][b] || (h + 1);
                        if (b === i) {
                            newH = line[a];
                        }
                        if (newH <= h || newH > max) {
                            valid = false;
                            break;
                        }
                        h = newH;
                    }
                    if (!valid) {
                        break;
                    }
                }
                if (valid) {
                    valids++;
                    isCol = true;
                    index = i;
                    if (valids > mult) {
                        break;
                    }
                }
            }
            if (valids > mult) {
                continue;
            }
            for (let i = 0; i < n; i++) {
                if (rows[i]) {
                    continue;
                }
                let valid = true;
                for (let a = 0; a < n; a++) {
                    if (formation[i][a] && line[a] !== formation[i][a]) {
                        valid = false;
                        break;
                    }
                    let h = min - 1;
                    for (let b = 0; b < n; b++) {
                        let newH = formation[b][a] || (h + 1);
                        if (b === i) {
                            newH = line[a];
                        }
                        if (newH <= h || newH > max) {
                            valid = false;
                            break;
                        }
                        h = newH;
                    }
                    if (!valid) {
                        break;
                    }
                }
                if (valid) {
                    valids++;
                    isCol = false;
                    index = i;
                    if (valids > mult) {
                        break;
                    }
                }
            }
            if (valids === mult || (mult === 1 && valids === 2 && simetric(formation))) {
                l.splice(i, 1);
                mults[line.join(',')]--;
                if (isCol) {
                    nCols--;
                    cols[index] = true;
                    line.forEach((n, i) => formation[i][index] = n);
                } else {
                    nRows--;
                    rows[index] = true;
                    line.forEach((n, i) => formation[index][i] = n);
                }
                break;
            }
        }
    }
    if (nCols === 1) {
        for (let i = 0; i < n; i++) {
            if (!cols[i]) {
                return formation.map(x => x[i]).join(' ');
            }
        }
    }
    if (nRows === 1) {
        for (let i = 0; i < n; i++) {
            if (!rows[i]) {
                return formation[i].join(' ');
            }
        }
    }
}

function simetric(formation) {
    const n = formation.length;
    for (let a = 0; a < n; a++) {
        for (let b = 0; b < n; b++) {
            if (formation[a][b] !== formation[b][a]) {
                return false;
            }
        }
    }
    return true;
}