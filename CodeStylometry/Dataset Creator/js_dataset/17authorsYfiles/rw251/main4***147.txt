
// Usage (assumes input file contains "in" and outputs to a similar file with
//"out" instead of "in"
//
// node main.js inputfile.in
//
var fs = require('fs'),
    filePath = process.argv[2] || "in.txt",
    outfile = fs.createWriteStream(filePath.replace(/in/,"out"), {flags : 'w'}),
    contentLines = fs.readFileSync(filePath,'utf-8').split('\n').filter(String).slice(1);

//Make sure the input and output files are correct
console.log("Reading cases from " + filePath);
console.log("Writing answers to " + filePath.replace(/in/,"out"));

//Print answer line to file
var o = function(num, output) {
  outfile.write("Case #" +  num + ": " + output + "\n");
};

var ln = function(text) {
  outfile.write(text +"\n");
};

//1,000,000 33ms
//10,000,000 266ms
//100,000,000 7s
//1,000,000,000 out of memory
var getPrimeArrayUpTo = function(n) {
  var i, array = new Array(n), //pre-initialise array for speed up
    upperLimit = Math.sqrt(n),
    output = [];

  // Remove multiples of primes starting from 2, 3, 5,...
  for (i = 2; i <= upperLimit; i++) {
    if (!array[i]) {
      for (var j = i * i; j < n; j += i) {
        array[j] = true;
      }
    }
  }

  // All array[i] still undefined are primes
  for (i = 2; i < n; i++) {
    if (!array[i]) {
      output.push(i);
    }
  }

  return output;
};

var UPPER = 1000000;

var primes = getPrimeArrayUpTo(UPPER);


var getDivisor = function(num) {
  if(num < UPPER && primes.indexOf(num)>-1) {
    return -1;
  } else {
    for(var i = 0; i < primes.length && primes[i] < Math.sqrt(num)+1; i++){
      if(num % primes[i] === 0) return primes[i];
    }
  }
  return -1;
};

var validate = function(num) {
  var answers = [];
  for(var i = 2; i <= 10; i++){
    var number = parseInt(num,i);
    var x = getDivisor(number);
    if(x===-1) return false;
    else answers.push(x);
  }
  return answers;
};

contentLines.forEach(function(line,idx){
  var els = line.split(" "), N = +els[0], J = +els[1];

  o(idx+1,"");

  var answers = 0;
  var n = Math.pow(2,N-1)+1;
  while(answers < J) {
      var bin = n.toString(2);
      var result = validate(bin);
      if(result) {
        ln(bin + " " + result.join(" "));
        answers++;
      }
      n+=2;
  }
});
