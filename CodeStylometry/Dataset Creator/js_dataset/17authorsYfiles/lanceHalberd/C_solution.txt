//run these lines in on any page with jquery in chrome's console
//$('body').html('<textarea name="input" style="width:400px;height:500px;margin-right:20px;"></textarea><textarea name="output" style="width:400px;height:500px"></textarea>');
function parseInput(input) {
    var inputLines = input.split('\n');
    var N = Number(inputLines.shift());
    var result = "";
    for (var caseNumber = 1; caseNumber <= N; caseNumber++) {
        var data = inputLines.shift().split(' ');
        var rows = Number(data[0]);
        var cols = Number(data[1]);
        var mines = Number(data[2]);
        result += "Case #" +  caseNumber + ":\n";
        var board = [];
        for (var i = 0; i< rows; i++) {
            board[i] = [];
            for (var j = 0; j < cols; j++) {
                board[i][j] = '.';
            }
        }
        board[rows - 1][cols - 1] = 'c';
        var openSpaces = rows * cols - mines;
        if (openSpaces > 0 && (openSpaces == 1 || rows == 1 || cols == 1)) {
            //can always solve for only 1 space left or for a linear board
            for (var i = 0; i< rows && mines > 0; i++) {
                for (var j = 0; j < cols && mines > 0; j++) {
                    board[i][j] = '*';
                    mines--;
                }
            }
        } else if (rows == 2 && openSpaces > 2 && openSpaces % 2 == 0) {
            //for a 2xN board, it is solvable if there are an even number of spaces > 2
            //can always solve for only 1 space left or for a linear board
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < mines / 2; j++) {
                    board[i][j] = '*';
                }
            }
        } else if (cols == 2 && openSpaces > 2 && openSpaces % 2 == 0) {
            //for a Nx2 board, it is solvable if there are an even number of spaces > 2
            //can always solve for only 1 space left or for a linear board
            for (var i = 0; i < mines / 2; i++) {
                for (var j = 0; j < 2; j++) {
                    board[i][j] = '*';
                }
            }
        } else if (rows > 2 && cols > 2 && openSpaces > 2 && openSpaces != 3 && openSpaces != 5 && openSpaces != 7) {
            //the general case is solvable unless there are a prime number of spaces open less than 8
            for (var i = 0; i < rows - 2 && mines > 0; i++) {
                for (var j = 0; j < cols - 2 && mines > 0; j++) {
                    if (i == rows - 3 && j == cols -3) {
                        if (mines % 2 == 1){
                            board[i][j] = '*';
                            mines--;
                        }
                    } else {
                        board[i][j] = '*';
                        mines--;
                    }
                }
            }
            for (var i = 0; i < rows - 3 && mines > 0; i++) {
                board[i][cols - 2] = '*';
                board[i][cols - 1] = '*';
                mines -= 2;
            }
            for (var j = 0; j < cols - 3 && mines > 0; j++) {
                board[rows - 2][j] = '*';
                board[rows - 1][j] = '*';
                mines -= 2;
            }
            if (mines > 0) {
                board[rows - 3][cols - 2] = '*';
                board[rows - 3][cols - 1] = '*';
                mines-=2;
            }
            if (mines > 0) {
                board[rows - 2][cols - 3] = '*';
                board[rows - 1][cols - 3] = '*';
                mines-=2;
            }
        } else {
            result += "Impossible\n";
            continue;
        }
        for (var i = 0; i < board.length; i++) {
            result += board[i].join('') + '\n';
        }
    }
    return result;
}

//paste input into textarea then run this line in console
$('[name="output"]').val(parseInput($('[name="input"]').val()));