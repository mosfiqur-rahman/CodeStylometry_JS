function parseData () {
    
    var time = Date.now();
    var solution = '';
    
    var n,m,k,l,row;
    var text = $("code").value;
    var array = text.split(/(?:\r\n|\r|\n)/);
    var params = array[0];
    var T = parseInt(params);
    console.log(T);
    
    for(n=1;n<=T;n++){
        solution += "Case #" + n + ": " + solveInstance(array[n]) + '\n';
    }

    $('ausgabe').value = solution;
    $('time').innerHTML = Date.now()-time +' ms';
}

function solveInstance(str){
    var numbers = str.split(' ');
    var K = parseInt(numbers[0]);
    var C = parseInt(numbers[1]);
    var S = parseInt(numbers[2]);
    
    if(S*C < K) return 'IMPOSSIBLE';
    
    var L = Math.ceil(K/C);
    var solvec = [];
    var a = [];
    for(var k=0;k<L;k++) {
       var a = initArray(Math.min(C,K),k);
       solvec[k]=1;
        for(var l=0; l<Math.min(C,K);l++){
            if(a[l]>=K) break;
            solvec[k] = bigInt(solvec[k]).add(bigInt(K).pow(l).multiply(a[l]));
        }
    }
    return solvec.join(' ');
}

function initArray(N,k){
    var a = [];
    for(var n=0;n<N;n++) {
        a[n]=n + k*N;
    }
    return a;
}

/*

// Is not part of solution, but I needed this for debugging
function testSolution(){
    var time = Date.now();
    var solution = '';
    
    var n,m,k,l,row;
    
    var text = $("code").value;
    var array = text.split(/(?:\r\n|\r|\n)/);
    var params = array[0];
    var T = parseInt(params);
    
    
    var text2 = $("ausgabe").value;
    var array2 = text.split(/(?:\r\n|\r|\n)/);
    
    flag = true;
    for(n=0;n<array2.length;n++){
        var entry = array2[n].split(' ');
        flag = testIndividualSolution(array[n+1], array2[n]);
        if(!flag) break;
    }

    alert(n);
    $('time').innerHTML = Date.now()-time +' ms';
}

function testIndividualSolution(input, sol){
    var numbers = input.split(' ');
    var K = parseInt(numbers[0]);
    var C = parseInt(numbers[1]);
    var S = parseInt(numbers[2]);
    
    var solvec = sol.split(' ');
}
*/