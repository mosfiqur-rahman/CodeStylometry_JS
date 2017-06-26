"use strict";
module.exports = function doit(tok, justArgs) {
  var smax = Number(tok());
  var s = tok();
  if (justArgs) {
    return;
  }
  var friends = 0;
  var sum = 0;
  for (var ii = 0; ii <= smax; ++ii) {
    var count = Number(s[ii]);
    if (sum + friends < ii) {
      friends = ii - sum;
    }
    sum += count;
  }
  return friends;
};
