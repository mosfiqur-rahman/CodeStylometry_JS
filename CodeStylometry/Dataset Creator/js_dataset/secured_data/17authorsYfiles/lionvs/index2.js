    var _= require('lodash')
var fs = require('fs')
var lineByLine = require('n-readlines');
var fileName = "test";
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

var words = ["ZERO","EIGHT","SIX", "SEVEN","TWO", "FIVE", "FOUR", "NINE", "ONE", "THREE" ];
var corresponding= {
    "ZERO": 0,
    "EIGHT": 8,
    "SIX": 6,
    "SEVEN": 7,
    "TWO": 2,
    "FIVE": 5,
    "FOUR": 4,
    "NINE": 9,
    "ONE": 1,
    "THREE":3
    }
    


for(var t =0; t< T; t++){
    console.log('t', t);
    line = liner.next().toString().replace('\r', '');
    N = Number(line);
    var Data = [];
    var result = [];
    for(var i =0;i< words.length && line.length >0;){
        var previous = line.toString();
        for(var j=0;j<words[i].length;j++){
            previous = previous.replace(words[i][j], "");
        }
        if(line.length === previous.length + words[i].length){
            result.push(corresponding[words[i]]);
            line = previous;
        } else {
            i++;
        }
    }
    if(line.length > 0){
        console.log("PROBLEM");
    }
    result = _.sortBy(result);
    fs.writeSync(fd, "Case #" + caseNumeber + ": " +result.join('') + '\n');
    //console.log(Data);
  //  console.log(caseNumeber, winning);
    caseNumeber++;

}

console.log('end of line reached');
