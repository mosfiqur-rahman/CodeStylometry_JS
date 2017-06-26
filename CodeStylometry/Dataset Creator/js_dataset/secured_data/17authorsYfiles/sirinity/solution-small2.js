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
function rearrangeLetters(word) {
    return word
        .split('')
        .reduce(function (memory, nextLetter, i) {
            console.log('rearrangeLetters', memory, nextLetter, i);
            if (i === 0) {
                memory.push(nextLetter)
            } else {
                // if (nextLetter < memory[memory.length - 1]) {
                if (nextLetter >= memory[0]) {
                    memory.unshift(nextLetter);
                } else {
                    memory.push(nextLetter);
                }
            }
            return memory;
        }, [])
        .join('');
}

function solveProblem(input) {
    input = codeJam.io.decomposeInput(input);

    return input.lines
        .map(function (testcase, i) {
            return codeJam.io.composeOutput(i, rearrangeLetters(testcase));
        })
        .join('\n');
}

// codeJam.io.solve('sample.in', 'sample.out', solveProblem);
// codeJam.io.solve('A-small-attempt0.in', 'A-small-attempt0.out', solveProblem);
codeJam.io.solve('A-large.in', 'A-large.out', solveProblem);
// I REMOVED EXTRA LINE FEED IN INPUT FILE