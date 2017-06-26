#!/usr/bin/node

var fs = require ('fs');

fs.readFile (process.argv[2], 'utf8', function (err, data) {
  if (err) throw err;

  var lines = data.split ('\n');
  var problems = parseInt (lines.shift (), 10);

  for (var i = 0; i < problems; ++i) {
    solve(lines.shift(), lines.shift(), i + 1);
  }
});

Coins = function(C) {
  this.coins = [];
//  this.ind = 0;
  this.coinsIntroduced = 0;
  this.C = C;
  this.sum = 0;
}
Coins.prototype.add = function(elem, isNew) {
  this.coins.push(elem);
  this.sum += this.C * elem;
  if (isNew) {
    this.coinsIntroduced++;
  }
}
Coins.prototype.biggest = function() {
  return this.sum;
}
CoinsBefore = function(line2, coinNumInit) {
  this.coins = line2.split(' ');
//  this.ind = 0;
//  this.len = coinNumInit;
}
CoinsBefore.prototype.hasCoins = function() {
  return this.coins.length > 0;
}
CoinsBefore.prototype.getFirst = function() {
  return this.coins[0];
}
CoinsBefore.prototype.getAndShift = function() {
  return this.coins.shift();
}

function solve(line1, line2, caseNum) {
  var line1s = line1.split(' ');
  var C = line1s.shift();
  var coins = new Coins(C);
  var coinsBefore = new CoinsBefore(line2, line1s.shift());
  var V = line1s.shift();
  
  var soFar = coins.biggest();
  while (soFar < V) {
    soFar++;
    if (coinsBefore.hasCoins()) {
      if (soFar < coinsBefore.getFirst()) {
        coins.add(soFar, true);
      } else {
        coins.add(coinsBefore.getAndShift());
      }
    } else {
      coins.add(soFar, true);
    }
    soFar = coins.biggest();
  }
  console.log("Case #" + caseNum + ": " + coins.coinsIntroduced);
}
