
var fs = require('fs'),
    filePath = process.argv[2],
    contentLines = fs.readFileSync(filePath,'utf-8').split('\n').filter(String).slice(1);

var o = function(num, output) {
  console.log("Case #" +  num + ": " + output);
};

var test = function(num, arr) {
  while(num>0){
    var a = num%10;
    if(arr.indexOf(a)>-1){
      arr.splice(arr.indexOf(a),1);
    }
    num = Math.floor(num/10);
  }
  return arr;
};

contentLines.forEach(function(N,idx){
  N = +N;
  if(N===0) o(idx+1, "INSOMNIA");
  else {
    var all = [0,1,2,3,4,5,6,7,8,9], total=0;
    while(all.length>0){
      total += N;
      all = test(total, all);
    }
    o(idx+1, total);
  }
});
