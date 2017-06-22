#!/usr/bin/env node

var fs = require('fs');
var n = fs.readFileSync('input.txt', 'utf-8').toString().split('\n');
for(var i=1;i<n.length;i++){
	if(n[i]) console.log("Case #%d: %d", i, solve(n[i].split(' ')));
}

function isCon(x){
	return x!='a'&&x!='e'&&x!='i'&&x!='o'&&x!='u';
}

function tri(n){
	return n*(n+1)/2;
}

function solve(a){
	var n = ~~a[1], s = a[0], x = 0, l = -1, c = 0, p = 0;
	for(var i=0;i<s.length;i++){
		if(c==n){
			if(isCon(s[i])) x+=p=i-n+2;
			else c=0,x+=p;
		}else if(isCon(s[i])){
			c++;
			if(c==n) x+=p=i-n+2;
			else x+=p;
		}else c=0,x+=p;
	}
	return x;
};
