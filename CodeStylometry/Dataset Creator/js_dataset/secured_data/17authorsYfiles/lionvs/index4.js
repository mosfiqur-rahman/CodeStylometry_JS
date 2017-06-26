var _= require('lodash')
var fs = require('fs')
var lineByLine = require('n-readlines');
var fileName = "A-large-practice";
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
    var number1 = Number(line);
    var result = "INSOMNIA";
    if(number1 === 0){
        fs.writeSync(fd, "Case #" + caseNumeber + ": " +result + '\n');
        caseNumeber++;
        continue;
    }
    var i = 1;
    var number;
    while(i< 9007199254740991){
        number = number1*i;
        console.log('n', number);
        console.log(i);
        for(var s=0;s<Number(number).toString().length;s++){
            console.log(Number(number).toString()[s]);
            var index = possibleVariants.indexOf(Number(Number(number).toString()[s]));
            console.log('i', index);
            if(index!==-1){
                possibleVariants.splice(index, 1);
            }
        }
        if(possibleVariants.length === 0){
            console.log('break');
            break;
        }
        i++;
        console.log(possibleVariants);
    }
    fs.writeSync(fd, "Case #" + caseNumeber + ": " +number.toString() + '\n');
    //console.log(Data);
    console.log(caseNumeber, result);
    caseNumeber++;

}

console.log('end of line reached');
