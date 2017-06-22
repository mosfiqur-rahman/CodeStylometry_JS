"use strict";
module.exports = function doit(tok, justArgs) {
  var toks = ['1', 'i', 'j', 'k', '-1', '-i', '-j', '-k'];
  var L = Number(tok());
  var X = Number(tok());
  if (X > 16) {
    X = X - Math.floor((X - 16) / 4) * 4;
  }
  var S = tok();
  function strToIndex(c) {
    return toks.indexOf(c);
  }
  S = S.split('').map(strToIndex);
  if (justArgs) {
    return;
  }
  // no if less than 3 total characters
  // definitely no if it does not reduce to "-1"
  var mul = [
    ['1', 'i', 'j', 'k'],
    ['i', '-1', 'k', '-j'],
    ['j', '-k', '-1', 'i'],
    ['k', 'j', '-i', '-1'],
  ];
  mul = mul.map(function (row) {
    return row.map(strToIndex);
  });
  function mmul(v0, v1) {
    var neg = false;
    if (v0 > 3) {
      neg = !neg;
      v0 -= 4;
    }
    if (v1 > 3) {
      neg = !neg;
      v1 -= 4;
    }
    var ret = mul[v0][v1];
    if (neg) {
      ret = (ret + 4) % 8;
    }
    return ret;
  }

  var val = 0;
  var looking_for = 1;
  for (var ii = 0; ii < X; ++ii) {
    for (var jj = 0; jj < S.length; ++jj) {
      val = mmul(val, S[jj]);
      if (val === looking_for) {
        if (looking_for === 3) {
          if (jj === S.length - 1 && ii === X-1) {
            return 'YES';
          }
        } else {
          looking_for = looking_for + 1;
          val = 0;
        }
      }
    }
  }
  return 'NO';
};
