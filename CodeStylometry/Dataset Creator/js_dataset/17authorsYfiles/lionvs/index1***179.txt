var _= require('lodash')
var fs = require('fs')
var lineByLine = require('n-readlines');
var fileName = "A-small-practice";
var liner = new lineByLine(__dirname + '/' + fileName + '.in');
fd = fs.openSync(__dirname + '/' + fileName + '.out', 'w');
var first = true, second = true;
var modulo = 1000000007;
var lineNumber = 1;
var caseNumeber = 1;
var line;
var N, M=0;
var T = 0;
line = liner.next().toString().replace('\r', '');
var T = Number(line);


for(var t =0; t< T; t++){
    console.log('t', t);
    var possibleVariants = [1,2,3,4,5,6,7,8,9,0];
    line = liner.next().toString().replace('\r', '');

    var winning = line[0];

    for(var i=1;i<line.length;i++){
        //console.log(line[i], winning);
        if(line[i] >= winning[0]){
            winning = line[i] + winning
        } else {
            winning = winning + line[i];
        }
    }

    fs.writeSync(fd, "Case #" + caseNumeber + ": " +winning + '\n');
    //console.log(Data);
    console.log(caseNumeber, winning);
    caseNumeber++;

}

console.log('end of line reached');
