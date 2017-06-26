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

function solve(iinn){
	var a = ~~iinn[0], b = ~~iinn[1];
	var i, j, c = 0;
	for(i=a;i<=b;i++){
		if(i%4<2 && isP(''+i)){
			j = ~~Math.sqrt(i);
			if(j*j==i && isP(''+j)) c++;
		}
	}
	return c;
}
