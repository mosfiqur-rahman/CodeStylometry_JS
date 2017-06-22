/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Usage (assumes input file contains "in" and outputs to a similar file with
	//"out" instead of "in"
	//
	// node main.js inputfile.in
	//
	var fs = __webpack_require__(1),
	  filePath = process.argv[2] || "in.txt",
	  outfile = fs.createWriteStream(filePath.replace(/in/, "out"), {
	    flags: 'w'
	  }),
	  contentLines = fs.readFileSync(filePath, 'utf-8').split('\n').filter(String).slice(1);

	//REMEMBER max safe int in js is 2^53-1, but bit shift only works up to 2^31-1
	//var b = require('big-integer');
	//Make sure the input and output files are correct
	console.log("Reading cases from " + filePath);
	console.log("Writing answers to " + filePath.replace(/in/, "out"));

	//Print answer line to file
	var cse = 1;
	var o = function(output) {
	  outfile.write("Case #" + cse++ + ": " + output + "\n");
	};

	var ln = function(text) {
	  outfile.write(text + "\n");
	};
	///// CODE BELOW HERE ////
	///

	var mx = function(parties) {
	  var m1={n:0};
	  var m2={n:0};
	  Object.keys(parties).forEach(function(k){
	    if(parties[k]>=m1.n){
	    m2 = m1;
	      m1 = {k:k,n:parties[k]};
	    }
	  });
	  return [m1,m2];
	};

	for(var idx=0; idx<contentLines.length; idx++){
	  var N = +contentLines[idx];//.split(" "), N=+els[0];
	  var ps={},total=0;
	  contentLines[++idx].split(" ").map(function(p,i){ps[String.fromCharCode(65+i)] =+p;total+=+p});

	  var ans = [],ms;
	  while(total>3) {
	    ms = mx(ps);
	    if(ms[0].n===ms[1].n) {
	      ans.push(ms[0].k + ms[1].k);
	      ps[ms[0].k]--;
	      ps[ms[1].k]--;
	      total-=2;
	    }
	    else {
	      ans.push(ms[0].k);
	      ps[ms[0].k]--;
	      total--;
	    }
	  }

	  if(total===3){
	    ms = mx(ps);
	    ans.push(ms[0].k);
	    ps[ms[0].k]--;
	    total--;
	  }

	  if(total===2){
	    ms = mx(ps);
	    ans.push(ms[0].k + ms[1].k);
	    ps[ms[0].k]--;
	    ps[ms[1].k]--;
	    total-=2;
	  } else if(total===1){
	    ms = mx(ps);
	    ans.push(ms[0].k);
	    ps[ms[0].k]--;
	    total--;
	  }

	  o(ans.join(" "));
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }
/******/ ]);