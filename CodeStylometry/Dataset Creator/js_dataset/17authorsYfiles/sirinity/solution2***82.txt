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

    function getInteger(str) {
        return parseInt(str, 10);
    }

    var HAPPY = '+';
    var BLANK = '-';

    function flipPancake(pancake) {
        return pancake === HAPPY ? BLANK : HAPPY;
    }

    function flipFirstNPancakes(pancakeStack, n) {
        var flippingPart = pancakeStack.substring(0, n);
        var inplacePart = pancakeStack.substring(n);

        flippingPart = flippingPart
            .split('')
            .map(flipPancake)
            .reverse()
            .join('');

        return flippingPart + inplacePart;
    }

    function isPancakeHappy(pancake) {
        return pancake === HAPPY;
    }

    function isPancakeBlank(pancake) {
        return pancake === BLANK;
    }

    function makePancakesHappy(pancakeStack) {
        var numberOfPancakes = pancakeStack.length;
        var numberOfFlips;

        console.log(pancakeStack);
        console.log(numberOfPancakes);

        var allHappy = pancakeStack
            .split('')
            .every(isPancakeHappy);

        var allBlank = pancakeStack
            .split('')
            .every(isPancakeBlank);

        if (allHappy) {
            return 0;
        } else if (allBlank) {
            return 1;
        } else {
            var j = 0;

            if (pancakeStack.charAt(j) === BLANK) {
                while (pancakeStack.charAt(j) === BLANK && j < numberOfPancakes) {
                    j++;
                }
            } else {
                while (pancakeStack.charAt(j) === HAPPY && j < numberOfPancakes) {
                    j++;
                }
            }

            pancakeStack = flipFirstNPancakes(pancakeStack, j);

            return makePancakesHappy(pancakeStack) + 1;
        }
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
                    makePancakesHappy(lines[i])
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

    // Small input
    writeOutput(
        'B-small-attempt0.out',
        solve(
            readInput('B-small-attempt0.in')
        )
    );

    // Big input
    /*writeOutput(
        'B-large.out',
        solve(
            readInput('B-large.in')
        )
    );*/

    // To get small output uncomment small input snippet and run
    // To get bit output uncomment big input snippet and run
    // Input and output must be in the same directory
})();