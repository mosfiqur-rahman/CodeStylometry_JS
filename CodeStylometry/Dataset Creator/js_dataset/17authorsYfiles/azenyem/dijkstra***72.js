#!/usr/bin/node

var fs = require ('fs');

var m = {
//1  ",   "−1",   "i",   "−i",   "j",   "−j",   "k",   "−k
"1": {"1":"1" , "−1":"−1", "i":"i" , "−i":"−i",   "j":"j" ,   "−j":"−j",   "k":"k" ,   "−k":"−k"},
"−1":{"1":"−1", "−1":"1" , "i":"−i", "−i":"i" ,   "j":"−j",   "−j":"j" ,   "k":"−k",   "−k":"k" },
"i": {"1":"i" , "−1":"−i", "i":"−1", "−i":"1" ,   "j":"k" ,   "−j":"−k",   "k":"−j",   "−k":"j" },
"−i":{"1":"−i", "−1":"i" , "i":"1" , "−i":"−1",   "j":"−k",   "−j":"k" ,   "k":"j" ,   "−k":"−j"},
"j": {"1":"j" , "−1":"−j", "i":"−k", "−i":"k" ,   "j":"−1",   "−j":"1" ,   "k":"i" ,   "−k":"−i"},
"−j":{"1":"−j", "−1":"j" , "i":"k" , "−i":"−k",   "j":"1" ,   "−j":"−1",   "k":"−i",   "−k":"i" },
"k": {"1":"k" , "−1":"−k", "i":"j" , "−i":"−j",   "j":"−i",   "−j":"i" ,   "k":"−1",   "−k":"1" },
"−k":{"1":"−k", "−1":"k" , "i":"−j", "−i":"j" ,   "j":"i" ,   "−j":"−i",   "k":"1" ,   "−k":"−1"}
};

fs.readFile (process.argv[2], 'utf8', function (err, data) {
  if (err) throw err;

  var lines = data.split ('\n');
  var problems = parseInt (lines.shift (), 10);

  for (var i = 0; i < problems; ++i) {
      solve2(lines.shift(), lines.shift(), i + 1);
  }
});

function solve2(line1, line2, caseNumber) {
//  console.log(line);
  var row = line1.split(' ');
  var xLength = row.shift();
  var xTimes = row.shift();

  var x = line2.split('');

  var before = 1;

  var toFind = ["i", "j", "k"];
  var find = 0;

  for (var i = 0; i < xLength; ++i) {
    before = qMultiply(before, x[i]);
    if (find < 2 && toFind[find] == before) {
      find++;
      before = 1;
    }
  }
  xTimes--;

  var mul = 1;
  for (var j = 0; j < find; j++) {
    mul = qMultiply(mul, toFind[j]);
  }
  mul = qMultiply(mul, before);
  var b = 1;
  while (xTimes > 0 && find < 2) {
    for (var i = 0; i < xLength; ++i) {
      before = qMultiply(before, x[i]);
      if (find < 2 && toFind[find] == before) {
        find++;
        before = 1;
        b = 1;
      }
    }
    xTimes--;
    b = qMultiply(mul, b);
    if (b == "1") {
      break;
    }
  }

  var pStr = {false:"NO", true:"YES"};
  var passed = true;
  if (find < 2) {
    passed = false;
  } else {
    var times = xTimes % 4;
    for (var t = 0; t < times; t++) {
      before = qMultiply(before, mul);
    }
    if (before != toFind[find]) {
      passed = false;
    }
  }
  console.log("Case #" +  caseNumber + ": " + pStr[passed]);
}

function qMultiply(a, b) {
  return m[a][b];
}
