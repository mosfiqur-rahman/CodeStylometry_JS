var params = readInts();
var values = readInts();

var maxEnergy = params[0];
var gainAmount = params[1];
if (gainAmount > maxEnergy) gainAmount = maxEnergy;

var maxValues = new Array(values.length);
Arrays.fill(maxValues, function() { return new Array(); });

function getMaxValue(fromIndex, currentEnergy) {
  if (maxValues[fromIndex][currentEnergy] === undefined) {
    if (fromIndex == values.length - 1) {
      maxValues[fromIndex][currentEnergy] = currentEnergy * values[values.length-1];
    } else {
      // Get value if we don't spend anything here
      var minExpense = 0;
      if (currentEnergy + gainAmount > maxEnergy) {
        minExpense = currentEnergy + gainAmount - maxEnergy;
      }
      var maxValue = -1;

      for (var c=minExpense;c<=currentEnergy;c++) {
        var newValue = getMaxValue(fromIndex+1, Math.min(maxEnergy, currentEnergy - c + gainAmount)) + c * values[fromIndex];
        if (newValue > maxValue) maxValue = newValue;
      }
      
      maxValues[fromIndex][currentEnergy] = maxValue;
    }
  }
  return maxValues[fromIndex][currentEnergy];
}
return getMaxValue(0, maxEnergy);
