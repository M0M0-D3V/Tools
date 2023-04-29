// Save timePeriod setting when save button is clicked
var save

// Get default time period from storage (set to 3 days if not present)
chrome.storage.sync.get(["timePeriod"], function(result) {
    var timePeriodInput = document.getElementById("timePeriod");
    timePeriodInput.value = result.timePeriod || 3;
    var timePeriod = result.timePeriod || 3;
    var closedTabs = [];
  
    chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        var lastAccessed = new Date(tab.lastAccessed);
        var now = new Date();
        var diff = now - lastAccessed;
        var diffInDays = diff / (1000 * 60 * 60 * 24); // convert milliseconds to days
        if (diffInDays > timePeriod) { // close tabs that haven't been accessed in "timePeriod" days
          closedTabs.push({
            url: tab.url,
            title: tab.title,
            lastAccessed: lastAccessed.toISOString()
          }); // add closed tab data to array
          chrome.tabs.remove(tab.id);
        }
      }
  
      // Save closed tabs to history
      chrome.history.addUrl({
        url: "data:text/plain," + encodeURIComponent(JSON.stringify(closedTabs)),
        title: "Closed Tabs"
      });
    });
  });
  
  // Listen for changes to time period setting
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === "sync" && changes.timePeriod) {
      var timePeriod = changes.timePeriod.newValue;
      console.log("Time period changed to", timePeriod);
    }
  });
  
