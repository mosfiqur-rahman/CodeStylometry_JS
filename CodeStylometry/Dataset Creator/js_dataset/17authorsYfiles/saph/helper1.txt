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
        solution += "Case #" + n + ": " + solveInstance(parseInt(array[n])) + '\n';
    }

    $('ausgabe').value = solution;
    $('time').innerHTML = Date.now()-time +' ms';
}

function solveInstance(n){
    if(n===0) return 'INSOMNIA';
    
    var array = initArray();
    var m = 0;
    var str;
    do {
        m = m + n;
        str = m.toString();
        for(var k=0;k<str.length;k++){
            array[parseInt(str[k])] = true;
        }
    } while(!isComplete(array))
    return m;
}

function initArray(){
    var array = [];
    for(var k=0;k<10;k++){
        array[k]=false;
    }
    return array;
}

function isComplete(array) {
    for(var k=0;k<array.length;k++){
        if(array[k] === false) return false;
    }
    return true;
}