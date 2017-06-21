var currentSize = readInts()[0];

var motes = readInts();

motes.sort(function(a,b){return a-b;});

function solve(currentSize, motes) {
  var numOperations = 0;
  
  while (motes.length > 0 && currentSize > motes[0]) {
    currentSize += motes.shift();
  }

  if (motes.length > 0) {
    // Ok, we're stuck
    var restMotes = motes.length;
    if (currentSize > 1) {
      var operationsIfAdding = solve(currentSize + currentSize -1, motes) + 1;
      if (operationsIfAdding < restMotes) {
        numOperations += operationsIfAdding;
      } else {
        numOperations += restMotes;
      }
    } else {
      numOperations += restMotes;
    }
  }
  return numOperations;   
}

return solve(currentSize, motes);
