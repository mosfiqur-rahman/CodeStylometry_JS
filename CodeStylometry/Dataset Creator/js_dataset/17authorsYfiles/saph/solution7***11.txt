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
    var sol = 0;
    var solvec = [];
    
    var list = str.split(' ');
    var J = parseInt(list[0]);
    var P = parseInt(list[1]);
    var S = parseInt(list[2]);
    var K = parseInt(list[3]);
    
    solstr = '';
    
    for(n=0;n<J;n++){
        for(m=0;m<P;m++){
            for(k=0;k<Math.min(S,K);k++){
                solstr += '\n' + (n+1) + ' ' + (m+1) + ' ' + ((k+m+n)%S+1);
                sol++;
            }
        }
    }

    return sol + solstr;
}