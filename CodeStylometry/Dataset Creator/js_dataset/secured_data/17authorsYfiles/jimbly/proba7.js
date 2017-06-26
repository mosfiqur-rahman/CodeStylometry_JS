"use strict";
module.exports = function doit(tok, justArgs) {
  var N = Number(tok());
  var D = Number(tok());
  var S0 = Number(tok());
  var As = Number(tok());
  var Cs = Number(tok());
  var Rs = Number(tok());
  var M0 = Number(tok());
  var Am = Number(tok());
  var Cm = Number(tok());
  var Rm = Number(tok());
  if (justArgs) {
    return;
  }
  /*
  function test(maxS) {
    var minS = maxS - D;
    var s = S0;
    if (s < minS || s > maxS) {
      return 0;
    }
    var m = M0;
    var fired = [];
    var ret = 1;
    for (var ii = 1; ii < N; ++ii) {
      s = (s * As + Cs) % Rs;
      m = (m * Am + Cm) % Rm;
      var em = m % ii;
      if (fired[em] || s < minS || s > maxS) {
        fired[ii] = true;
      } else {
        ret++;
      }
    }
    return ret;
  }
  var maxS = S0;
  var minS = S0;
  var s = S0;
  for (var ii = 1; ii < N; ++ii) {
    s = (s * As + Cs) % Rs;
    maxS = Math.max(s, maxS);
    minS = Math.min(s, minS);
  }
  var best = 0;
  for (var ii = Math.min(maxS, minS + D); ii <= maxS; ++ii) {
    var r = test(ii);
    //console.log(ii, r);
    if (r > best) {
      best = r;
    }
  }
  */
  var starts = {};
  var ends = {};
  var times = {};
  function addRange(r) {
    if (r[1] < r[0]) {
      return;
    }
    times[r[0]] = true;
    times[r[1]+1] = true;
    starts[r[0]] = (starts[r[0]] || 0) + 1;
    ends[r[1]+1] = (ends[r[1]+1] || 0) + 1;
  }
  var s = S0;
  var m = M0;
  var range = [[s, s + D]];
  addRange(range[0]);
  for (var ii = 1; ii < N; ++ii) {
    s = (s * As + Cs) % Rs;
    m = (m * Am + Cm) % Rm;
    var smn = s;
    var smx = s + D;
    var em = m % ii;
    range[ii] = [Math.max(smn, range[em][0]), Math.min(smx, range[em][1])];
    addRange(range[ii]);
  }
  
  times = Object.keys(times).map(Number).sort(function (a, b) {
    return a - b;
  });
  var s = 0;
  var best = 0;
  //console.log(times);
  for (var ii = 0; ii < times.length; ++ii) {
    if (starts[times[ii]]) {
      s += starts[times[ii]];
    }
    if (ends[times[ii]]) {
      s -= ends[times[ii]];
    }
    //console.log(times[ii], s);
    best = Math.max(best, s);
  }
  return best;
};
