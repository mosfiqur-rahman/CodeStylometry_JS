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
	///
	///
	var rp = function(a,b) {
	  if(a==="R" && b==="S") return "R";
	  if(a==="R" && b==="P") return "P";
	  if(a==="P" && b==="S") return "S";
	  if(a==="P" && b==="R") return "P";
	  if(a==="S" && b==="R") return "R";
	  if(a==="S" && b==="P") return "S";
	};
	var rps = function(list){
	  var newlist="";
	  for(var i=0; i< list.length;i=i+2){
	    newlist+= rp(list[i],list[i+1]);
	  }
	  if(newlist.length===1) return newlist;
	  return rps(newlist);
	};
	var ans={};
	var precalc = function() {
	  ans = {1 : ["PR","PS","RS"]};

	  var N = 14;
	  var prev = 1;
	  while(N>0){
	    var next = prev+1;
	    ans[next] = [];
	    ans[next].push(ans[prev][0]+ans[prev][1]);
	    ans[next].push(ans[prev][0]+ans[prev][2]);
	    ans[next].push(ans[prev][1]+ans[prev][2]);
	    N--;
	    prev = next;
	  }

	  return;
	};

	var isvalid = function(N,R,P,S){
	  if(ans[N][0].split("R").length - 1 === R && ans[N][0].split("P").length - 1 === P && ans[N][0].split("S").length - 1 === S) {
	    o(ans[N][0]);
	  } else if(ans[N][1].split("R").length - 1 === R && ans[N][1].split("P").length - 1 === P && ans[N][1].split("S").length - 1 === S) {
	    o(ans[N][1]);
	  } else if(ans[N][2].split("R").length - 1 === R && ans[N][2].split("P").length - 1 === P && ans[N][2].split("S").length - 1 === S) {
	    o(ans[N][2]);
	  } else {
	    o("IMPOSSIBLE");
	  }
	};


	//o(JSON.stringify(precalc(),null,2));
	precalc();
	for (var idx = 0; idx < contentLines.length; idx++) {
	  var els = contentLines[idx].split(" "),
	    N = +els[0],
	    R = +els[1],
	    P = +els[2],
	    S = +els[3];
	    isvalid(N,R,P,S);


	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ }
/******/ ]);