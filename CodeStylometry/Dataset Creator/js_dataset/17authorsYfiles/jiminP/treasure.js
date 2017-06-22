var fs = require('fs');
var s = fs.readFileSync('input.txt', 'utf-8');

var a = s.split('\n');
var i, j, ind = ~~a.shift();
var init_key, chest;
var K, N, Ti, Ki;
var tmp, o;

for(i=1;i<=ind;i++){
	init_keys = [];
	chest = [];

	tmp = a.shift().split(' ');
	K = ~~tmp[0]; N = ~~tmp[1];
	init_keys = a.shift().split(' ');

	for(j=0;j<N;j++){
		tmp = a.shift().split(' ');
		o = {};
		o.lock = tmp.shift();
		tmp.shift();
		o.key = tmp;
		o.visited = false;
		chest.push(o);
	}

	s = solve(init_keys, chest);
	console.log("Case #%d: %s", i, s);
}

var cache = {};
function solve(init_keys, chests){
	cache = {};
	var ans = solve_inner(init_keys.sort(), chests);
	
	if(ans === null) return 'IMPOSSIBLE';
	return ans.trim();
}

function solve_inner(keys, chests){
	var i, d, ans = '';
	
	for(i=0;i<chests.length;i++)
		if(!chests[i].visited) ans += i;
	
	if(ans.length == 0) return '';

	ans += ':';
	
	d = keys.filter(function(n){return n!==null});
	if(d.length == 0) return null;
	
	ans += d.sort().join(' ');
	
	if(cache[ans]) return null;
	cache[ans] = 1;
	
	ans = '';
	for(i=0;i<chests.length;i++){
		if(!chests[i].visited && (d=keys.indexOf(chests[i].lock)) >= 0){
			keys[d] = null;
			chests[i].visited = true;
			
			ans = solve_inner(keys.concat(chests[i].key), chests);
			
			chests[i].visited = false;
			keys[d] = chests[i].lock;

			if(ans != null) return (i+1)+' '+ans;
		}
	}
	return null;
}
