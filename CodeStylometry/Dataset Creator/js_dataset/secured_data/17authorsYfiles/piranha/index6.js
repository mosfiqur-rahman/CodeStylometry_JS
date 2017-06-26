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

fs.readFile(input_path, 'utf8', (err, data) => {
  if (err) throw err;
  // var input = data.split('\n').map((l)=>(l.split(' ').map(Number)));
  var input = data.split('\n');
  var case_cnt = Number(input[0]); input.shift();
  var result = [];
  var case_no = 0;
  var case_line = 1;
  while (case_no++ < case_cnt) {
    result.push('Case #' + case_no + ': ' + process_case(input.splice(0, case_line)));
  }
  fs.writeFile(output_path, result.join('\n'));
});

function process_case(input) {
  var result = 0;
  input = input[0].replace(/\++$/,'');
  while (input.length > 0) {
    // Loop removing
    result++;
    input = input.replace(/\-+$/,'');
    if (input.length > 0) {
      result++;
      input = input.replace(/\++$/,'');
    }
  }
  return result;
}