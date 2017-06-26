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
function indexToName(index) {
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(index);
}

function findMostRepresented(numberOfParties, partyMembers) {
    var maxMembers = Math.max.apply(Math, partyMembers);
    return partyMembers
        .map(function (numberOfMembers, i) {
            return {
                name: indexToName(i),
                i: i,
                numberOfMembers: numberOfMembers
            }
        })
        .filter(function (party) {
            return party.numberOfMembers === maxMembers;
        });
}

function evacuateSenate(numberOfParties, partyMembers) {
    var currentCount = partyMembers.reduce(function (sum, current) {
        return sum += current;
    }, 0);

    var SEPARATOR = ' ';

    var evacuationSteps = '';

    while (currentCount > 0) {
        var parties = findMostRepresented(numberOfParties, partyMembers);
        var maxRepresentedLength = parties.length;

        console.log('currentCount', currentCount, 'parties', parties);

        for (var j = 0; j < maxRepresentedLength; j += 1) {
            if (j === maxRepresentedLength - 2) {
                evacuationSteps += parties[j].name + parties[j + 1].name + SEPARATOR;
                partyMembers[parties[j].i] -= 1;
                partyMembers[parties[j + 1].i] -= 1;
                currentCount -= 2;

                break;
            } else {
                evacuationSteps += parties[j].name + SEPARATOR;
                partyMembers[parties[j].i] -= 1;
                currentCount -= 1;
            }
        }
    }

    return evacuationSteps;
}

function solveProblem(input) {
    input = codeJam.io.decomposeInput(input);

    var output = [];

    for (var i = 0; i < 2 * input.n; i += 2) {
        var numberOfParties = input.lines[i];
        var partyMembers = input.lines[i + 1]
            .split(' ')
            .map(Number);

        output.push(
            codeJam.io.composeOutput(i / 2, evacuateSenate(numberOfParties, partyMembers))
        );
    }

    return output
        .join('\n');
}

// codeJam.io.solve('sample.in', 'sample.out', solveProblem);
// codeJam.io.solve('A-small-attempt0.in', 'A-small-attempt0.out', solveProblem);
codeJam.io.solve('A-large.in', 'A-large.out', solveProblem);