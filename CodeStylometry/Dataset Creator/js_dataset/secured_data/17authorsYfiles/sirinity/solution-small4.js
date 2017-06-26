var fs = require('fs');
var BigNumber = require('bignumber.js');

var codeJam = {};

// IO
/**
 * Composes output for test case i
 * @param {Number} i - test case number starting from 0
 * @param {String} result - stringified result
 * @returns {string}
 */
function composeOutput(i, result) {
    return 'Case #' + (i + 1) + ': ' + result;
}
/**
 * Composes multiline output for test case i
 * @param {Number} i - test case number starting from 0
 * @param {Array} result - array of stringified results each of which will be printed to a new line
 * @returns {string}
 */
function composeMultilineOutput(i, result) {
    return 'Case #' + (i + 1) + ':\n' + result.join('\n');
}

/**
 * Reads the input file synchronously as string
 * @param {String} filename
 * @returns {*}
 */
function readInput(filename) {
    return fs.readFileSync(filename, { encoding: 'utf8' });
}

/**
 * Outputs the answer to file synchronously
 * @param {String} filename
 * @param {String} output
 * @returns {*}
 */
function writeOutput(filename, output) {
    fs.writeFileSync(filename, output, { encoding: 'utf8' });
}

/**
 * Entry point to our code jam programm
 * @param {String} inputFile - input file name
 * @param {String} outputFile - output file name
 * @param {Function} solveCallback - function that takes input and produces output
 */
function solve(inputFile, outputFile, solveCallback) {
    writeOutput(
        outputFile,
        solveCallback(
            readInput(inputFile)
        )
    );
}

/**
 * Return number of testcases and array of remaining input lines.
 * @param {String} input - input string
 * @returns {{n: Number, lines: Array}}
 */
function decomposeInput(input) {
    var lines = input.split('\n');

    return {
        n: parseInt(lines[0], 10),
        lines: lines.slice(1)
    };
}


codeJam.io = {
    solve: solve,
    readInput: readInput,
    writeOutput: writeOutput,
    composeOutput: composeOutput,
    composeMultilineOutput: composeMultilineOutput,
    decomposeInput: decomposeInput
};

// ---------------------------------------------------------------------------------------------------------------------
function getUniqueBffs(bffs) {
    var unique = {};

    bffs.forEach(function (bff) {
        if (!unique.hasOwnProperty(bff)) {
            unique[bff] = null;
        }
    });

    return Object.keys(unique);
}

function createStudents(n) {
    var kids = [];

    for (var i = 0; i < n; i++) {
        kids.push(String(i + 1));
    }

    return kids;
}

function composeCircle(n, current, bffs, result, taken) {
    console.log(n, current, bffs, result, taken);

    var students = createStudents(n);

    taken = taken || {};
    taken[current] = null;

    result = result || [];
    result.push(current);

    function isTaken(student) {
        return taken.hasOwnProperty(student);
    }

    function isNotLeftPal() {
        return result[result.length - 2] !== rightPal;
    }

    function isLeftPal() {
        return result[result.length - 2] === rightPal;
    }

    function isRightPal() {
        return result[0] === rightPal;
    }

    function cloneObject(obj) {
        var res = {};

        for (var p in obj) if (obj.hasOwnProperty(p)) {
            res[p] = obj[p];
        }

        return res;
    }

    for (var i = 1; result.length <= n; i++) {
        var rightPal = bffs[parseInt(current, 10) - 1];

        if (isTaken(rightPal) && isNotLeftPal()) {
            // console.log('TAKEN AND NOT LEFT PAL');
            break;
        } else if (isTaken(rightPal) && isLeftPal()) {
            var remainingStudents = students.filter(function (student) {
                return !isTaken(student);
            });

            // console.log('TAKEN AND LEFT PAL', remainingStudents);

            var branchedResults = remainingStudents
                .map(function (student) {
                    return composeCircle(n, student, bffs, [].concat(result), cloneObject(taken));
                });

            branchedResults.push(result.length);

            return Math.max.apply(Math, branchedResults);

        } else {
            taken[rightPal] = null;
            result.push(rightPal);
            current = rightPal;
        }
    }

    if (isRightPal()) {
        // console.log('result', result);
        return result.length;
    } else {
        return 0;
    }
}

function solveProblem(input) {
    input = codeJam.io.decomposeInput(input);

    var output = [];

    // console.log(input.n);

    for (var i = 0; i < 2 * input.n; i += 2) {
        var kidsNumber = parseInt(input.lines[i], 10);
        var bffs = input.lines[i + 1].split(' ');
        var kids = createStudents(kidsNumber);

        // console.log(kidsNumber, bffs, kids);

        var branchedResults = kids
            .map(function (student) {
                return composeCircle(kidsNumber, student, bffs);
            });

        // console.log('answer', branchedResults, Math.max.apply(Math, branchedResults));

        output.push(codeJam.io.composeOutput(i / 2, Math.max.apply(Math, branchedResults)));
    }

    return output
        .join('\n');
}

// codeJam.io.solve('sample.in', 'sample.out', solveProblem);
codeJam.io.solve('C-small-attempt0.in', 'C-small-attempt0.out', solveProblem);
// codeJam.io.solve('A-large.in', 'A-large.out', solveProblem);