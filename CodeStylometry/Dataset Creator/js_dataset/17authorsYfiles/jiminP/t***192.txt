#!/usr/bin/env node

// native things
var fs = require('fs');

// I might not use any of these libraries. (Free to remove require unless I use it)

// npm libraries (http://npmjs.org/package/<package_name_here>)
var $r = require('redblack');
var $i = require('interval-tree');
var $sort = require('sortedlist');
var $bn = require('bignumber.js');
var $bi = require('big-number');

// skiplist implementation (git://github.com/ceejbot/skiplist.git)
var $s = require('skiplist');

function solve(){
	return ;
}

(function(){
	var a = fs.readFileSync('input.txt', 'utf-8').split('\n');
	for(var i=1,T=~~a.shift();i<=T;i++){
		
		console.log("Case #%d: %s", i, solve(
			/* Arguments */
		));
	}
}());
