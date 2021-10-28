// generate the context menus brought up by clicking the browser action
chrome.storage.sync.get("numHairImages", function(items) {
  var hairCount = items.hasOwnProperty("numHairImages") ? items.numHairImages : 1;
  
  chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    title: hairCountText(hairCount),
    id: "hair_count",
    contexts: ["browser_action"],
    enabled: false
  });
  chrome.contextMenus.create({
    title: "More Sera9 Zit!",
    id: "more_hair",
    contexts: ["browser_action"]
  });
  chrome.contextMenus.create({
    title: "Less Sera9 Zit!",
    id: "less_hair",
    contexts: ["browser_action"]
  });
  chrome.contextMenus.create({
    title: "Msaa7 Sera9 Zit",
    id: "reset_hair",
    contexts: ["browser_action"]
  });
  chrome.contextMenus.create({
    title: "Randomize Sera9 Zit!",
    id: "randomize_hair",
    contexts: ["browser_action"]
  });
  chrome.contextMenus.create({
    title: "(reload after updating)",
    id: "reload_prompt",
    contexts: ["browser_action"],
    enabled: false
  });
});

// handle context menu clicks
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId == "more_hair") incrementNumImages();
  else if (info.menuItemId == "less_hair") decrementNumImages();
  else if (info.menuItemId == "randomize_hair") randomizeHair();
  else if (info.menuItemId == "reset_hair") resetNumImages();
});

// displays count
function hairCountText(num) {
  return "Ser9 zit count: " + num;
}

// general function for updating the hair count
function updateNumImages(updateFunction) {
  chrome.storage.sync.get("numHairImages", function(items) {
    var numHairImages;
    if (items.hasOwnProperty("numHairImages")) {
      numHairImages = updateFunction(items.numHairImages);
    }
    else {
      numHairImages = updateFunction(1);
    }
    
    chrome.storage.sync.set( {"numHairImages": numHairImages } );
    
    chrome.contextMenus.update("hair_count", { title: hairCountText(numHairImages) });
  });
}

// increment count
function incrementNumImages() {
  updateNumImages(function(num) {
    return num + 1;
  });
}

// decrement count
function decrementNumImages() {
  updateNumImages(function(num) {
    return Math.max(0, num-1);
  });
}

// reset count to 1
function resetNumImages() {
  updateNumImages( function() { return 1; } );
}

// randomize positions
function randomizeHair() {
  chrome.storage.sync.set( { "hairImages": [] } );
}