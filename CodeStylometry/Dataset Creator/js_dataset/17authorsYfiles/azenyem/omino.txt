#!/usr/bin/node

var fs = require ('fs');

fs.readFile (process.argv[2], 'utf8', function (err, data) {
  if (err) throw err;

  var lines = data.split ('\n');
  var problems = parseInt (lines.shift (), 10);

  for (var i = 0; i < problems; ++i) {
      solve(lines.shift(), i + 1);
  }
});

function solve(line, caseNumber) {
//  console.log(line);
  var row = line.split(' ');
  var o = row.shift();
  var x = row.shift();
  var y = row.shift();

  var filledStr = {false:"RICHARD", true:"GABRIEL"};
  var filled = aaa(o, Math.min(x, y), Math.max(x, y));
  console.log("Case #" +  caseNumber + ": " + filledStr[filled]);
}
function aaa(o, x, y) {
  if (o >= 7) {
    return false;
  } else if (o == 1) {
    return true;
  } else if (o == 2) {
    return (x * y) % 2 == 0;
  } else if (o == 3) {
    if (y == 2) {
      return false;
    } else if (x == 1){
      return false;
    } else {
      return (x * y) % 3 == 0;
    }
  } else if (o == 4) {
    if (x < 3) {
      return false;
    } else if (y == 3){
      return false;
    } else {
      return (x * y) % 4 == 0;
    }
  } else if (o == 5) {
    if (x < 3) {
      return false;
    } else if (x == 3 && y == 5){
      return false;
    } else {
      return (x * y) % 5 == 0;
    }
  } else if (o == 6) {
    if (x < 3) {
      return false;
    } else if (x == 3){
      return false;
    } else {
      return (x * y) % 6 == 0;
    }
  }
}
