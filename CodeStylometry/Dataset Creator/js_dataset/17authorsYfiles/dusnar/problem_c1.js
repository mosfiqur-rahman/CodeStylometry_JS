
var fs = require('fs');
var BigNumber = require('bignumber.js');

var lines = (fs.readFileSync(process.argv[2]) + '').replace(/\r/g, '').split('\n');
var T = parseInt(lines[0], 10);
var li = 1;

function isPrime(n) {
	if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
	var m = Math.sqrt(n);
	for (var i = 2; i <= m; i++) if (n % i === 0) return false;

	return true;
}

// var primes = [];
// for (var i = 0; i < 10000; i++) if (isPrime(i)) primes.push(i);
// fs.writeFileSync('./primes.txt', JSON.stringify(primes));

var primes = JSON.parse(fs.readFileSync('./primes.txt') + '');

function isDevisible(b, base, p) {
	var r = b[0];
	for (var bi = 1; bi < b.length; bi++) {
		if (b[bi] === 0) continue;

		var rr = base % p;
		for (var k = 0; k < bi - 1; k++) {
			rr = (rr * base) % p;
		}

		r += rr;
	}

	return r % p === 0;
}

function test(b, devisors) {
	for (var base = 2; base <= 10; base++) {
		var bn = new BigNumber(b, base);
		var s = bn.toFixed();
		var bn2 = new BigNumber(s);
		if (!bn2.mod(devisors[base - 2]).isZero()) {
			console.log('!!!');
		}
	}
}

for (var ti = 0; ti < T; ti++)
{
	var l = lines[li++].split(' ').map(function(s) { return parseInt(s, 10); });
	var N = l[0];
	var J = l[1];

	console.log('Case #' + (ti + 1) + ': ');

	var f = 0;

	var b = new Array(N);
	for (var i = 0; i < N; i++) b[i] = 0;
	b[0] = 1;
	b[N - 1] = 1;

	while (f < J) {
		var ok = true;
		var devisors = [];
		for (var base = 2; ok && base <= 10; base++) {
			var divisible = false;
			for (var pi = 0; !divisible && pi < primes.length; pi++) {
				var p = primes[pi];

				if (isDevisible(b, base, p)) {
					devisors.push(p);
					divisible = true;
				}
			}

			if (!divisible) ok = false;
		}

		if (ok) {
			f++;
			var bs = b.reverse().join('');
			console.log(bs + ' ' + devisors.join(' '));
test(bs, devisors);
		}

		if (f < J) {
			var j = 1;
			while (b[j] === 1) j++;
			if (j === N) {
				console.log('NOT ENOUGH!!!');
				break;
			}
			b[j] = 1;
			for (var k = 1; k < j; k++) b[k] = 0;
		}
	}
}

