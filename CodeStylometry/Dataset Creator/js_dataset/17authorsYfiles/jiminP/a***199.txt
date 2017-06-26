#!/usr/bin/env node

var fs = require('fs');
var n = fs.readFileSync('input.txt', 'utf-8').toString().split('\n');
for(var i=1;i<n.length;i++){
	if(n[i]) console.log("Case #%d: %d", i, solve(n[i].split(' ')));
}

function solve(a){
	var n = 0, r = new RegExp("[^aeiou]{"+a[1]+"}");
	for(var i=0,j;i<a[0].length;i++){
		for(j=i+~~a[1];j<=a[0].length;j++){
			if(a[0].slice(i,j).match(r)) n++;
		}
	}
	return n;
};
