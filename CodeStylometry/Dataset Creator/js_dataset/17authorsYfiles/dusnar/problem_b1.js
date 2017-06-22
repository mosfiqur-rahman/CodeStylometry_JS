
var fs = require('fs');

var lines = (fs.readFileSync(process.argv[2]) + '').replace(/\r/g, '').split('\n');
var T = parseInt(lines[0], 10);
var li = 1;


var solution = null;

function clone(m) {
	var y = new Array(m.length);
	for (var i = 0; i < m.length; i++) {
		y[i] = new Array(m[i].length);
		for (var k = 0; k < m[i].length; k++) y[i][k] = m[i][k];
	}

	return y;
}

function solveRec(m, lists, g) {
	if (g == lists.length) {
		solution = m;
		return;
	}

	var colIndex = lists[0].indexOf(lists[g][0]);
	if (colIndex >= 0) {
		var ok = true;
		for (var i = 0; i < m.length; i++) {
			if (m[i][colIndex] !== null && m[i][colIndex] != lists[g][i]) {
				ok = false;
				break;
			}
		}

		if (ok) {
			var mm = clone(m);
			for (var i = 0; i < mm.length; i++) mm[i][colIndex] = lists[g][i];
			solveRec(mm, lists, g + 1);
		}
	}

	if (solution !== null) return;

	var rowIndex = lists[1].indexOf(lists[g][0]);
	if (rowIndex >= 0) {
		var ok = true;
		for (var i = 0; i < m.length; i++) {
			if (m[rowIndex][i] !== null && m[rowIndex][i] != lists[g][i]) {
				ok = false;
				break;
			}
		}

		if (ok) {
			var mm = clone(m);
			for (var i = 0; i < mm.length; i++) mm[rowIndex][i] = lists[g][i];
			solveRec(mm, lists, g + 1);
		}
	}
}

function same(x, y) {
	for (var i = 0; i < x.length; i++) if (x[i] != y[i]) return false;

	return true;
}

function solve(N, lists) {
	solution = null;

	lists.sort(function(a, b) {
		for (var i = 0; i < a.length; i++) {
			if (a[i] < b[i]) return -1;
			if (a[i] > b[i]) return 1;
		}
	});

// console.log(lists);
	var inverted = false;
	if (lists[0][0] != lists[1][0]) {
		inverted = true;

		for (var i = 0; i < lists.length; i++) {
			for (var k = 0; k < lists[i].length; k++) lists[i][k] = 10000 - lists[i][k];
			lists[i].reverse();
		}

		lists.sort(function(a, b) {
			for (var i = 0; i < a.length; i++) {
				if (a[i] < b[i]) return -1;
				if (a[i] > b[i]) return 1;
			}
		});
	}
// console.log(lists);

	var m = new Array(N);
	for (var i = 0; i < N; i++) {
		m[i] = new Array(N);
		for (var k = 0; k < N; k++) m[i][k] = null;
	}

	for (var i = 0; i < N; i++) m[0][i] = lists[0][i];
	for (var i = 0; i < N; i++) m[i][0] = lists[1][i];

	solveRec(m, lists, 2);

	var r = null;
	for (var i = 0; i < solution.length; i++) {
		var a = [];
		for (var k = 0; k < solution.length; k++) a.push(solution[k][i]);

		var found = false;
		for (var g = 0; g < lists.length; g++) {
			if (same(a, lists[g])) {
				found = true;
				lists.splice(g, 1);
				break;
			}
		}

		if (!found) r = a;
	}

	for (var i = 0; i < solution.length; i++) {
		var a = [];
		for (var k = 0; k < solution.length; k++) a.push(solution[i][k]);

		var found = false;
		for (var g = 0; g < lists.length; g++) {
			if (same(a, lists[g])) {
				found = true;
				lists.splice(g, 1);
				break;
			}
		}

		if (!found) r = a;
	}

	if (inverted) {
		for (var i = 0; i < r.length; i++) r[i] = 10000 - r[i];
		r.reverse();
	}

	return r.join(' ');
}


for (var ti = 0; ti < T; ti++)
{
	var l = lines[li++].split(' ').map(function(s){ return parseInt(s, 10); });
	var N = l[0];
	var lists = [];

	for (var k = 0; k < 2 * N - 1; k++) {
		var l = lines[li++].split(' ').map(function(s){ return parseInt(s, 10); });
		lists.push(l);
	}
// if (ti != 5) continue;

	var r = solve(N, lists);

	console.log('Case #' + (ti + 1) + ': ' + r);
}

