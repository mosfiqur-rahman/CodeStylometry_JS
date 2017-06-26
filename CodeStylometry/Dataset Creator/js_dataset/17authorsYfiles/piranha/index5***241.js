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
  
  while (case_no++ < case_cnt) {
    var case_line = 2;
    result.push('Case #' + case_no + ': ' + process_case(input.splice(0, case_line)));
  }
  fs.writeFile(output_path, result.join('\n'));
});

function process_case(input) {
  var N = +input[0];
  input = input[1].split(' ').map(Number);
  var result = [];
  while (input.some((x)=>(x>0))) {
    //find max
    var max = Math.max.apply(null,input);
    var first = input.indexOf(max);
    input[first]--;
    var second = input.indexOf(max);
    if (second > 0 && sum(input) !== 2) {
      result.push(String.fromCharCode(65+first)+String.fromCharCode(65+second));
      input[second]--;
    } else {
      result.push(String.fromCharCode(65+first));
    }
  }
  return result.join(' ');
}

function sum(ary) {
  return ary.reduce((a, b) => a + b, 0);
}