"use strict";
module.exports = function doit(tok, justArgs) {
  var D = Number(tok());
  var P = [];
  for (var ii = 0; ii < D; ++ii) {
  	P.push(Number(tok()));
  }
  if (justArgs) {
  	return;
  }
  var best = 1000;
  for (var num_eatings = 0; num_eatings < 1000; ++num_eatings) {
  	var num_special = 0;
  	for (ii = 0; ii < D; ++ii) {
  		num_special += Math.max(0, Math.ceil(P[ii] / num_eatings) - 1);
  	}
  	if (num_eatings + num_special < best) {
  		best = num_eatings + num_special;
  	}
  }
  return best;
};
