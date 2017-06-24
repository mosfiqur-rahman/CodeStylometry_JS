var SIZE= 100;
var matrix = Arrays.create(SIZE, SIZE);
Arrays.fill(matrix, false);

var MID = SIZE/2;

var params = readInts();

var totalDiamonds = params[0];

var desiredX = params[1] + MID;
var desiredY = params[2];
log("desired", desiredX, desiredY);
function cloneArray(target) {
  var newArray = [];
  for (var c=0;c<target.length;c++) {
    newArray.push(target[c].slice(0));
  }

  return newArray;
}

function placeDiamond(totalDiamonds, matrix, unstableX, unstableY) {
  if (unstableX !== null) {
    if (unstableY < 1 || (matrix[unstableY-1][unstableX-1] && matrix[unstableY-1][unstableX+1])) {
      // We're stable
      matrix[unstableY][unstableX] = true;
      totalDiamonds--;
      if (unstableX == desiredX && unstableY == desiredY) {
        return 1;
      } else if (totalDiamonds > 0) {
        return placeDiamond(totalDiamonds, matrix, null, null);
      } else {
        return 0;
      }
    } else if (matrix[unstableY-1][unstableX-1]) {
      return placeDiamond(totalDiamonds, matrix, unstableX+1, unstableY-1);
    } else if (matrix[unstableY-1][unstableX+1]) {
      return placeDiamond(totalDiamonds, matrix, unstableX-1, unstableY-1);
    } else {

var leftValue = placeDiamond(totalDiamonds, cloneArray(matrix), unstableX+1, unstableY-1);
var rightValue = placeDiamond(totalDiamonds, cloneArray(matrix), unstableX-1, unstableY-1);
      return((leftValue+rightValue)/2);
    }
  } else {
    var currentTop = 0;
    while (matrix[currentTop][MID]) {
      currentTop+=2;
    }
    return placeDiamond(totalDiamonds, matrix, MID, currentTop);
  }
}


return placeDiamond(totalDiamonds, matrix, null, null);


