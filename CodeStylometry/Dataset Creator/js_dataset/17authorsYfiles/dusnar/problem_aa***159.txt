
var fs = require('fs');

var lines = (fs.readFileSync(process.argv[2]) + '').replace(/\r/g, '').split('\n');
var T = parseInt(lines[0], 10);
var li = 1;

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

function possible(a) {
	var aa = a.slice(0);
	var na = [];

	while (a.length > 1) {
		for (var i = 0; i < a.length; i += 2) {
			if (a[i] == a[i + 1]) return null;

			if (a[i] == 'R' && a[i + 1] == 'P') na.push('P');
			if (a[i] == 'P' && a[i + 1] == 'R') na.push('P');

			if (a[i] == 'R' && a[i + 1] == 'S') na.push('R');
			if (a[i] == 'S' && a[i + 1] == 'R') na.push('R');

			if (a[i] == 'P' && a[i + 1] == 'S') na.push('S');
			if (a[i] == 'S' && a[i + 1] == 'P') na.push('S');
		}

		a = na;
		na = [];
	}

	return aa.join('');
}

for (ti = 0; ti < T; ti++)
{
	var l = lines[li++].split(' ').map(function(s){ return parseInt(s, 10); });
	var N = l[0];
	var R = l[1];
	var P = l[2];
	var S = l[3];
	var X = R + P + S;
// if (ti != 2) continue;

	var a = [];

	for (var i = 0; i < P; i++) a.push('P');
	for (var i = 0; i < R; i++) a.push('R');
	for (var i = 0; i < S; i++) a.push('S');

	var perms = permutator(a);

	var solution = null;
	for (var p = 0; p < perms.length && solution === null; p++) {
		var a = perms[p];
		solution = possible(a);
	}

	var r = '';

	console.log('Case #' + (ti + 1) + ': ' + (solution !== null ? solution : 'IMPOSSIBLE'));
}
