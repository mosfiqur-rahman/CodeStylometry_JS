//run these lines in on any page with jquery in chrome's console
//$('body').html('<textarea name="input" style="width:400px;height:500px;margin-right:20px;"></textarea><textarea name="output" style="width:400px;height:500px"></textarea>');
function parseInput(input) {
    var inputLines = input.split('\n');
    var N = Number(inputLines.shift());
    var result = "";
    for (var caseNumber = 1; caseNumber <= N; caseNumber++) {
        var blocks = Number(inputLines.shift());
        var herBlocks = inputLines.shift().split(' ');
        for (var i = 0; i < herBlocks.length; i++) {
            herBlocks[i] = Number(herBlocks[i]);
        }
        herBlocks.sort(function(a,b){return b-a});
        var hisBlocks = inputLines.shift().split(' ');
        for (var i = 0; i < herBlocks.length; i++) {
            hisBlocks[i] = Number(hisBlocks[i]);
        }
        hisBlocks.sort(function(a,b){return b-a});
        var order = [];
        while (hisBlocks.length > 0 && herBlocks.length > 0) {
            if (hisBlocks[0] > herBlocks[0]) {
                order.push('K');
                hisBlocks.shift();
            } else {
                order.push('N');
                herBlocks.shift();
            }
        }
        while (hisBlocks.length > 0) {
            order.push('K');
            hisBlocks.shift();
        }
        while (herBlocks.length > 0) {
            order.push('N');
            herBlocks.shift();
        }
        var warOrder = order.slice(0);
        var warScore = 0;
        while (warOrder.length > 0) {
            if (warOrder.shift() == 'N') {
                warScore++;
                warOrder.splice(warOrder.lastIndexOf('K'), 1);
            } else {
                warOrder.splice(warOrder.indexOf('N'), 1);
            }
        }
        var deceitfulOrder = order.slice(0);
        var deceitfulScore = 0;
        while (deceitfulOrder.length > 0) {
            if (deceitfulOrder.pop() == 'N') {
                //Always optimal to sacrifice her losing piece to remove his best piece
                deceitfulOrder.splice(deceitfulOrder.indexOf('K'), 1);
            } else {
                //If he has a losing piece, she can score a point using her worst piece
                deceitfulScore++;
                deceitfulOrder.splice(deceitfulOrder.lastIndexOf('N'), 1);
            }
        }
        result += "Case #" +  caseNumber + ": " + deceitfulScore + " " + warScore + "\n";
    }
    return result;
}

//paste input into textarea then run this line in console
$('[name="output"]').val(parseInput($('[name="input"]').val()));