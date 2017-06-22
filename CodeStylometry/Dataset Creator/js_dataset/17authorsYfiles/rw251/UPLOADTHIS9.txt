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

	for (var idx = 0; idx < contentLines.length; idx++) {
	  var els = contentLines[idx].split(" "),
	    J = +els[0],
	    P = +els[1],
	    S = +els[2],
	    K = +els[3];

	  o(Math.min(K,S)*J*P);

	  for(var j = 1; j<=J;j++){
	    for(var p = 1; p<=P;p++){
	      for(var k=1; k<=Math.min(K,S);k++){
	          ln(j+" "+p+" "+ (((k-1+p-1 +j-1) % S) +1));
	      }
	    }
	  }

	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }
/******/ ]);