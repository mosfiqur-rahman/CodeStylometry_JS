#!/usr/bin/node

var fs = require ('fs');

fs.readFile (process.argv[2], 'utf8', function (err, data) {
  if (err) throw err;

  var lines = data.split ('\n');
  var problems = parseInt (lines.shift (), 10);

  for (var i = 0; i < problems; ++i) {
      solve2(lines.shift(), i + 1);
  }
});


function solve2 (line, caseNumber) {
//  console.log(line);
  var row = line.split(' ');
  var maxShyness = row.shift();
  var peopleWithSyness = row.shift().split('');
  var peopleAlreadyStanding = 0;
  var peopleInvited = 0;
  for (var i = 0; i <= maxShyness; ++i) {
//      console.log("*" + peopleWithSyness.shift());
    if (peopleAlreadyStanding < i) {
      peopleAlreadyStanding++;
      peopleInvited++;
    }
    peopleAlreadyStanding += parseInt(peopleWithSyness.shift());
  }
  console.log("Case #" +  caseNumber + ": " + peopleInvited);
}

