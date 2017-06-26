function parseData () {
    
    var time = Date.now();
    var solution = '';
    
    var n,m,k,l,row;
    var text = $("code").value;
    var array = text.split(/(?:\r\n|\r|\n)/);
    var numberOfCases = array[0];
    var T = parseInt(numberOfCases);
    console.log(T);
    
    for(n=1;n<=2*T;n=n+2){
        solution += "Case #" + ((n+1)/2) + ": " + solveInstance(parseInt(array[n]), array[n+1]) + '\n';
    }

    $('ausgabe').value = solution;
    $('time').innerHTML = Date.now()-time +' ms';
}

function solveInstance(N, str){
    var n,m,k,l;
    var sol = '';
    var solvec = [];
    
    var list = str.split(' ');
    var listA = [];
    
    for(n=0;n<list.length;n++) {
        list[n] = parseInt(list[n]);
        listA[n] = convert[n];
    }

    sol = solveList(list, listA);
    
    return sol;
}

function solveList(list, listA) {
    if(list.length === 2) {
        var sol = '';
        for(var n=0;n<list[0];n++) {
            sol += listA[0]+listA[1]+' ';
        }
        return sol;
    } else {
        var sol = '';
        var m = findMax(list);
        sol += listA[m] + ' ';
        list[m]--;
        if(list[m]===0) {
            list.splice(m, 1);
            listA.splice(m, 1);
        }
        return sol + solveList(list, listA);
    }
}

function findMax(list) {
    var m = 0;
    for(var n=0;n<list.length;n++) {
        if(list[n]>list[m]) m=n; 
    }
    return m
}

var convert = {
  '0': 'A',
  '1': 'B',
  '2': 'C',
  '3': 'D',
  '4': 'E',
  '5': 'F',
  '6': 'G',
  '7': 'H',
  '8': 'I',
  '9': 'J',
  '10': 'K',
  '11': 'L',
  '12': 'M',
  '13': 'N',
  '14': 'O',
  '15': 'P',
  '16': 'Q',
  '17': 'R',
  '18': 'S',
  '19': 'T',
  '20': 'U',
  '21': 'V',
  '22': 'W',
  '23': 'X',
  '24': 'Y',
  '25': 'Z',
};