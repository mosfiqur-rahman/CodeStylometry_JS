var params = readStrings();

var currentPaint = new BigInteger(params[1]);
var currentRadius = new BigInteger(params[0]).add(BigInteger.ONE);
var numberCircles = 0;
var finished = false;
var TWO = new BigInteger(2);

while (!finished) {
  var neededPaint = currentRadius.shiftLeft(1).subtract(BigInteger.ONE);
  if (neededPaint.compareTo(currentPaint) <= 0) {
    numberCircles++;
    currentPaint = currentPaint.subtract(neededPaint);
    currentRadius = currentRadius.add(TWO);
  } else {
    finished = true;
  }
}

return numberCircles;
