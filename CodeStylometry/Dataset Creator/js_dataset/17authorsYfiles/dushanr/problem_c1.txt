
_ = require('underscore');
var fs = require('fs');

if (process.argv.length < 3) return console.error('Usage: node program.js inputfile');

var lines = fs.readFileSync(process.argv[2], 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
var l = 0;

function bf(d) {
	var a = {};

	for (var i0 = 0; i0 < 2; i0++) {
		for (var i1 = 0; i1 < 2; i1++) {
			for (var i2 = 0; i2 < 2; i2++) {
				for (var i3 = 0; i3 < 2; i3++) {
					for (var i4 = 0; i4 < 2; i4++) {
						for (var i5 = 0; i5 < 2; i5++) {
							for (var i6 = 0; i6 < 2; i6++) {
								for (var i7 = 0; i7 < 2; i7++) {
									for (var i8 = 0; i8 < 2; i8++) {
										for (var i9 = 0; i9 < 2; i9++) {
											var s = 0;
											if (i0 && d.length > 0) s += d[0];
											if (i1 && d.length > 1) s += d[1];
											if (i2 && d.length > 2) s += d[2];
											if (i3 && d.length > 3) s += d[3];
											if (i4 && d.length > 4) s += d[4];
											if (i5 && d.length > 5) s += d[5];
											if (i6 && d.length > 6) s += d[6];
											if (i7 && d.length > 7) s += d[7];
											if (i8 && d.length > 8) s += d[8];
											if (i9 && d.length > 9) s += d[9];
											a[s] = 1;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	return a;
}

var T = parseInt(lines[l++], 10);

for (var t = 0; t < T; t++) {
	var CDV = lines[l++].split(' ').map(function(x) { return parseInt(x, 10); });
	var C = CDV[0];
	var D = CDV[1];
	var V = CDV[2];
	var d = lines[l++].split(' ').map(function(x) { return parseInt(x, 10); });

	var r = 0;
	var a = bf(d);

	var m = null;

	for (var k = 1; k <= V; k++) {
		if (!a[k]) {
			m = k;
			break;
		}
	}

	while (m != null) {
		d.push(m);
		a = bf(d);
		r++;

		m = null;
		for (var k = 1; k <= V; k++) {
			if (!a[k]) {
				m = k;
				break;
			}
		}
	}

	console.log('Case #' + (t + 1) + ': ' + r);
}

