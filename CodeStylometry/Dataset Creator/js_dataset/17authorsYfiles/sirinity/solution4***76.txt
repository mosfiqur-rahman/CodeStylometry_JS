(function () {
    var fs = require('fs');

    // https://github.com/MikeMcl/bignumber.js/
    // var BigNumber = require('bignumber.js');

    function composeOutput(i, result) {
        return 'Case #' + (i + 1) + ':\n' +
            result
                .map(function (currentCoin) {
                    return currentCoin.coin + ' ' + currentCoin.divisors.join(' ');
                })
                .join('\n');
    }

    function readInput(filename) {
        return fs.readFileSync(filename, { encoding: 'utf8' });
    }

    function writeOutput(filename, output) {
        fs.writeFileSync(filename, output, { encoding: 'utf8' });
    }

    function getInteger(str) {
        return parseInt(str, 10);
    }

    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

    function isSafeInteger(integer) {
        return integer <= MAX_SAFE_INTEGER;
    }

    function toDecimal(str, base) {
        // ASSUME BIG ENDIAN
        return str
            .split('')
            .reverse()
            .map(function (power, index) {
                return getInteger(power) * Math.pow(base, index);
            })
            .reduce(function (sum, power) {
                return sum += power
            }, 0);
    }

    // FOR BRUTE FORCE SOLUTION - PRIME NUMBERS UNDER 1000
    var POTENTIAL_PRIME_DIVISORS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];

    var BASES = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    function getRandomBinaryString(length) {
        var result = '';
        for (var i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 2);
        }
        return result;
    }

    function coinGenerator(coinLength) {
        if (typeof coinLength !== 'number') {
            throw new Error('coinGenerator: coinLength must be number');
        }

        if (typeof coinLength < 2) {
            throw new Error('coinGenerator: coinLength must be greater or equal to 2');
        }

        var previousCoins = [];
        var currentCoin;

        function getNextUniqueCoin() {
            var coin = 1 + getRandomBinaryString(coinLength - 2) + 1;

            // UNLESS WE ALREADY MINED ALL POSSIBLE COINS
            if (previousCoins.length < Math.pow(2, coinLength - 2)) {
                if (previousCoins.indexOf(coin) === -1) {
                    previousCoins.push(coin);
                    return coin;
                } else {
                    return getNextUniqueCoin();
                }
            }
        }

        return {
            next: getNextUniqueCoin
        }
    }

    function isDivisor(number, divisor) {
        return number % divisor === 0;
    }

    function hasNonTrivialDivisor(number) {
        // We check against our list of primes and if none are divisors we assume it might be prime;
        // We get loads of false positives;

        return POTENTIAL_PRIME_DIVISORS.find(isDivisor.bind(null, number));
    }

    function isJamCoin(coin) {
        console.log(coin);

        var divisors = [];

        var decimalRepresentation = BASES
            .map(toDecimal.bind(null, coin));

        for (var i = 0; i < decimalRepresentation.length; i++) {
            var value = decimalRepresentation[i];
            var divisor = isSafeInteger(value) && hasNonTrivialDivisor(value);

            if (divisor) {
                divisors.push(divisor);
            } else {
                // NOT A JAM COIN BY OUR STANDARDS
                return false;
            }
        }

        return divisors;
    }

    function mineJamCoins(coinLength, numberOfCoins) {
        var minedCoins = [];
        var coinGetter = coinGenerator(coinLength);
        var currentCoin;

        while ((currentCoin = coinGetter.next()) && minedCoins.length < numberOfCoins) {
            console.log('currentCoin', currentCoin);
            var divisors = isJamCoin(currentCoin);

            if (divisors) {
                minedCoins.push({
                    coin: currentCoin,
                    divisors: divisors
                });
            }
        }

        return minedCoins;
    }

    function solve(input) {
        var output = [];

        var lines = input.split('\n');
        var n = parseInt(lines[0], 10);

        lines = lines.slice(1);

        for (var i = 0; i < 2 * n; i += 2) {
            var parameters = lines[i].split(' ');
            output.push(
                composeOutput(
                    i,
                    mineJamCoins(
                        getInteger(parameters[0]),
                        getInteger(parameters[1])
                    )
                )
            );
        }

        return output.join('\n');
    }

    // Sample
    /*writeOutput(
        'sample.out',
        solve(
            readInput('sample.in')
        )
    );*/

    // Small sample
    /*writeOutput(
        'small.out',
        solve(
            readInput('small.in')
        )
    );*/

    // Small real
    writeOutput(
        'C-small-attempt1.out',
        solve(
            readInput('C-small-attempt1.in')
        )
    );

    // Small input
    /*writeOutput(
     'A-small-attempt1.out',
     solve(
     readInput('A-small-attempt1.in')
     )
     );*/

    // Big input
    /*writeOutput(
        'A-large.out',
        solve(
            readInput('A-large.in')
        )
    );*/

    // To get small output uncomment small input snippet and run
    // To get bit output uncomment big input snippet and run
    // Input and output must be in the same directory
})();