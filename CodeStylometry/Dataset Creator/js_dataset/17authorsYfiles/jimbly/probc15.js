"use strict";
var assert = require('assert');
module.exports = function doit(tok, justArgs) {
  var toks = ['1', 'i', 'j', 'k', '-1', '-i', '-j', '-k'];
  var L = Number(tok());
  var X = Number(tok());
  if (X > 16) {
    X = X - Math.floor((X - 16) / 4) * 4;
  }
  var S = tok();
  function strToIndex(c) {
    return '' + toks.indexOf(c);
  }
  S = S.split('').map(strToIndex).join('');
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
    if (Number(v0) > 3) {
      neg = !neg;
      v0 = Number(v0) - 4;
    }
    if (Number(v1) > 3) {
      neg = !neg;
      v1 = Number(v1) - 4;
    }
    var ret = mul[Number(v0)][Number(v1)];
    if (neg) {
      if (Number(ret) > 3) {
        ret = Number(ret) - 4;
      } else {
        ret = Number(ret) + 4;
      }
      ret = '' + ret;
    }
    assert.ok(ret !== undefined);
    return ret;
  }
  function subset(offs, len) {
    var shift = offs % L;
    var str = S.slice(shift) + S.slice(0, shift);
    var repeats = Math.floor(len / L);
    var suffix = str.slice(0, len % L);
    return [str, repeats, suffix];
  }
  function reduces(set) {
    if (set[1] > 4) {
      set[1] = set[1] - Math.floor(set[1] / 4) * 4;
    }
    var val = '0';
    var jj;
    for (var ii = 0; ii < set[1]; ++ii) {
      for (jj = 0; jj < set[0].length; ++jj) {
        val = mmul(val, set[0][jj]);
      }
    }
    for (jj = 0; jj < set[2].length; ++jj) {
      val = mmul(val, set[2][jj]);
    }
    //console.log(set, val);
    return val;
  }
  
  var maxlen = L * X;
  for (var ii = 1; ii < maxlen; ++ii) {
    if (reduces(subset(0, ii)) === '1') {
      for (var jj = ii+1; jj < maxlen; ++jj) {
        if (reduces(subset(ii, jj - ii)) === '2') {
          if (reduces(subset(jj, maxlen - jj)) === '3') {
            //console.log(ii, jj, maxlen);
            return 'YES';
          }
          break;
        }
      }
      break;
    }
  }
  return 'NO';
};
