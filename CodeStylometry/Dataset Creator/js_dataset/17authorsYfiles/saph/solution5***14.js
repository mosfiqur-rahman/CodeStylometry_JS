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
        solution += "Case #" + n + ": " + solveInstance(array[n]);
    }

    $('ausgabe').value = solution;
    $('time').innerHTML = Date.now()-time +' ms';
}

function solveInstance(str){
    var n,m,k,l;
    var sol = 0;
    var solvec = [];

    var list = str.split(' ');
    var B = parseInt(list[0]);
    var M = parseInt(list[1]);
    
    if(Math.pow(2,B-2)<M) return 'IMPOSSIBLE\n';
    
    var solmat = createMatrix(B);
    
    var solline = '0';
    if(B===2) {solline = '01';} else {
        k = Math.pow(2,B-3);
        while(k >= 1) {
            if(M >= k) {
                M = M-k;
                solline += '1';
            } else {
                solline += '0';
            }
            k = k/2;
        }
        if(M === 0){ 
            solline += '0'} 
        else {
            solline += '1';
        }
    }

    return 'POSSIBLE\n' + solline + '\n' + solmat;
}

function createMatrix(B) {
    var n,m,k,l;
    var mat = '';
    for(n=1;n<B;n++){
        for(m=0;m<B;m++){
            if(m>n) mat += '1'; else mat += '0';
        }
        mat += '\n';
    }
    return mat;
}