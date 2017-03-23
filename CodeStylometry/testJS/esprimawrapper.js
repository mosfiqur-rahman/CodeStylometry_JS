const esprima = require('esprima');
const util = require('util');
var ast = esprima.parse(process.argv[2], { comment: true, tolerant: true });
console.log(util.inspect(ast, false, null));