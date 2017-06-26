function parseData () {
    
    var time = Date.now();
    var solution = '';
    
    var n,m,k,l,row;
    var text = $("code").value;
    var array = text.split(/(?:\r\n|\r|\n)/);
    var numberOfCases = array[0];
    var T = parseInt(numberOfCases);
    console.log(T);
    
    for(n=1;n<=T;n++){
        solution += "Case #" + n + ": " + solveInstance(array[n]) + '\n';
    }

    $('ausgabe').value = solution;
    $('time').innerHTML = Date.now()-time +' ms';
}

function solveInstance(str){
    var n,m,k,l;
    var sol = '';
    var solvec = [];
    
    var object = {};
    
    // count the number of letters
    for(n=0;n<str.length;n++) {
        if(object[str[n]]) {
            object[str[n]]++;
        } else {
            object[str[n]] = 1;
        }
    }
    
    var numbers = zeros(10);

    numbers[0] = object['Z'] || 0;
    numbers[2] = object['W'] || 0;
    numbers[4] = object['U'] || 0;
    numbers[6] = object['X'] || 0;
    numbers[8] = object['G'] || 0;
    numbers[3] = (object['H'] || 0) - numbers[8];
    numbers[7] = (object['S'] || 0) - numbers[6];
    numbers[5] = (object['V'] || 0) - numbers[7];
    numbers[1] = (object['O'] || 0) - numbers[0]- numbers[2]- numbers[4];
    numbers[9] = ((object['N'] || 0) -numbers[1]-numbers[7])/2;
    
    for(n = 0;n<numbers.length;n++) {
        while(numbers[n] > 0) {
            sol += n.toString();
            numbers[n]--;
        }
    }
    
    return sol;
}