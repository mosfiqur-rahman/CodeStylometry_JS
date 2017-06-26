#!/usr/bin/env node

var a = require('fs').readFileSync('input.txt', 'utf-8').split('\n');
var T = ~~a.shift();
for(var j,i=0;i<T;i++){
	var N = ~~a.shift();
	var tr = [];
	for(j=0;j<N;j++) tr.push(toObj(a.shift().split(' ')));
	console.log("Case #%d: %d", i+1, solve(tr));
}

function toObj(a){
	return {
		'd': ~~a[0],
		'n': ~~a[1],
		'w': ~~a[2], 'e': ~~a[3],
		's': ~~a[4],
		'dd': ~~a[5], 'dp': ~~a[6], 'ds': ~~a[7]
	};
}

function solve(tr){
	var attacks = [];
	var wall = [];

	for(var i=0;i<tr.length;i++){
		for(var o=tr[i],j=0;j<o.n;j++){
			attacks.push({
				'd': o.d+o.dd*j,
				'w': o.w+o.dp*j, 'e': o.e+o.dp*j,
				's': o.s+o.ds*j
			});
		}
	}

	for(i=-250;i<250;i++){
		wall[i] = {
			'ld': -1, 'ls': 0, 's': 0
		};
	}

	attacks.sort(function(o,p){
		return o.d-p.d;
	});

	var x = 0, tt = false;

	for(i=0;i<attacks.length;i++){
		o=attacks[i];
		tt = false;
		for(j=o.w;j<o.e;j++){
			if(wall[j].ls<o.s){
				if(o.d != wall[j].ld){
					wall[j].ls = wall[j].s;
					wall[j].ld = o.d;
				}
				if(wall[j].ls<o.s){
					if(wall[j].s<o.s) wall[j].s = o.s;
					if(!tt) x++; tt = true;
				}
			}
		}
	}

	return x;
}
