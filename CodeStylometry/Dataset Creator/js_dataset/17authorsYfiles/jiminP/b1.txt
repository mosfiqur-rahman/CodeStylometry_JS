#!/usr/bin/env node

var a = require('fs').readFileSync('input.txt','utf-8').split('\n');

for(var i=1;i<a.length;i++){
	if(a[i]) console.log("Case #%d: %s", i, solve(a[i].split(' ')));
}

function min(z){
	var m = ~~Math.sqrt(2*z);
	if(m*(m+1)>=2*z) return m;
	return m+1;
}

function flipx(o){
	for(var i=o.length;i-->0;){
		if(o[i]=='E') o[i]='W';
		else if(o[i]=='W') o[i]='E';
	}
	return o;
}
function flipy(o){
	for(var i=o.length;i-->0;){
		if(o[i]=='N') o[i]='S';
		else if(o[i]=='S') o[i]='N';
	}
	return o;
}

function solve(a){
	function solve_inner(x,y,l){
		if(x==0&&y==0&&l==0) return [];
		if(x<0) return flipx(solve_inner(-x,y,l));
		if(y<0) return flipy(solve_inner(x,-y,l));
		if(!l) l = min(x+y);
		while((x+y)%2 != ((l+1)>>1)%2) l++;
		if(x<y) return solve_inner(x,y-l,l-1).concat('N');
		else return solve_inner(x-l,y,l-1).concat('E');
	}
	return solve_inner(~~a[0],~~a[1]).join('');
}
