(function () {
    var fs = require('fs');

    // https://github.com/MikeMcl/bignumber.js/
    var BigNumber = require('bignumber.js');

    BigNumber.config({
        RANGE: 20
    });

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

    var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

    function isSafeInteger(integer) {
        return integer <= MAX_SAFE_INTEGER;
    }

    var IMPOSSIBLE = 'IMPOSSIBLE';
    var OUT_OF_RANGE = 'OUT_OF_RANGE';

    /**
     * Calculates indices via formula and return string of all indices
     * @param {BigNumber} originalSequenceLength
     * @param {BigNumber} complexity
     * @returns {string}
     */
    function checkEveryTile(originalSequenceLength, complexity) {
        var indices = [];
        var k = originalSequenceLength;
        var j = complexity;

        function checkTileIndex(i, j) {
            // var index = (i-1) * Math.pow(k, j - 1) +
            //    (i-1) * (j >= 2 ? Math.pow(k, j - 2) : 0) +
            //    (j > 2 ? i : 1);

            return k.toPower(j.minus(1)).times(i-1)
                .plus(
                    j.greaterThanOrEqualTo(2) ?
                        k.toPower(j.minus(2)).times(i-1) :
                        0
                )
                .plus(
                    j.greaterThan(2) ? checkTileIndex(i, j.minus(2)) : 1
                );
        }

        for (var i = 1; k.plus(1).greaterThan(i); i++) {
            indices.push(checkTileIndex(i, j).toFixed());
        }

        return indices.join(' ');
    }

    function toFindGoldCheckTiles(originalSequenceLength, complexity, tilesNumber) {
        // console.log(originalSequenceLength, complexity, tilesNumber);
        originalSequenceLength = new BigNumber(originalSequenceLength);
        complexity = new BigNumber(complexity);

        // For small input originalSequenceLength === tilesNumber
        if (originalSequenceLength.equals(tilesNumber)) {
            // originalSequenceLength ^ complexity <= 10 ^ 18 - not every input is safe
            if (originalSequenceLength.isFinite()) {
                return checkEveryTile(originalSequenceLength, complexity);
            } else {
                return OUT_OF_RANGE;
            }
        } else {
            return IMPOSSIBLE;
        }
    }

    function solve(input) {
        var output = [];

        var lines = input.split('\n');
        var n = parseInt(lines[0], 10);

        lines = lines.slice(1);

        for (var i = 0; i < n; i++) {
            var parameters = lines[i].split(' ');

            output.push(
                composeOutput(
                    i,
                    toFindGoldCheckTiles(
                        getInteger(parameters[0]),
                        getInteger(parameters[1]),
                        getInteger(parameters[2])
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

    // Small input
    writeOutput(
        'D-small-attempt1.out',
        solve(
            readInput('D-small-attempt1.in')
        )
    );

    // Big input
    /*writeOutput(
        'D-large-attempt0.out',
        solve(
            readInput('D-large-attempt0.in')
        )
    );*/

    // To get small output uncomment small input snippet and run
    // To get bit output uncomment big input snippet and run
    // Input and output must be in the same directory
})();