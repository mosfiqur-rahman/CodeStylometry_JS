"use strict";
var assert = require('assert');
module.exports = function doit(tok, justArgs) {
  var Y = Number(tok());
  var N = Number(tok());
  var P = [];
  for (var ii = 0; ii < N; ++ii) {
    P.push(Number(tok()));
  }
  var S = [];
  for (var ii = 0; ii < N; ++ii) {
    S.push(Number(tok()));
  }
  if (justArgs) {
    return;
  }
  var dir = [[], []];
  for (var ii = 0; ii < N; ++ii) {
    var idx = 0;
    if (P[ii] > 0) {
      idx = 1;
    } else {
      P[ii] *= -1;
    }
    dir[idx].push([P[ii], S[ii]]);
  }
  dir[0].sort(function (a, b) {
    return b[1] - a[1];
  });
  dir[1].sort(function (a, b) {
    return b[1] - a[1];
  });

  // find simple limit
  var t1 = 0;
  for (var ii = 0; ii < dir[0].length; ++ii) {
    var tt = dir[0][ii][0] / (Y - dir[0][ii][1]);
    t1 = Math.max(t1, tt);
  }
  var t2 = 0;
  for (var ii = 0; ii < dir[1].length; ++ii) {
    var tt = (dir[1][ii][0] + dir[1][ii][1] * t1 + t1 * Y) / (Y - dir[1][ii][1]);
    t2 = Math.max(t2, tt);
  }
  var simple = t1 + t2;
  var t1 = 0;
  for (var ii = 0; ii < dir[1].length; ++ii) {
    var tt = dir[1][ii][0] / (Y - dir[1][ii][1]);
    t1 = Math.max(t1, tt);
  }
  var t2 = 0;
  for (var ii = 0; ii < dir[0].length; ++ii) {
    var tt = (dir[0][ii][0] + dir[0][ii][1] * t1 + t1 * Y) / (Y - dir[0][ii][1]);
    t2 = Math.max(t2, tt);
  }
  simple = Math.min(simple, t1 + t2);

  function search(t, pos, idx, done) {
    if (t >= simple) {
      return simple;
    }
    // try next left first
    var retleft;
    for (var ii = idx[0]; ii < dir[0].length; ++ii) {
      if (!done[0][ii]) {
        var p = dir[0][ii][0];
        var s = dir[0][ii][1];
        // try it
        var dpos = pos + p + s * t;
        assert.ok(dpos > 0);
        var ds = Y - s;
        var tt = dpos / ds;
        var newt = t + tt;
        var newpos = pos - Y * tt;
        // mark done
        var f = {};
        for (var jj = ii+1; jj < dir[0].length; ++jj) {
          if (!done[0][jj] && dir[0][jj][0] + dir[0][jj][1] * newt <= -newpos) {
            done[0][jj] = true;
            f[jj] = true;
          }
        }
        retleft = search(newt, newpos, [ii + 1, idx[1]], done);
        // clear done
        for (var jj in f) {
          done[0][jj] = false;
        }
        break;
      }
    }
    // try next right first
    var retright;
    for (var ii = idx[1]; ii < dir[1].length; ++ii) {
      if (!done[1][ii]) {
        var p = dir[1][ii][0];
        var s = dir[1][ii][1];
        // try it
        var dpos = -pos + p + s * t;
        assert.ok(dpos > 0);
        var ds = Y - s;
        var tt = dpos / ds;
        var newt = t + tt;
        var newpos = pos + Y * tt;
        // mark done
        var f = {};
        for (var jj = ii+1; jj < dir[1].length; ++jj) {
          if (!done[1][jj] && dir[1][jj][0] + dir[1][jj][1] * newt <= newpos) {
            done[1][jj] = true;
            f[jj] = true;
          }
        }
        retright = search(newt, newpos, [idx[0], ii + 1], done);
        // clear done
        for (var jj in f) {
          done[1][jj] = false;
        }
        break;
      }
    }
    if (retleft === undefined) {
      if (retright === undefined) {
        return t;
      }
      return retright;
    }
    if (retright === undefined) {
      return retleft;
    }
    return Math.min(retleft, retright);
  }
  return search(0, 0, [0, 0], [[], []]);
};
