var fs = require('fs');
var contents = fs.readFileSync('c.in').toString().split('\n');
fs.writeFileSync('c.out', '');
var line = 1;

var matrix = {
    '1': {
        '1': '1',
        'i': 'i',
        'j': 'j',
        'k': 'k'
    },
    'i': {
        '1': 'i',
        'i': '-1',
        'j': 'k',
        'k': '-j'
    },
    'j': {
        '1': 'j',
        'i': '-k',
        'j': '-1',
        'k': 'i'
    },
    'k': {
        '1': 'k',
        'i': 'j',
        'j': '-i',
        'k': '-1'
    }
};

var fullStr;
var ijk = "ijk";
var cache;

function doit(idx, str) {
   //console.log(idx, str);
    if (str == 3) {
        return idx == fullStr.length;
    } else if (str == 2) {
        if (cache[idx]) {
            return cache[idx] == 'a';
        }
        var val = '1';
        var min = 1;
        for (var i = idx; i < fullStr.length; i++) {
            val = matrix[val][fullStr[i]];

            if (val[0] == '-') {
                val = val[1];
                min *= -1;
            }
        }

        if (min == 1 && val == 'k') {
            cache[idx] = 'a';
            return true;
        }
        cache[idx] = 'b';

        return false;
    }

    var last = fullStr.length - (3 - str);
    var val = '1';
    var min = 1;
    for (var i = idx; i <= last; i++) {

        val = matrix[val][fullStr[i]];

        if (val[0] == '-') {
            val = val[1];
            min *= -1;
        }

        if (min == 1 && val == ijk[str]) {
            if (doit(i + 1, str + 1)) {
                return true;
            }
        }
    }

    return false;
}

for (var tests = 1; tests <= contents[0]; tests++) {
    var d = contents[line].split(' ');
    var L = parseInt(d[0]);
    var X = parseInt(d[1]);
    var str = contents[line+1];

    fullStr = "";
    for (var i = 0; i < X; i++) {
        fullStr += str;
    }
    //console.log(fullStr.length);

    cache = new Array(fullStr.length+1);

   /* var arr = new Array(fullStr.length);
    for (var i = 0; i < fullStr.length; i++) {
        arr[i] = new Array(fullStr.length);
        var val = '1';
        var min = 1;

        for (var j = i; j < fullStr.length; j++) {
            val = matrix[val][fullStr[i]];

            if (val[0] == '-') {
                val = val[1];
                min *= -1;
            }

            arr[i][j] = (min == -1 ? "-" : "") + val;
        }
    }*/



    fs.appendFileSync('c.out', 'Case #' + tests + ": " + (doit(0, 0) ? "YES" : "NO") + '\n');
    line += 2;
}