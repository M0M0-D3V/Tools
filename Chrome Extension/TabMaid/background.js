// Set the initial interval to 3 days (259200000 milliseconds)
var interval = 259200000;

// Listen for messages from options.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === "updateInterval") {
    // Update the interval variable with the new value
    interval = message.interval;

    // Send a response to confirm that the interval has been updated
    sendResponse({status: "intervalUpdated"});
  }
});

// Define a function to close unused tabs
function closeUnusedTabs() {
  // Get the timePeriod setting from storage (set to 3 days if not present)
  chrome.storage.sync.get(["timePeriod"], function(result) {
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
}

// Call closeUnusedTabs() on an interval defined by the interval variable
setInterval(closeUnusedTabs, interval);

