"use strict";
module.exports = function doit(tok, justArgs) {
  var H = Number(tok());
  var W = Number(tok());
  var board = [];
  for (var ii = 0; ii < H; ++ii) {
  	board.push(tok());
  }
  board.push('');
  board[-1] = '';
  if (justArgs) {
    return;
  }
  var dx = {
  	'^': 0,
  	'>': 1,
  	'v': 0,
  	'<': -1,
  };
  var dy = {
  	'^': -1,
  	'>': 0,
  	'v': 1,
  	'<': 0,
  };
  var ret = 0;
  for (var ii = 0; ii < H; ++ii) {
  	for (var jj = 0; jj < W; ++jj) {
  		if (board[ii][jj] !== '.') {
  			var ddx = dx[board[ii][jj]];
  			var ddy = dy[board[ii][jj]];
  			var i = ii + ddy;
  			var j = jj + ddx;
  			while (board[i][j] === '.') {
  				i += ddy;
  				j += ddx;
  			}
  			if (board[i][j]) {
  				// already hits another arrow, leave alone
  			} else {
  				// try all 4 dirs
  				var any_okay=false;
  				Object.keys(dx).forEach(function (dir) {
		  			var ddx = dx[dir];
		  			var ddy = dy[dir];
		  			var i = ii + ddy;
		  			var j = jj + ddx;
		  			while (board[i][j] === '.') {
		  				i += ddy;
		  				j += ddx;
		  			}
		  			if (board[i][j]) {
		  				any_okay = true;
		  			}
  				});
  				if (any_okay) {
  					++ret;
  				} else {
  					return 'IMPOSSIBLE';
  				}
  			}
  		}
  	}
  }
  return ret;
};
