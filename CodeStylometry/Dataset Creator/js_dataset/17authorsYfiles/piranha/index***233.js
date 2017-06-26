const fs = require('fs');

var argv = process.argv.slice(2);

var input_path, output_path;
if (argv.length === 1 && argv[0].endsWith('.in')) {
  input_path = argv[0];
  output_path = input_path.replace(/in$/,'out');
  
} else if (argv.length > 1) {
  input_path = argv[0];
  output_path = argv[1];
} else {
  console.log('No valid input file.')
  process.exit();
}

console.log(input_path);
console.log(output_path);
fs.readFile(input_path, 'utf8', (err, data) => {
  writeOutput('');
  if (err) throw err;
  // var input = data.split('\n').map((l)=>(l.split(' ').map(Number)));
  var input = data.split('\n').map(Number);
  var case_cnt = input[0]; input.shift();
  var result = [];
  var case_no = 1;
  var case_line = 1;
  while (case_cnt-- > 0) {
    result.push('Case #' + case_no++ + ': ' + process_case(input.splice(0, case_line)));
  }
  writeOutput(result.join('\n'));
});

function process_case(input) {
  input = input[0];
  if (input === 0) return 'INSOMNIA';
  var number_set = new Set();
  var current_num = 0;
  while (number_set.size < 10) {
    current_num += input;
    current_num.toString().split('').forEach((x)=>{number_set.add(x)});
  }
  console.log('->'+current_num);
  return current_num;
}

function writeOutput(text) {
  console.log(text);
  fs.writeFile(output_path, text);
}
