'use strict';

var M = {};

M['1'] = {
    1: '1',
    i: 'i',
    j: 'j',
    k: 'k',
};

M['i'] = {
    1: 'i',
    i: '-1',
    j: 'k',
    k: '-j',
};

M['j'] = {
    1: 'j',
    i: '-k',
    j: '-1',
    k: 'i',
}

M['k'] = {
    1: 'k',
    i: 'j',
    j: '-i',
    k: '-1',
}

function multi(a, b) {
    var s1 = a.length === 2 ? -1 : 1;
    var s2 = b.length === 2 ? -1 : 1;

    var oa = a[a.length - 1];
    var ob = b[b.length - 1];

    var r = M[oa][ob];
    if (s1 * s2 === 1) {
        return r;
    } else {
        return r[0] === '-' ? r.slice(1) : '-' + r;
    }
}

function quickPow(seq, n) {
    if (n % 4 === 0) {
        return '1';
    }
    var sr = '1';
    var i;
    for (i = 0; i < seq.length; i++) {
        sr = multi(sr, seq[i]);
    }

    // console.log('quickPow', seq, n, sr);
    var result = '1';
    for (i = 0; i < n % 4; i++) {
        result = multi(result, sr);
    }

    return result;
}

function solve(l, x, seq) {

    // |ccccc|ccccc|ccccc|ccccc|
    function get(start, index) {
        if (index < start + 4 * l && index >= 0 && index <= l * x - 1) {
            return seq[Math.floor(index % l)];
        }
    }

    var result = '1';
    var index = 0;
    var nextOperand, start;

    start = index;
    while (result !== 'i') {
        nextOperand = get(start, index);
        if (!nextOperand) {
            return false;
        }
        result = multi(result, nextOperand);
        index += 1;
    }

    result = '1';
    start = index;
    while (result !== 'j') {
        nextOperand = get(start, index);
        if (!nextOperand) {
            return false;
        }

        result = multi(result, nextOperand);
        index += 1;
    }

    // console.log(index, l, x, seq);
    result = '1';
    if (index % l) {
        for (var i = index % l; i < l; i++) {
            result = multi(result, get(i, i));
        }
    }

    var num = Math.floor((index + l - 1) / l);
    var left = quickPow(seq, x - num);
    // console.log(num, x, left, seq, x - num, result);
    return multi(result, left) === 'k';
    // start = index;
    // result = '1';
    // while (1) {
    //     nextOperand = get(start, index);
    //     if (!nextOperand) {
    //         return result === 'k';
    //     }
    //     result = multi(result, nextOperand);
    //     index += 1;
    // }
    return true;
}

var util = require('util');

var input = '';
process.stdin.on('data', function (data) {
    input = input + data.toString();
});

process.stdin.on('end', function () {
    var lines = input.toString().split('\n');
    // console.log(lines[0]);
    // console.log(lines[1]);
    var tc = +lines[0];

    for (var i = 0; i < tc; i++) {
        var line = lines[1 + 2 * i];
        var fields = line.split(' ');
        var l = +fields[0];
        var x = +fields[1];
        var seq = lines[1 + 2 * i + 1];
        // console.log(l, x, seq);
        var result = solve(l, x, seq);
        console.log(util.format('Case #%d: %s', i + 1, result ? 'YES' : 'NO'));
    }

})
