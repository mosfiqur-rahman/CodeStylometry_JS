"use strict";
module.exports = function doit(tok, justArgs) {
	// could brute force small data set
  var N = Number(tok());
  var lines = [];
	for (var ii = 0; ii < N; ++ii) {
		lines.push(tok().split(' '));
	}
  if (justArgs) {
    return;
  }
  var words = {};
  for (var ii = 0; ii < lines.length; ++ii) {
  	for (var jj = 0; jj < lines[ii].length; ++jj) {
  		var w = lines[ii][jj];
  		words[w] = words[w] || [];
  		words[w].push(ii);
  	}
  }
  var ws = Object.keys(words);
  var ret = Infinity;
  for (var ii = 0; ii < 1 << (N - 2); ++ii) {
  	var t = 0;
  	for (var jj = 0; jj < ws.length; ++jj) {
  		var ls = words[ws[jj]];
  		var lang = 0;
  		for (var kk = 0; kk < ls.length; ++kk) {
  			var l;
  			if (ls[kk] === 0) {
  				l = 1;
  			} else if (ls[kk] === 1) {
  				l = 2;
  			} else {
  				l = ((1 << (ls[kk] - 2)) & ii) ? 1 : 2;
  			}
  			lang = lang | l;
  		}
  		if (lang === 3) {
  			++t;
  		}
  	}
  	ret = Math.min(ret, t);
  }
  return ret;
};
