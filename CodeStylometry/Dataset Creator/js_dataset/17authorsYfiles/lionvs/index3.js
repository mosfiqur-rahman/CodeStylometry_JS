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
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');


    function indexesOfMax(arr) {
        if (arr.length === 0) {
            return -1;
        }

        var max = arr[0];
        var maxIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }

        var result = [];

        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == max) {
                result.push(i);
            }
        }

        return result;
    }

for(var t =0; t< T; t++){
    console.log('t', t);
    line = liner.next().toString().replace('\r', '');
    N = Number(line);

    var variants = alphabet.slice(0, N-1);
    var result = [];
    var numbers = liner.next().toString().replace('\r', '').split(' ').map(Number);
    var allOperations = 0;
    for(var i=0;i<N;i++){
        variants[i] = numbers[i];
        allOperations += numbers[i];
    }
    //allOperations -= 2;

    while (allOperations !== 0){
        var maxIndexes = indexesOfMax(variants);
        if(maxIndexes.length == 1) {
            var maxIndex = maxIndexes[0];
            result.push(alphabet[maxIndex]);
            variants[maxIndex]-=1;
            allOperations-=1;
        } else {
            if(maxIndexes.length > 2){
                result.push(alphabet[maxIndexes[0]]);
                variants[maxIndexes[0]]--;
                allOperations-=1;
            } else {
                result.push(alphabet[maxIndexes[0]] + "" + alphabet[maxIndexes[1]]);
                variants[maxIndexes[0]]--;
                variants[maxIndexes[1]]--;
                allOperations -= 2;
            }
        }
    }

    //var last = [];
    //for(var i=0;i<N;i++){
    //    if(variants[i] > 0)
    //        last.push(i)
    //}
    //result.push(alphabet[last[0]] + "" +alphabet[last[1]]);
    fs.writeSync(fd, "Case #" + caseNumeber + ": " +result.join(' ') + '\n');
    caseNumeber++;
  //
  //  var Data = [];
  //  var result = [];
  //  for(var i =0;i< words.length && line.length >0;){
  //      var previous = line.toString();
  //      for(var j=0;j<words[i].length;j++){
  //          previous = previous.replace(words[i][j], "");
  //      }
  //      if(line.length === previous.length + words[i].length){
  //          result.push(corresponding[words[i]]);
  //          line = previous;
  //      } else {
  //          i++;
  //      }
  //  }
  //  if(line.length > 0){
  //      console.log("PROBLEM");
  //  }
  //  result = _.sortBy(result);
  //  fs.writeSync(fd, "Case #" + caseNumeber + ": " +result.join('') + '\n');
  //  //console.log(Data);
  ////  console.log(caseNumeber, winning);
  //  caseNumeber++;

}

console.log('end of line reached');
