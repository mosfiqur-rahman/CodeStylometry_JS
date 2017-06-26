var fs = require('fs');

var s = fs.readFileSync('input.txt', 'utf-8');
var a = s.split('\n');

var i, ind = ~~a.shift();
var x, j, w, h;

for(i=1;i<=ind;i++){
	x = a.shift().split(' ');
	h = ~~x[0], w = ~~x[1];
	s = solve(a.splice(0,h),w,h);
	console.log("Case #%d: %s", i, s);
}

function make(w,h,x){
	var i, j, a = [];
	for(i=0;i<h;i++){
		a[i] = [];
		for(j=0;j<w;j++) a[i][j] = x;
	}
	return a;
}

function solve(m,w,h){
	var a = make(w,h,100);
	var i,j,x;

	m = m.map(function(s){return s.split(' ')});

	for(i=0;i<h;i++){
		x = 0;
		for(j=0;j<w;j++) if(m[i][j]>x) x = m[i][j];
		for(j=0;j<w;j++) if(a[i][j]>x) a[i][j] = x;
	}
	for(j=0;j<w;j++){
		x = 0;
		for(i=0;i<h;i++) if(m[i][j]>x) x = m[i][j];
		for(i=0;i<h;i++) if(a[i][j]>x) a[i][j] = x;
	}

	for(i=0;i<h;i++) for(j=0;j<w;j++)
		if(m[i][j] != a[i][j]) return 'NO';
	return 'YES';
}
