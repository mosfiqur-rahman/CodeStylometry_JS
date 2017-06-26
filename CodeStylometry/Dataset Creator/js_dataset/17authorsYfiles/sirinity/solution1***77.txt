(function () {
    var fs = require('fs');

    // https://github.com/MikeMcl/bignumber.js/
    // var BigNumber = require('bignumber.js');

    function composeOutput(i, result) {
        return 'Case #' + (i + 1) + ': ' + result;
    }

    function readInput(filename) {
        return fs.readFileSync(filename, { encoding: 'utf8' });
    }

    function writeOutput(filename, output) {
        fs.writeFileSync(filename, output, { encoding: 'utf8' });
    }

    function fallAsleep(number) {
        var INSOMNIA = 'INSOMNIA';
        var collectedDigits = [];
        var collectedDigitsCounter = 0;

        function collectDigit(digit) {
            if (!collectedDigits[digit]) {
                collectedDigits[digit] = true;
                collectedDigitsCounter++;
            }
        }

        function isReadyToSleep() {
            return collectedDigitsCounter === 10;
        }

        function collectDigits(number) {
            number
                .toString()
                .split('')
                .forEach(collectDigit);
        }

        var currentMultiplier = 1;
        var currentNumber;

        while (true) {
            currentNumber = currentMultiplier * number;

            if (currentNumber === 0) {
                return INSOMNIA;
            }

            collectDigits(currentNumber);

            if (isReadyToSleep()) {
                console.log('number: ', number, ' steps: ', currentMultiplier, ' last: ', currentNumber);
                return currentNumber;
            }

            currentMultiplier++;
        }
    }

    function getInteger(str) {
        return parseInt(str, 10);
    }

    function solve(input) {
        var output = [];

        var lines = input.split('\n');
        var n = parseInt(lines[0], 10);

        lines = lines.slice(1);

        for (var i = 0; i < n; i++) {
            output.push(
                composeOutput(
                    i,
                    fallAsleep(getInteger(lines[i]))
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

    // Test
    /*writeOutput(
        'test.out',
        solve(
            readInput('test.in')
        )
    );*/

    // Small input
    /*writeOutput(
        'A-small-attempt0.out',
        solve(
            readInput('A-small-attempt0.in')
        )
    );*/

    // Big input
    writeOutput(
        'A-large.out',
        solve(
            readInput('A-large.in')
        )
    );

    // To get small output uncomment small input snippet and run
    // To get bit output uncomment big input snippet and run
    // Input and output must be in the same directory
})();