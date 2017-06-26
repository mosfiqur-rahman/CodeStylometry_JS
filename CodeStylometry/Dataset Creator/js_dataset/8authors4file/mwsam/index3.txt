/**
 * @fileOverview Google Code Jam template for NodeJS.
 *
 * How to run:
 *
 * 1. Install NodeJS (https://nodejs.org)
 * 2. Go to the directory of this source
 * 3. Run `npm install --production`
 * 4. Run `node index.js < data.in > data.out`
 */

'use strict';

var _ = require('underscore');
// var _s = require('underscore.string');

var _val = {
  1: 1,
  i: 2,
  j: 3,
  k: 4
};

var _dict = {
  1: {
    1: 1,
    2: 2,
    3: 3,
    4: 4
  },

  2: {
    1: 2,
    2: -1,
    3: 4,
    4: -3
  },

  3: {
    1: 3,
    2: -4,
    3: -1,
    4: 2
  },

  4: {
    1: 4,
    2: 3,
    3: -2,
    4: -1
  }
};

/**
 * Solve a test case.
 *
 * @param {...*} args Parameters needed by test case.
 */
var solve = function (l, repeat, strs) {
  // console.log(arguments);
  // var res;

  var search = function (val, start, target, end) {
    var i;
    var numRepeat;
    var sign;

    for (numRepeat = Math.floor(start / l); numRepeat < repeat; ++numRepeat) {
      for (i = start % l; i < l; ++i, ++start) {
        sign = val >= 0 ? 1 : -1;
        val = _dict[Math.abs(val)][_val[strs[i]]] * sign;

        if (!end && val === target) {
          return [val, start + 1];
        }
      }
    }

    return val === target ? [val, start + 1] : null;
  };

  var work = function (seq, seqIndex, index) {
    if (seqIndex >= 3) {
      return true;
    }

    var res;
    var val = 1;
    var target = seq[seqIndex];

    while ((res = search(val, index, target, seqIndex === 2))) {
      val = res[0];
      index = res[1];

      if (work(seq, seqIndex + 1, index)) {
        return true;
      }
      else {
        return false;
      }
    }
    return false;
  };

  if (work([_val.i, _val.j, _val.k], 0, 0)) {
    return 'YES';
  }
  return 'NO';
};

var main = function (input) {
  var id;
  var numTests = input.nextNumber();

  for (id = 1; id <= numTests; ++id) {
    var line1 = input.nextNumberArray();
    var l = line1[0];
    var repeat = line1[1];

    console.log('Case #' + id + ': ' + solve(
      // Put parameters needed by test case here.
      l,
      repeat,
      input.nextString().split('')
    ));
  }
};

var Input = function (string) {
  var idx = 0;
  var space = /\s+/;
  var strings = string.split('\n');
  var len = strings.length;

  var toNumber = function (obj) {
    console.assert(_.isFinite(+obj),
                   'Cannot convert "' + obj + '" into number.');

    return +obj;
  };

  this.nextString = function () {
    console.assert(idx < len, 'No more input.');

    return strings[idx++];
  };

  this.nextStringArray = function (sep) {
    return this.nextString().split(sep || space);
  };

  this.nextNumber = function () {
    return toNumber(this.nextString());
  };

  this.nextNumberArray = function (sep) {
    return this.nextStringArray(sep).map(toNumber);
  };
};

(function init() {
  var string = '';

  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', function () {
    string += process.stdin.read();
  });

  process.stdin.once('end', function () {
    main(new Input(string));
  });
}());
