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
  var input = data.split('\n').map((l)=>(l.split(' ').map(Number)));
  // var input = data.split('\n');
  var case_cnt = Number(input[0]); input.shift();
  var result = [];
  var case_no = 0;
  var case_line = 1;
  while (case_no++ < case_cnt) {
    result.push('Case #' + case_no + ':\n' + process_case(input.splice(0, case_line)));
  }
  fs.writeFile(output_path, result.join('\n'));
});

function process_case(input) {
  var N = input[0][0], J = input[0][1];
  var result = [];
  var max = Math.pow(2,N-2);
  for (var i = 0; i < max && J > 0; i++) {
    var mid = i.toString(2);
    var isCoinJam = true;
    var num_text = '1' + '0'.repeat(N-2-mid.length) + mid + '1';
    var factors = [num_text];
    for (var base = 2; base <= 10 && isCoinJam; base++) {
      var n = parseInt(num_text, base);
      var factor = leastFactor(n);
      if (n===factor) {
        isCoinJam = false;
      } else {
        factors.push(factor);
      }
    }
    if (isCoinJam) {
      result.push(factors.join(' '));
      J--;
    }
  }
  console.log(result);
  return result.join('\n');
}

// leastFactor(n)
// returns the smallest prime that divides n
//     NaN if n is NaN or Infinity
//      0  if n=0
//      1  if n=1, n=-1, or n is not an integer

function leastFactor(n) {
 if (isNaN(n) || !isFinite(n)) return NaN;
 if (n==0) return 0;
 if (n%1 || n*n<2) return 1;
 if (n%2==0) return 2;
 if (n%3==0) return 3;
 if (n%5==0) return 5;
 var m = Math.sqrt(n);
 for (var i=7;i<=m;i+=30) {
  if (n%i==0)      return i;
  if (n%(i+4)==0)  return i+4;
  if (n%(i+6)==0)  return i+6;
  if (n%(i+10)==0) return i+10;
  if (n%(i+12)==0) return i+12;
  if (n%(i+16)==0) return i+16;
  if (n%(i+22)==0) return i+22;
  if (n%(i+24)==0) return i+24;
 }
 return n;
}