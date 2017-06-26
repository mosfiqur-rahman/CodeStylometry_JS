//Usage: node solution.js file.in > file.out
'use strict';

var fs = require('fs');
var data = fs.readFileSync(process.argv[2], 'utf-8').replace(/\r/g, '').split('\n').filter(String);

function prepare(data) {
	var caseNum = data.shift();

	var cases = [];
	for(var i = 0; i < caseNum; i++) {
		var n = data.shift();
		var lists = [];
		for(var j = 0; j < 2 * n - 1; j++) {
			lists.push(data.shift().split(' '));
		}
		/*lists.sort(function(x, y) {
			return x[0] > y[0];
		});*/
		cases.push({
			n: n,
			lists: lists
		});
	}

	return {
		cases: cases
	};
}

function createMap(lists, n, map) {
	var missing = -1;
	for(var i = 0; i < n; i++) {
		lists.sort(function(x, y) { 
			var a = parseInt(x[i]);
			var b = parseInt(y[i]);
			if(a > b) {
				return 1;
			}
			else if(a < b){
				return -1;
			}
			return 0;
		});
		var current = lists[0];
		var next = lists[1];
		if(lists.length < 2 || current[i] !== next[i]) {
			map[i] = current;
			lists.splice(0, 1);
			missing = i;
		}
		else {
			map[i] = [current, next]
			lists.splice(0, 2);
		}
	}
	return missing;
}

function find(n, map, missing) {
	var solution = [];
	for(var i = 0; i < n; i++) {
		if(i !== missing) {
			var ntarget = map[missing][i];
			var c1 = map[i][0][missing];
			var c2 = map[i][1][missing];
			if(c1 === ntarget) {
				solution.push(c2);
			}
			else {
				solution.push(c1);
			}	
		}
		else {
			var c = map[i][missing];
			solution.push(c);
		}
	}
	return solution
}

function solve(data) {
	data.cases.forEach(function(item, index) {
		
		var map = {};
		var missing = createMap(item.lists, item.n, map);


		var solution = find(item.n, map, missing).join(' ');

		console.log('Case #' + (index + 1) + ': ' + solution);
	});
}

solve(prepare(data));