//run these lines in on any page with jquery in chrome's console
//$('body').html('<textarea name="input" style="width:400px;height:500px;margin-right:20px;"></textarea><textarea name="output" style="width:400px;height:500px"></textarea>');

function parseInput(input) {
    var inputLines = input.split('\n');
    var N = Number(inputLines.shift());
    var result = "";
    for (var caseNumber = 1; caseNumber <= N; caseNumber++) {
        var data = inputLines.shift().split(' ');
        var costOfFarm = Number(data[0]);
        var farmBoost = Number(data[1]);
        var target = Number(data[2]);
        var currentTime = 0;
        var currentCookiesPerSecond = 2;
        bestTime = target;
        while (true) {
            var timeToFinish = currentTime + target / currentCookiesPerSecond;
            bestTime = Math.min(timeToFinish, bestTime);
            currentTime += costOfFarm / currentCookiesPerSecond;
            if (currentTime >= bestTime) {
                break;
            }
            currentCookiesPerSecond += farmBoost;
        }
        result += "Case #" +  caseNumber + ": " + bestTime + "\n";
    }
    return result;
}

//paste input into textarea then run this line in console
$('[name="output"]').val(parseInput($('[name="input"]').val()));