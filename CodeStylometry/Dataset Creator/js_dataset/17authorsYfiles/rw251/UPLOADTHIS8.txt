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

	  if (J === 1 && P === 1 && S === 1) {
	    o("1");
	    ln("1 1 1");
	  } else if (J === 1 && P === 1 && S === 2) {
	    if (K === 1) {
	      o("1");
	      ln("1 1 1");
	    } else {
	      o("2");
	      ln("1 1 1");
	      ln("1 1 2");
	    }
	  } else if (J === 1 && P === 1 && S === 3) {
	    if (K === 1) {
	      o("1");
	      ln("1 1 1");
	    } else if (K === 2) {
	      o("2");
	      ln("1 1 1");
	      ln("1 1 2");
	    } else {
	      o("3");
	      ln("1 1 1");
	      ln("1 1 2");
	      ln("1 1 3");
	    }
	  } else if (J === 1 && P === 2 && S === 2) {
	    if (K === 1) {
	      o("2");
	      ln("1 1 1");
	      ln("1 2 2");
	    } else if (K >= 2) {
	      o("4");
	      ln("1 1 1");
	      ln("1 1 2");
	      ln("1 2 2");
	      ln("1 2 1");
	    }
	  } else if (J === 1 && P === 2 && S === 3) {
	    if (K === 1) {
	      o("2");
	      ln("1 1 1");
	      ln("1 2 2");
	    } else if (K === 2) {
	      o("4");
	      ln("1 1 1");
	      ln("1 1 2");
	      ln("1 2 2");
	      ln("1 2 3");
	    } else {
	      o("6");
	      ln("1 1 1");
	      ln("1 1 2");
	      ln("1 1 3");
	      ln("1 2 1");
	      ln("1 2 2");
	      ln("1 2 3");
	    }
	  } else if (J === 2 && P === 2 && S === 2) {
	    if (K === 1) {
	      o("4");
	      ln("1 1 2");
	      ln("1 2 1");
	      ln("2 1 1");
	      ln("2 2 2");
	    } else if (K >= 2) {
	      o("8");
	      ln("1 1 1");
	      ln("1 1 2");
	      ln("1 2 1");
	      ln("1 2 2");
	      ln("2 1 1");
	      ln("2 1 2");
	      ln("2 2 1");
	      ln("2 2 2");
	    }
	  } else if (J === 1 && P === 3 && S === 3) {
	    if (K === 1) {
	      o("3");
	      ln("1 1 1");
	      ln("1 2 2");
	      ln("1 3 3");
	    } else if (K === 2) {
	      o("6");
	      ln("1 1 1");
	      ln("1 1 2");
	      ln("1 2 1");
	      ln("1 2 3");
	      ln("1 3 2");
	      ln("1 3 3");
	    } else {
	      o("9");
	      ln("1 1 1");
	      ln("1 1 2");
	      ln("1 1 3");
	      ln("1 2 1");
	      ln("1 2 2");
	      ln("1 2 3");
	      ln("1 3 1");
	      ln("1 3 2");
	      ln("1 3 3");
	    }
	  } else if (J === 2 && P === 2 && S === 3) {
	    if (K === 1) {
	      o("4");
	      ln("1 1 1");
	      ln("1 2 2");
	      ln("2 1 2");
	      ln("2 2 1");
	    } else if (K === 2) {
	      o("8");
	      ln("1 1 1");
	      ln("1 1 2");
	      ln("1 2 2");
	      ln("1 2 3");
	      ln("2 1 1");
	      ln("2 1 2");
	      ln("2 2 2");
	      ln("2 2 3");
	    } else {
	      o("12");
	      ln("1 1 1");
	      ln("1 1 2");
	      ln("1 1 3");
	      ln("1 2 1");
	      ln("1 2 2");
	      ln("1 2 3");
	      ln("2 1 1");
	      ln("2 1 2");
	      ln("2 1 3");
	      ln("2 2 1");
	      ln("2 2 2");
	      ln("2 2 3");
	    }
	  } else if (J === 2 && P === 3 && S === 3) {
	    if (K === 1) {
	      o("6");
	      ln("1 1 2");
	      ln("1 2 3");
	      ln("1 3 1");
	      ln("2 1 3");
	      ln("2 2 1");
	      ln("2 3 2");
	    } else if (K === 2) {
	      o("12");
	      ln("1 1 2");
	      ln("1 1 3");
	      ln("1 2 1");
	      ln("1 2 3");
	      ln("1 3 1");
	      ln("1 3 2");
	      ln("2 1 3");
	      ln("2 1 2");
	      ln("2 2 1");
	      ln("2 2 3");
	      ln("2 3 2");
	      ln("2 3 1");
	    } else {
	      o("18");
	      ln("1 1 1");
	      ln("1 1 2");
	      ln("1 1 3");
	      ln("1 2 1");
	      ln("1 2 2");
	      ln("1 2 3");
	      ln("1 3 1");
	      ln("1 3 2");
	      ln("1 3 3");
	      ln("2 1 1");
	      ln("2 1 2");
	      ln("2 1 3");
	      ln("2 2 1");
	      ln("2 2 2");
	      ln("2 2 3");
	      ln("2 3 1");
	      ln("2 3 2");
	      ln("2 3 3");
	    }
	  } else if (J === 3 && P === 3 && S === 3) {
	    if (K === 1) {
	      o("9");
	      ln("1 1 2");
	      ln("1 2 3");
	      ln("1 3 1");
	      ln("2 1 3");
	      ln("2 2 1");
	      ln("2 3 2");
	      ln("3 1 1");
	      ln("3 2 2");
	      ln("3 3 3");
	    } else if (K === 2) {
	      o("18");
	      ln("1 1 2");
	      ln("1 1 1");
	      ln("1 2 3");
	      ln("1 2 2");
	      ln("1 3 3");
	      ln("1 3 1");
	      ln("2 1 3");
	      ln("2 1 2");
	      ln("2 2 3");
	      ln("2 2 1");
	      ln("2 3 2");
	      ln("2 3 1");
	      ln("3 1 1");
	      ln("3 1 3");
	      ln("3 2 1");
	      ln("3 2 2");
	      ln("3 3 3");
	      ln("3 3 2");
	    } else {
	      o("27");
	      ln("1 1 1");
	      ln("1 1 2");
	      ln("1 1 3");
	      ln("1 2 1");
	      ln("1 2 2");
	      ln("1 2 3");
	      ln("1 3 1");
	      ln("1 3 2");
	      ln("1 3 3");
	      ln("2 1 1");
	      ln("2 1 2");
	      ln("2 1 3");
	      ln("2 2 1");
	      ln("2 2 2");
	      ln("2 2 3");
	      ln("2 3 1");
	      ln("2 3 2");
	      ln("2 3 3");
	      ln("3 1 1");
	      ln("3 1 2");
	      ln("3 1 3");
	      ln("3 2 1");
	      ln("3 2 2");
	      ln("3 2 3");
	      ln("3 3 1");
	      ln("3 3 2");
	      ln("3 3 3");
	    }
	  }
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }
/******/ ]);