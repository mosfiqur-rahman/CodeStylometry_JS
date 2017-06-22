#!/usr/bin/node

var fs = require ('fs');

fs.readFile (process.argv[2], 'utf8', function (err, data) {
  if (err) throw err;

  var lines = data.split ('\n');
  var problems = parseInt (lines.shift (), 10);

  for (var i = 0; i < problems; ++i) {
    solve(lines.shift(), lines.shift(), i + 1);
  }
});

var Nums = function(){
  this.nums = [];
  this.maxNum = 0;
};
Nums.prototype.add = function(pancakeNum) {
  if (!(pancakeNum in this.nums)) {
    this.nums[pancakeNum] = 0;
  }
  this.nums[pancakeNum]++;
}
Nums.prototype.remove = function(from, amount) {
  this.nums[from]--;
  this.add(amount);
  this.add(from - amount);
}
Nums.prototype.cl = function(nums1) {
  this.nums = nums1.nums.slice(0);
  this.maxNum = nums1.maxNum;
}

function solve(line1, line2, caseNumber) {
  var eaterNum = parseInt(line1);
  var pancakes = line2.split(' ');

  nums = new Nums();
  for (var i = 0; i < eaterNum; i++) {
    pancakes[i] = parseInt(pancakes[i]);
    nums.add(pancakes[i]);
    if (pancakes[i] > nums.maxNum) nums.maxNum = pancakes[i];
  }
  var minutes = calculate2(nums);
  console.log("Case #" +  caseNumber + ": " + minutes);
}
function calculate2(nums) {
  var minSoFar = nums.maxNum;
  var targetHeight = nums.maxNum;
  for (var targetHeight = nums.maxNum; targetHeight >= 2 ; targetHeight--) {
    var minutes = calculate(nums, targetHeight, minSoFar);
    if (minutes < minSoFar) minSoFar = minutes;
  }
  return minSoFar;
}
function calculate(n, targetHeight, minSoFar) {
  var c = targetHeight;
  for (var i = n.maxNum; i > targetHeight; i--) {
    if (i in n.nums) {
      c += (Math.ceil(i / targetHeight) - 1) * n.nums[i];
      if (c > minSoFar) {
        return c;
      }
    }
  }
  return c;
}

