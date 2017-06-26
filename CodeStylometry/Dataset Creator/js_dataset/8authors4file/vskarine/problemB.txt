var fs = require('fs');
var contents = fs.readFileSync('b.in').toString().split('\n');
fs.writeFileSync('b.out', '');
var line = 1;

function doit(p, gb, depth) {
    if (depth > gb) {
        return gb;
    }
    p.sort(function(a, b){return b-a});

    var best = p[0];
    if (best == 1) {
        return best;
    }

    /*var cp = p.slice(0);
    for(var a = 0; a < cp.length; a++) {
        cp[a] -= 1;
    }

    var tmp = doit(cp, gb, depth + 1);
    if (best > (tmp + 1)) {
        best = tmp + 1;
    }*/

    p.push(0);
    var last = p.length - 1;
    var k = p[0] / 2;
    while (p[0] > k) {
        p[0] -= 1;
        p[last] += 1;

        var tmp = doit(p.slice(0), gb, depth + 1);
        if (best > (tmp + 1)) {
            best = tmp + 1;
        }
    }
    return best;
}

for (var tests = 1; tests <= contents[0]; tests++) {
    var d = parseInt(contents[line]);
    var p = contents[line + 1].split(' ').map(function (val) {
        return parseInt(val);
    });

    p.sort(function (a, b) {
        return b - a
    });

    console.log(p);

    fs.appendFileSync('b.out', 'Case #' + tests + ": " + doit(p, p[0], 1) + '\n');
    line += 2;
}