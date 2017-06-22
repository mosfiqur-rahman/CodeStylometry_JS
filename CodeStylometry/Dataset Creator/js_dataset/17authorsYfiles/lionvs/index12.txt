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

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}


checkPrime = function(n) {
    if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;
    var result = leastFactor(n);
    return { isPrime: n==result, result: result};
}

// leastFactor(n)
// returns the smallest prime that divides n
//     NaN if n is NaN or Infinity
//      0  if n=0
//      1  if n=1, n=-1, or n is not an integer

leastFactor = function(n){
    if (isNaN(n) || !isFinite(n)) return NaN;
    if (n==0) return 0;
    if (n%1 || n*n<2) return 1;
    if (n%2==0) return 2;
    if (n%3==0) return 3;
    if (n%5==0) return 5;
    var m = Math.sqrt(n);
    for (var i=7;i<=m;i+=30) {
        if (n%i==0)      return i;
        if (n%(i+4)==0)  return i+4;
        if (n%(i+6)==0)  return i+6;
        if (n%(i+10)==0) return i+10;
        if (n%(i+12)==0) return i+12;
        if (n%(i+16)==0) return i+16;
        if (n%(i+22)==0) return i+22;
        if (n%(i+24)==0) return i+24;
    }
    return n;
}

for(var t =0; t< T; t++){
    console.log('t', t);
    line = liner.next().toString().replace('\r', '').split(' ').map(Number);
    var N = line[0];
    var J = line[1];
    var allPossibleVariants = [];

    var startingNumber = "1";
    var endNumber = "1";
    for(var i=0;i<N-2;i++){
        startingNumber += "0";
        endNumber += "1";
    }
    startingNumber += "1";
    endNumber += "1";
    fs.writeSync(fd, "Case #" + caseNumeber + ":" + '\n');
    for(var i = parseInt( startingNumber, 2 ); i<=parseInt( endNumber, 2 ) && J>0;i+=2){

        console.log(i.toString(2));
        var result = [];
        for(var j = 2; j<=10;j++){
            console.log('prime', parseInt( i.toString(2), j));
            var primeResult = checkPrime(parseInt( i.toString(2), j));
            console.log(primeResult);
            if(!primeResult.isPrime){
                result.push(primeResult.result);
            } else {
                break;
            }
            if (j===10) {
                fs.writeSync(fd, i.toString(2) + ' ' +result.join(' ') + '\n');
                J--;
            }

        }
    }
    //var result = 0;
    //console.log(line);
    //while(line.length > 0){
    //    if(line[0] === "-"){
    //        console.log('1111')
    //        line = revert(line);
    //        console.log(line);
    //    } else {
    //        var index = line.indexOf('-');
    //        var startLine = revert(line.substring(0, index));
    //        line = startLine + line.substring(index);
    //    }
    //    line = removeLast(line);
    //    console.log('r', line);
    //    result++;
    //}
    //console.log('r', result);
    //
    //console.log(Data);
    console.log(caseNumeber, result);


}

console.log('end of line reached');
