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


function removeLast(line){
    var i = line.length -1;
    for(; i>=0;i--){
        if(line[i] !== "+"){
            break;
        }
    }
    return line.substring(0, i + 1);
}

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function revert(line){
    line =  line.split("").reverse().join("");
    for(var i=0;i<line.length;i++){
        console.log(line[i]);
        line = line.replaceAt(i, line[i] === "+" ? "-" : "+");
    }
    console.log('122', line);
    return line;
}
for(var t =0; t< T; t++){
    console.log('t', t);
    line = liner.next().toString().replace('\r', '');
    console.log(line);
    line = removeLast(line);
    var result = 0;
    console.log(line);
    while(line.length > 0){
        if(line[0] === "-"){
            console.log('1111')
            line = revert(line);
            console.log(line);
        } else {
            var index = line.indexOf('-');
            var startLine = revert(line.substring(0, index));
            line = startLine + line.substring(index);
        }
        line = removeLast(line);
        console.log('r', line);
        result++;
    }
    console.log('r', result);
    fs.writeSync(fd, "Case #" + caseNumeber + ": " +result + '\n');
    //console.log(Data);
    console.log(caseNumeber, result);
    caseNumeber++;

}

console.log('end of line reached');
