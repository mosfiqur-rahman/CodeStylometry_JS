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
var solve = function (n, pancakes) {
  // console.log(pancakes);
  // var res = 0;

  var work = function (cakes) {
    var i, j, l;
    var numCakes;
    var max;
    var numMax;
    var splitHigh, splitLow;
    var res = [];
    var cakes2;

    max = -Infinity;
    for (i = cakes.length - 1; i >= 0; --i) {
      numCakes = cakes[i];

      if (numCakes > max) {
        max = numCakes;
      }
    }

    numMax = 0;
    for (i = cakes.length - 1; i >= 0; --i) {
      numCakes = cakes[i];

      if (numCakes === max) {
        ++numMax;
      }
    }

    for (l = Math.floor(max / 2), i = 1; i <= l; ++i) {
      splitLow = i;
      splitHigh = max - i;

      if (splitHigh + numMax < max) {
        cakes2 = cakes.slice();

        for (j = cakes2.length - 1; j >= 0; --j) {
          if (cakes2[j] === max) {
            cakes2[j] = splitHigh;
            cakes2.push(splitLow);
          }
        }

        res.push(work(cakes2));
      }
    }

    if (!res.length) {
      return max;
    }
    else {
      return numMax + Math.min.apply(null, res);
    }
  };

  return work(pancakes);

  // var work2 = function (alt) {
  //   var i;
  //   var numCakes;
  //   var max, max2;
  //   var numMax;
  //   var splitHigh, splitLow;
  //   var time = 0;
  //   var lastMax;
  //   var cakes = pancakes.slice();
  //
  //   while (true) {
  //     max = -Infinity;
  //     max2 = -Infinity;
  //     for (i = cakes.length - 1; i >= 0; --i) {
  //       numCakes = cakes[i];
  //
  //       if (numCakes > max) {
  //         max2 = max;
  //         max = numCakes;
  //       }
  //     }
  //
  //     numMax = 0;
  //     for (i = cakes.length - 1; i >= 0; --i) {
  //       numCakes = cakes[i];
  //
  //       if (numCakes === max) {
  //         ++numMax;
  //       }
  //     }
  //
  //     if (max === 9 && alt) {
  //       // console.log(cakes);
  //       splitHigh = 6;
  //       splitLow = 3;
  //     }
  //     else {
  //       splitHigh = Math.ceil(max / 2);
  //       splitLow = Math.floor(max / 2);
  //     }
  //
  //     if (splitHigh + numMax < max) {
  //       time += numMax;
  //       lastMax = splitHigh;
  //
  //       for (i = cakes.length - 1; i >= 0; --i) {
  //         if (cakes[i] === max) {
  //           cakes[i] = splitHigh;
  //           cakes.push(splitLow);
  //         }
  //       }
  //     }
  //     else {
  //       lastMax = max;
  //       break;
  //     }
  //   }
  //
  //   return time + lastMax;
  // };
  //
  // var res1 = work2();
  // var res2 = work2(true);
  //
  // return res1 > res2 ? res2 : res1;
};

var main = function (input) {
  var id;
  var numTests = input.nextNumber();

  for (id = 1; id <= numTests; ++id) {
    console.log('Case #' + id + ': ' + solve(
      // Put parameters needed by test case here.
      input.nextNumber(),
      input.nextNumberArray()
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
