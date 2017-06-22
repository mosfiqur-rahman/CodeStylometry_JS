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
    line = liner.next().toString().replace('\r', '');
    N = Number(line);
    var Data = [];

    for(var i=0;i<2*N-1;i++){
        line = liner.next().toString().replace('\r', '');
        var numbers = line.split(' ').map(Number);
        console.log(numbers);
        for(var j=0;j<N;j++){
            if(Data[numbers[j]]) {
                Data[numbers[j]]++;
            } else {
                Data[numbers[j]] = 1;
            }
        }
    }

    var result = [];
    console.log(Data);
    for(var i =0;i<Data.length;i++){
        if(Data[i] && Data[i] % 2 !== 0){
            result.push(i);
        }

    }
    console.log(result);
    result = _.sortBy(result, function(o) { return o; });
    console.log(result);
    //
    //for(var i=1;i<line.length;i++){
    //    //console.log(line[i], winning);
    //    if(line[i] >= winning[0]){
    //        winning = line[i] + winning
    //    } else {
    //        winning = winning + line[i];
    //    }
    //}

    fs.writeSync(fd, "Case #" + caseNumeber + ": " +result.join(' ') + '\n');
    //console.log(Data);
  //  console.log(caseNumeber, winning);
    caseNumeber++;

}

console.log('end of line reached');
