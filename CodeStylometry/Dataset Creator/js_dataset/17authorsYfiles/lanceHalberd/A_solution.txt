//run these lines in on any page with jquery in chrome's console
$('body').html('<textarea name="input" style="width:400px;height:500px;margin-right:20px;"></textarea><textarea name="output" style="width:400px;height:500px"></textarea>');

function parseInput(input) {
    var inputLines = input.split('\n');
    var N = Number(inputLines.shift());
    var result = "";
    for (var caseNumber = 1; caseNumber <= N; caseNumber++) {
        var row = Number(inputLines.shift()) - 1;
        var choices = [];
        for (var i = 0; i < 4; i++) {
            var rowOfCards = inputLines.shift().split(' ');
            if (row == i) {
                choices = rowOfCards;
            }
        }
        row = Number(inputLines.shift()) - 1;
        for (var i = 0; i < 4; i++) {
            var rowOfCards = inputLines.shift().split(' ');
            if (row == i) {
                choices = choices.filter(function(n) {
                    return rowOfCards.indexOf(n) != -1
                });
            }
        }
        var response;
        if (choices.length == 0) {
            response = 'Volunteer cheated!';
        } else if (choices.length > 1) {
            response = 'Bad magician!';
        } else {
            response = choices[0];
        }
        result += "Case #" +  caseNumber + ": " + response + "\n";
    }
    return result;
}

//paste input into textarea then run this line in console
$('[name="output"]').val(parseInput($('[name="input"]').val()));