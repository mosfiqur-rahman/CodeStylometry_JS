var fs = require('fs');

var s = fs.readFileSync('input.txt', 'utf-8');
var a = s.split('\n');

var i, ind = ~~a.shift();

for(i=1;i<=ind;i++){
	s = solve(a.shift().split(' '));
	console.log("Case #%d: %s", i, s);
}

function isP(s){
	for(var i=0,l=s.length-1,m=(l+1)>>1;i<m;i++){
		if(s[i]!=s[l-i]) return false;
	}
	return true;
}

function isIn(a,b,c){
	return a<=b && b<=c;
}

// FIXME
function inct(s){
	return (parseInt(s,3)+1).toString(3);
}

function cmp(a,b){
	if(a.length > b.length) return 1;
	if(a.length < b.length) return -1;
	for(var i=0;i<a.length;i++){
		if(a[i]>b[i]) return 1;
		if(a[i]<b[i]) return -1;
	}
	return 0;
}

function min12(n){
	var s = n.toString(), f = 0, ns = '', i;
	for(i=0;i<s.length;i++){
		if(f) ns += '0';
		else if(s[i]<'3') ns+=s[i];
		else f = 1, ns = (ns==''?'1':inct(ns))+'0';
	}
	return ns;
}

function solve(iinn){
	var a = Math.ceil(Math.sqrt(iinn[0])), b = Math.floor(Math.sqrt(iinn[1]));
	var i, j, c = 0;

	if(isIn(a,1,b)) c++;
	if(isIn(a,2,b)) c++;
	if(isIn(a,3,b)) c++;
	if(a<11) a = 11;

	a = min12(a); b = ''+b;

	if(cmp(a,b)>0) return c;

	for(i=a;cmp(i,b)<=0;i=inct(i)){
		if(isP(i) && isP((i*i).toString(10))) c++;
	}

	return c;
}
