"use strict";
module.exports = function doit(tok, justArgs) {
  var N = Number(tok());
  var v = [];
  for (var ii = 0; ii < N; ++ii) {
    v.push(Number(tok()));
  }
  if (justArgs) {
    return;
  }
  var r1 = 0;
  var last = 0;
  var rate = 0;
  for (ii = 0; ii < N; ++ii) {
    if (last > v[ii]) {
      var d = last - v[ii];
      r1 += d;
      rate = Math.max(rate, d);
    }
    last = v[ii];
  }
  var r2 = 0;
  last = 0;
  for (ii = 0; ii < N - 1; ++ii) {
    r2 += Math.min(rate, v[ii]);
  }
  return r1 + ' ' + r2;
};
