"use strict";
var assert = require('assert');
module.exports = function doit(tok, justArgs) {
  var N = Number(tok());
  var K = Number(tok());
  var sums = [];
  for (var ii = 0; ii < N - K + 1; ++ii) {
  	sums.push(Number(tok()));
  }
  if (justArgs) {
    return;
  }
  var range = [];
  var last = [];
  for (var ii = 0; ii < K; ++ii) {
  	range.push([0,0]);
  	last.push(0);
  }
  var idx = 0;
  var lastv = sums[0];
  for (var ii = 1; ii < sums.length; ++ii) {
  	var d = sums[ii] - lastv;
  	lastv = sums[ii];
  	var r = last[idx] + d;
  	last[idx] = r;
  	range[idx][0] = Math.min(range[idx][0], r);
  	range[idx][1] = Math.max(range[idx][1], r);
  	idx = (idx + 1) % K;
  }
  var ret = 0;
  var v = [];
  var vs=0;
  for (var ii = 0; ii < range.length; ++ii) {
  	v[ii] = -range[ii][0];
  	vs += v[ii];
  }
  var d = Math.floor((sums[0] - vs) / K);
  vs = 0;
  for (var ii = 0; ii < K; ++ii) {
  	v[ii] += d;
  	vs += v[ii];
  }
  var mn = v[0];
  var mx = v[0];
  for (var ii = 0; ii < K; ++ii) {
  	mn = Math.min(mn, v[ii] + range[ii][0]);
  	mx = Math.max(mx, v[ii] + range[ii][1]);
  }
  var ret = mx - mn;
  assert.ok(vs <= sums[0]);
  var rem = sums[0] - vs;
  for (var ii = 0; ii < K && rem > 0; ++ii) {
  	var rr = ret - (range[ii][1] - range[ii][0]);
  	rem -= rr;
  }
  if (rem > 0) {
  	++ret;
  }
  return ret;
};
