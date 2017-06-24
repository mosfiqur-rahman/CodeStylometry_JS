/*
 * This file contains the generic file loading, test parsing, dispatching code
 * used in all of my solutions, other than possibly different delimiters being
 * used, this file remains unchanged.
 */

"use strict";
var assert = require('assert');
var child_process = require('child_process');
var fs = require('fs');
try { var proba = require('./proba'); } catch (ignore) {}
try { var probb = require('./probb'); } catch (ignore) {}
try { var probc = require('./probc'); } catch (ignore) {}
try { var probd = require('./probd'); } catch (ignore) {}

function out(fout, str) {
  fout.write(str);
  process.stdout.write(str);
}

var do_multicore = false;
var num_children = 4;
var is_child = process.argv.indexOf('--child') !== -1;

function doProblem(filename, solver, delims) {
  var data = fs.readFileSync(filename, 'utf-8');
  var toks = data.split(new RegExp('[' + delims + ']+'));
  if (!toks[0]) {
    toks.splice(0, 1);
  }
  if (!toks[toks.length-1]) {
    toks.pop();
  }
  var tokidx=1;
  var tokfunc = function () {
    return toks[tokidx++];
  };

  if (is_child) {
    // Just wait for messages to solve individual test cases
    process.on('message', function (msg) {
      //console.log('got message', msg);
      assert.ok(msg.idx);
      tokidx = msg.idx;
      var res = solver(tokfunc);
      var err;
      if (solver.check) {
        var done_idx = tokidx;
        tokidx = msg.idx;
        err = solver.check(tokfunc, res);
        tokidx = done_idx;
      }
      //console.log('Sending response');
      process.send({ case_idx: msg.case_idx, res: res, err: err});
    });
    return;
  }
  var N = Number(toks[0]);
  console.log('Running ' + N + ' test cases...');
  var has_errors = false;
  var results = [];
  var errors = [];
  var cases_left = 1;
  function handleResult(idx, res, err) {
    if (idx >= 0) {
      results[idx] = res;
      process.stdout.write('Case #' + (idx+1) + ': ' + res + '\n'); // Google
      if (err) {
        process.stdout.write('Error: Test case #' + (idx+1) + ' failed check: ' + err + '\n');
        errors[idx] = err;
        has_errors = true;
      }
    }
    --cases_left;
    if (!cases_left) {
      // done!
      console.log('All results gathered, flushing!');
      var outname = filename + '.out';
      var fout = fs.createWriteStream(outname);

      // flush results in order
      for (i = 0; i < N; ++i) {
        fout.write('Case #' + (i+1) + ': ' + results[i] + '\n'); // Google
        //fout.write(res + '\n'); // Facebook
        if (errors[i]) {
          fout.write('Error: Test case #' + (i+1) + ' failed check: ' + errors[i] + '\n');
        }
      }

      if (has_errors) {
        out(fout, 'Result has errors!');
      }
      fout.on('drain', fout.close.bind(fout));
    }
  }

  var start_offsets = [];
  for (var i=0; i<N || (!N && tokidx !== toks.length); i++) {
    var saved_idx = tokidx;
    start_offsets[i] = tokidx;
    ++cases_left;
    var done_idx;
    if (do_multicore) {
      // just calc how many tokens were consumed
      solver(tokfunc, true);
    } else {
      var res = solver(tokfunc);
      var err;
      if (solver.check) {
        done_idx = tokidx;
        tokidx = saved_idx;
        err = solver.check(tokfunc, res);
        tokidx = done_idx;
      }
      handleResult(i, res, err);
    }
  }
  assert.equal(tokidx, toks.length);
  N = i;
  handleResult(-1);

  if (!do_multicore) {
    return;
  }
  var children = [];
  for (var ii = 0; ii < num_children; ++ii) {
    children.push(child_process.fork(__filename, ['--child']));
  }

  var case_idx = 0;
  function dispatch(child) {
    if (case_idx === N) {
      child.kill();
      return;
    }
    child.send({ case_idx: case_idx, idx: start_offsets[case_idx] });
    ++case_idx;
  }

  function handleChildMessage(child, msg) {
    //console.log('got result', msg);
    handleResult(msg.case_idx, msg.res, msg.err);
    dispatch(child);
  }

  for (ii = 0; ii < num_children; ++ii) {
    children[ii].on('message', handleChildMessage.bind(null, children[ii]));
    dispatch(children[ii]);
  }
}

// function gentest() {
//   function randInt(max) {
//     return Math.floor(Math.random() * max);
//   }
//
//   var data= [];
//   data.push(100);
//   for (var ii = 0; ii < 100; ++ii) {
//     data.push(1000);
//     for (var jj = 0; jj < 1000; ++jj) {
//       data.push(randInt(1000));
//     }
//   }
//   fs.writeFileSync('B-large.in', data.join('\n'));
// }

function main() {
  var start = Date.now();

  //doProblem('A-small.in', proba, ' \t\n\r');
  //doProblem('A-large.in', proba, ' \t\n\r');
  // doProblem('B-small.in', probb, ' \t\n\r');
  doProblem('B-large.in', probb, ' \t\n\r');
  //doProblem('C-small.in', probc, ' \t\n\r');
  //doProblem('C-test.in', probc, ' \t\n\r');
  //doProblem('C-large.in', probc, ' \t\n\r');
  //doProblem('D-small.in', probd, ' \t\n\r');
  //doProblem('D-large.in', probd, ' \t\n\r');

  console.log('Finished in ' + ((Date.now()-start)/1000).toFixed(1) + 's');
}

main();
//gentest();
