var params = readInts();
var totalChests = params[1];
var initialKeyTypes = readInts();
var keyTypes = [];
var roomKeyTypes = [];
var roomTypes = [];
for (var c=0;c<=200;c++) {
  keyTypes[c] = 0;
  roomTypes[c] = 0;
  roomKeyTypes[c] = 0;
}
for (var c=0;c<initialKeyTypes.length;c++) {
  keyTypes[initialKeyTypes[c]]++;
}

var chests = [];
var openedChest = [];
for (var c=0;c<totalChests;c++) {
  var newChest = {},
      newChestData = readInts();
  newChest.type = newChestData.shift();
  newChestData.shift();
  newChest.keys = newChestData;
  chests.push(newChest);
  openedChest.push(false);
  for (var d=0;d<newChestData.length;d++) {
    roomKeyTypes[newChestData[d]]++;
  }
  roomTypes[newChest.type]++;
}

var failedStates = {};

function checkChest(index) {
  var failedKey = openedChest.join(",");
  if (failedStates[failedKey]) return null;
  
  var currentChest = chests[index];
  if (keyTypes[currentChest.type] < 1) return null;
  openedChest[index] = true;
  keyTypes[currentChest.type]--;
  for (var c=0;c<currentChest.keys.length;c++) {
    keyTypes[currentChest.keys[c]]++;
  }
  
  failedKey = openedChest.join(",");
  
  if (!failedStates[failedKey]) {
    var failedOnce = false;
    for (var d=0;d<chests.length;d++) {
      if (!openedChest[d]) {
        var result = checkChest(d);
        if (result !== null) {
          result.unshift(index+1);
          return result;
        } else {
          failedOnce = true;
        }
      }
    }
    
    if (!failedOnce) {
      return [ index+1 ];
    }
  }
  failedStates[failedKey] = true;
  
  // Revert
  keyTypes[currentChest.type]++;
  for (var e=0;e<currentChest.keys.length;e++) {
    keyTypes[currentChest.keys[e]]--;
  }
  openedChest[index] = false;
  return null;
}



var foundResult = false;

for (var f=0;f<200;f++) {
  if (roomTypes[f] > (roomKeyTypes[f] + keyTypes[f])) {
    log(f, roomTypes[f], roomKeyTypes[f], keyTypes[f]);
    print("IMPOSSIBLE");
    foundResult = true;
    break;
  }
}

if (!foundResult) {
  for (var d=0;d<chests.length;d++) {
    log("cycle " + d);
    if (!chests[d].opened) {
      var result = checkChest(d);
      if (result !== null) {
        foundResult = true;
        print(result);
        break;
      }
    }
  }
}

if (!foundResult) {
  print("IMPOSSIBLE");
}
