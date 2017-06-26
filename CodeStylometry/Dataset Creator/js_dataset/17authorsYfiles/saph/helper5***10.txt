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
    var N = parseInt(numbers[0]);
    var J = parseInt(numbers[1]);
    
    var solvec = [];
    for(var l = 0; l< 2000; l++){
        // Generate Random ones:
        var str = '1';
        for(var k=0;k<N-2;k++){
            str += Math.floor(2*Math.random()).toString();
        }
        str += '1';
        var divstr = '';
        var isJamCoin = true;
        // check in different bases
        for(var j=2;j<=10;j++){
            var n = 0;
            var length = str.length;
            for(var k = 0;k<N;k++){
                if(str[length-k-1]==='1') n = bigInt(n).add(bigInt(j).pow(k));
            }
            var t = testPrime(n);
            if(t==0) isJamCoin = false; else divstr += ' ' + t.toString();
        }
        if(isJamCoin) solvec.push([str, divstr, '\n']);
    }
    // return solvec.sort(function(a,b){return a[0] > b[0];});  // does only work in Firefox, seems to be a bug in chrome...
    var sortedsol = solvec.sort(function(a,b){return a[0].localeCompare(b[0]);});
    
    var solstr = '\n';
    var lastsol = '';
    var count = 0;
    for(var k=0;k < solvec.length;k++){
        if(solvec[k][0] != lastsol) {
            solstr += solvec[k][0] + solvec[k][1] + '\n';
            lastsol = solvec[k][0];
            count++;
        }
        if(count == J) break;
    }
    if(count==J) return solstr; else return 'did not find enough, please try again';
}

function testPrime(n){
    for(var k=2;k<30000;k++){
        if(bigInt(n).mod(k).equals(0)) return k;
    }
    return 0;
}