"use strict";
module.exports = function doit(tok, justArgs) {
  var B = Number(tok());
  var N = Number(tok());
  var M = [];
  for (var ii = 0; ii < B; ++ii) {
    M.push(Number(tok()));
  }
  if (justArgs) {
    return;
  }
  var free_time = [];
  for (ii = 0; ii < B; ++ii) {
    free_time.push(0);
  }
  var n0;
  function dot(t) {
    var n = 0;
    for (var ii = 0; ii < B; ++ii) {
      var c = Math.ceil(t / M[ii]);
      free_time[ii] = c * M[ii];
      n += c;
    }
    n0 = n;
    if (n >= N) {
      return false;
    }
    return true;
  }
  function binarySearch(max) {
    var m = 0;
    var n = max;
    while (m <= n) {
      var k = Math.floor((n + m) / 2);
      var cmp = dot(k);
      if (cmp) {
        if (m === k) {
          return m;
        }
        m = k;
      } else {
        n = k - 1;
      }
    }
    return m;
  }
  var t = binarySearch(N * 100000);
  dot(t);
  var b;
  for (var pl = n0; pl < N; ++pl) {
    var ft = Infinity;
    for (ii = 0; ii < B; ++ii) {
      if (free_time[ii] < ft) {
        ft = free_time[ii];
        b = ii;
      }
    }
    free_time[b] += M[b];
  }
  return b+1;
};
