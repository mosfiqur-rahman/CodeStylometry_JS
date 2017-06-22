$ = function (element){
    return document.getElementById(element);
}
        
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
    var str2 = str + '+';
    var sol = 0;
    for(var n=1;n<str2.length;n++){
        if(str2[n] != str2[n-1]) sol++;
    }
    return sol;
}

