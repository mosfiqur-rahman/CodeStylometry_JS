var fs = require('fs');
var contents = fs.readFileSync('a.in').toString().split('\n');
fs.writeFileSync('a.out', '');
for (var tests = 1; tests <= contents[0]; tests++) {

    var a = contents[tests].split(' ');
    var str = a[1];

    var totalSoFar = 0;
    var needToInvite = 0;

    for (var i = 0; i < str.length; i++) {
        if ((totalSoFar + needToInvite) < i) {
            needToInvite = i - totalSoFar;
        }
        totalSoFar += parseInt(str[i]);
    }


    fs.appendFileSync('a.out', 'Case #' + tests + ": " + needToInvite + '\n');
}
