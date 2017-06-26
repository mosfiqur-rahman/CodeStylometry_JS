
_ = require('underscore');
var fs = require('fs');

if (process.argv.length < 3) return console.error('Usage: node program.js inputfile');

var lines = fs.readFileSync(process.argv[2], 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
var l = 0;

var T = parseInt(lines[l++], 10);

for (var t = 0; t < T; t++) {
	var KLS = lines[l++].split(' ').map(function(x) { return parseInt(x, 10); });
	var K = KLS[0];
	var L = KLS[1];
	var S = KLS[2];
	var keys = lines[l++];
	var target = lines[l++];

	var m = target.length;
	for (var i = 1; i < target.length; i++) {
		if (target.substring(0, target.length - i) == target.substring(i, target.length)) {
			m = i;
			break;
		}
	}

	var p = true;
	for (var i = 0; i < target.length; i++) {
		if (keys.indexOf(target.charAt(i)) < 0) {
			p = false;
			break;
		}
	}

	var r = 0;

	if (p) {
		var b = 0;
		if (S >= target.length) {
			b++;
			b += Math.floor((S - target.length) / m);
		}

		var c = {};
		for (var i = 0; i < keys.length; i++) {
			var k = keys[i];
			if (c[k] === undefined) c[k] = 0;
			c[k]++;
		}

		var q = 1;
		for (var i = 0; i < target.length; i++) {
			q *= (c[target[i]] / keys.length);
		};

		// console.log(q);
		var w = q * (S - target.length + 1);
		r = b - w;
	}

	console.log('Case #' + (t + 1) + ': ' + r);
}

