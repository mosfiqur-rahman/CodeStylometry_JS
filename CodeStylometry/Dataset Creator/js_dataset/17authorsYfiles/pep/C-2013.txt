var interval = readInts();
function isPalindrome(target) {
  var length = target.length;
  var halfLength = Math.floor(length/2);
  var index = 0;
  while (index < halfLength) {
    if (target[index] != target[length-index-1]) return false;
    index++;
  }
  return true;
}

function isSquare(num) {
  var square = Math.sqrt(num);
  if (square == Math.floor(square)) {
    return isPalindrome(square.toString());
  }
}

var total = 0;
for (var c=interval[0];c<=interval[1];c++) {
  if (isPalindrome(c.toString()) && isSquare(c)) {
    total++;
  }
}
print(total);
