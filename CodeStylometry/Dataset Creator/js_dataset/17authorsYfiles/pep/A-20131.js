var board = [];
var foundEmpty = false;

for (var c=0;c<5;c++) {
  var currentLine = readLine();
  if (!foundEmpty) {
    foundEmpty = (currentLine.indexOf('.') > -1);
  }
  board.push(currentLine.split(''));
}

var winner = 0;

function checkLine(x, y, dirX, dirY) {
  var player = board[y][x],
      c=0;
  if (player == '.') {
    return '.';
  }
  while (c<3) {
    x+=dirX;
    y+=dirY;
    if (board[y][x] == '.') return '.';
    if (board[y][x] != player && player != 'T' && board[y][x] != 'T') {
      return '.';
    }
    if (player == 'T') player = board[y][x];
    c++;
  }
  return player;
}

var params = [
  [ 0, 0, 1, 0 ],
  [ 0, 0, 1, 1 ],
  [ 0, 0, 0, 1 ],
  [ 1, 0, 0, 1 ],
  [ 2, 0, 0, 1 ],
  [ 3, 0, 0, 1 ],
  [ 0, 1, 1, 0 ],
  [ 0, 2, 1, 0 ],
  [ 0, 3, 1, 0 ],
  [ 0, 3, 1, -1 ]
  ];

var foundWinner = false;
for (var d=0;d<params.length;d++) {
  var winner = checkLine.apply(this, params[d]);
  if (winner != '.') {
    foundWinner = true;
    print(winner + ' won');
    break;
  }
}
if (!foundWinner) {
  if (foundEmpty) {
    print('Game has not completed');
  } else {
    print('Draw');
  }
}
