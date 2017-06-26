var size = readInts();
var lawn = [];

for (var c=0;c<size[0];c++) {
  lawn.push(readInts());
}

var maxInRow = [];
for (var c=0;c<size[0];c++) {
  maxInRow[c] = lawn[c][0];
  for (var d=1;d<size[1];d++) {
    if (lawn[c][d] > maxInRow[c]) {
      maxInRow[c] = lawn[c][d];
    }
  }
}

var maxInCol = [];
for (var c=0;c<size[1];c++) {
  maxInCol[c] = lawn[0][c];
  for (var d=1;d<size[0];d++) {
    if (lawn[d][c] > maxInCol[c]) {
      maxInCol[c] = lawn[d][c];
    }
  }
}

log("rows", maxInRow);
log("cols", maxInCol);

var foundError = false;
for (var c=0;c<size[0]&&!foundError;c++) {
  for (var d=0;d<size[1];d++) {
    if (lawn[c][d] < maxInRow[c] && lawn[c][d] < maxInCol[d]) {
      print('NO');
      foundError = true;
      break;
    }
  }
}

if (!foundError) {
  print('YES');
}
