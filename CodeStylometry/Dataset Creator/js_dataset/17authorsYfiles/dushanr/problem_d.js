
var fs = require('fs');

if (process.argv.length < 3) return console.error('Usage: node program.js inputfile');

var lines = fs.readFileSync(process.argv[2], 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '').split('\n');
var l = 0;

var T = parseInt(lines[l++], 10);

for (var t = 0; t < T; t++) {
	var XRC = lines[l++].split(' ').map(function(x) { return parseInt(x, 10); });
	var X = XRC[0];
	var R = Math.min(XRC[1], XRC[2]);
	var C = Math.max(XRC[1], XRC[2]);

	var r = 'RICHARD';

	switch (X) {
		case 1:
			r = 'GABRIEL';
			break;
		case 2:
			if ((R == 1 && C == 2) || (R == 1 && C == 4) || (R == 2 && C == 2) || (R == 2 && C == 3) || 
				(R == 2 && C == 4) || (R == 3 && C == 4) || (R == 4 && C == 4)) r = 'GABRIEL';
			break;
		case 3:
			if ((R == 2 && C == 3) || (R == 3 && C == 3) || (R == 3 && C == 4)) r = 'GABRIEL';
			break;
		case 4:
			if ((R == 3 && C == 4) || (R == 4 && C == 4)) r = 'GABRIEL';
			break;
	}

	console.log('Case #' + (t + 1) + ': ' + r);
}


