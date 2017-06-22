#!/usr/bin/env node

var a = require('fs').readFileSync('input.txt','utf-8').split('\n');

var o;

prepare();

for(var i=1;i<a.length;i++){
	if(a[i]) console.log("Case #%d: %s", i, solve(a[i].split(' ')));
}

function check_in(p,x){
	if(x[0]>200||x[0]<-200||x[1]>200||x[1]<-200) return;
	if(o[x[0]+' '+x[1]] != null) return;
	p.push(x); o[x[0]+' '+x[1]] = x[2];
}

function prepare(){
	o = {};
	for(var i=-200;i<=200;i++)
	for(var j=-200;j<=200;j++){
		o[i+' '+j] = null;
	}
	o['0 0'] = 0;
	var oo, p = [[0,0,'']], l;
	while(p.length>0){
		oo = p.shift();
		l = oo[2].length+1;
		check_in(p,[oo[0],oo[1]+l,oo[2]+'N']);
		check_in(p,[oo[0],oo[1]-l,oo[2]+'S']);
		check_in(p,[oo[0]+l,oo[1],oo[2]+'E']);
		check_in(p,[oo[0]-l,oo[1],oo[2]+'W']);
	}
	console.log('OK');
}

function solve(a){
	return o[a[0]+' '+a[1]];
}
