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

/**
 * Solve a test case.
 *
 * @param {...*} args Parameters needed by test case.
 */
var solve = function (maxShy, shys) {
  // console.log(maxShy);
  // console.log(shys);
  var res = 0;
  var i, l;
  var n;
  var sum = 0;
  var diff;

  for (l = shys.length, i = 0; i < l; ++i) {
    n = shys[i];

    if (sum >= i) {
      sum += n;
    }
    else {
      diff = i - sum;
      res += diff;
      sum += diff;
      sum += n;
    }
  }

  return res;
};

var main = function (input) {
  var id;
  var numTests = input.nextNumber();

  for (id = 1; id <= numTests; ++id) {
    var line1 = input.nextStringArray();
    var maxShy = +line1[0];
    var shys = line1[1].split('').map(Number);

    console.log('Case #' + id + ': ' + solve(
      // Put parameters needed by test case here.
      maxShy,
      shys
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
