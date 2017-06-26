"use strict";
module.exports = function doit(tok, justArgs) {
	// could brute force small data set
  var N = Number(tok());
  var V = Number(tok());
  var X = Number(tok());
  var sources = [];
  for (var ii = 0; ii < N; ++ii) {
  	var R = Number(tok());
  	var C = Number(tok());
  	sources.push([R, C]);
  }
  if (justArgs) {
    return;
  }
  sources = sources.slice(0, 2);
  N = sources.length;
  var max = 0, min = Infinity;
  for (var ii = 0; ii < N; ++ii) {
  	var R = sources[ii][0]
  	var C = sources[ii][1];
  	max = Math.max(max, C);
  	min = Math.min(min, C);
  }
  sources.sort(function (a, b) {
  	return a[1] - b[1];
  });
  for (ii = sources.length - 1; ii > 0; --ii) {
  	if (sources[ii - 1][1] == sources[ii][1]) {
  		sources[ii - 1][0] += sources[ii][0];
  		sources.splice(ii, 1);
  	}
  }
  if (X < min || X > max) {
  	return 'IMPOSSIBLE';
  }
  var R1 = sources[0][0];
  var C1 = sources[0][1];
  var rc1 = R1 * (C1 - X);
  if (sources.length === 1) {
  	return V / R1;
  }
  var R2 = sources[1][0];
  var C2 = sources[1][1];
  var rc2 = R2 * (C2 - X);
  // V = t1 * R1 + t2 * R2
  // X = (t1 * R1 * C1 + t2 * R2 * C2) / (t1 * R1 + t2 * R2)
  // 0 = t1 * rc1 + t2 * rc2
  
  // t1 = (V - t2 * R2) / R1
  // 0 = (V - t2 * R2) / R1 * rc1 + t2 * rc2
  // 0 = V*rc1/R1 + t2*(-R2*rc1/R1 + rc2)
  var t2 = -V * rc1 / R1 / (-R2 * rc1 / R1 + rc2);
  var t1 = (V - t2 * R2) / R1;
  if (isNaN(t1) || isNaN(t2)) {
  	console.log(N, V, X, sources, t1, t2);
  }
  return Math.max(t1, t2);
};
