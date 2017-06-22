#!/usr/bin/node

var fs = require ('fs');

fs.readFile (process.argv[2], 'utf8', function (err, data) {
  if (err) throw err;

  var lines = data.split ('\n');
  var problems = parseInt (lines.shift(), 10);

  for (var i = 0; i < problems; ++i) {
    solve(lines.shift(), i + 1);
  }
});

function solve(line, caseNum) {
  var lineS = line.split(' ');
  var R = parseInt(lineS.shift());
  var C = parseInt(lineS.shift());
  var W = parseInt(lineS.shift());
//  console.log(R + " " + C + " " + W + " ");

  var div = Math.floor(C / W);
//  console.log(div);
  var soFar = R * div - 1;
//  console.log("soFar"+soFar);
  var rem = C - div * W;
//  console.log("rem" +rem);
  soFar += W;
//  console.log("soFar"+soFar);
  if (rem > 0) {
    soFar++;
//    console.log("soFar"+soFar);
  }
  console.log("Case #" + caseNum + ": " + soFar);
}
