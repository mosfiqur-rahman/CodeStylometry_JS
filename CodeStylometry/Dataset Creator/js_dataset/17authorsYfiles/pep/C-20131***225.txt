var interval = readInts();

var total = 0;
var foundLarger = false;

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

function checkNumber(pal) {
  var palNum = parseInt(pal, 10);
  var square = palNum*palNum;
  if (square > interval[1]) {
    foundLarger = true;
  } else if (isPalindrome(""+square) && square >= interval[0]) {
    total++;
  }
}

var currentPoint = Math.sqrt(interval[0]);
if (currentPoint != Math.floor(currentPoint)) {
  currentPoint = Math.floor(currentPoint) + 1;
}
var currentPointString = "" + currentPoint;
var currentLength = currentPointString.length;

var oddCycle = ((currentLength / 2) != Math.floor(currentLength / 2));
currentLength = Math.floor(currentLength/2);

if (currentLength === 0) {
  for (var c=0;c<10&&!foundLarger;c++) {
    checkNumber("" + c);
  }
  
  currentLength = 1;
  oddCycle = false;
}
while (!foundLarger) {
  var limit = Math.pow(10, currentLength);
  var current = Math.pow(10, currentLength-1);
  
  while (current < limit && !foundLarger) {
    var prefix = "" + current;
    var suffix = prefix.split("").reverse().join("");
    if (oddCycle) {
      for (var c=0;c<10&&!foundLarger;c++) {
        checkNumber(prefix + c + suffix);
      }
    } else {
        checkNumber(prefix + suffix);
    }
    
    current++;
  }
  
  if (oddCycle) {
    oddCycle = false;
    currentLength += 1;
  } else {
    oddCycle = true;
  }
}

print(total);
