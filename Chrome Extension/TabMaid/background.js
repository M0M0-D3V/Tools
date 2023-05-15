// Global decloaration of timePeriod
var timePeriod = 3 * (1000 * 60); // 3 minutes

// Global list of Closed Tabs
var closedTabs = [];

// Close tabs that hven't been accessed in [timePeriod] days
const closeTabs = () => {
  chrome.tabs.query({}, (tabs) => {
    for (let i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      console.log(tab);
      var lastAccessed = new Date(tab.lastAccessed);
      var now = new Date();
      var diff = now - lastAccessed;
      var diffInMinutes = diff / (1000* 60);

      if (diffInMinutes > timePeriod) {
        closedTabs.push({
          url: tab.url,
          title: tab.title,
          lastAccessed: lastAccessed.toISOString(),
        });
        
      }
    }
  });
};

// Get default time period from storage (set to 3 days if not present)
chrome.storage.sync.get(["timePeriod"], function (result) {
  var timePeriod = result.timePeriod || 3;
  var closedTabs = [];

  // Close tabs that haven't been accessed in "timePeriod" minutes
  function closerTabs() {
    chrome.tabs.query({}, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        var lastAccessed = new Date(tab.lastAccessed);
        var now = new Date();
        var diff = now - lastAccessed;
        var diffInMinutes = diff / (1000 * 60); // convert milliseconds to minutes
        if (diffInMinutes > timePeriod) {
          closedTabs.push({
            url: tab.url,
            title: tab.title,
            lastAccessed: lastAccessed.toISOString(),
          });
          chrome.tabs.remove(tab.id);
        }
      }

      // Save closed tabs to history
      chrome.history.addUrl({
        url:
          "data:text/plain," + encodeURIComponent(JSON.stringify(closedTabs)),
        title: "Closed Tabs",
      });

      // Clear the closedTabs array after the tabs have been closed and saved to history
      closedTabs = [];
    });
  }

  // Close tabs immediately when the extension is first installed or updated
  closeTabs();

  // Close tabs every "timePeriod" minutes
  setInterval(closeTabs, timePeriod * 60 * 1000);
});

// Listen for changes to time period setting
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === "sync" && changes.timePeriod) {
    var timePeriod = changes.timePeriod.newValue;
    console.log("Time period changed to", timePeriod);
  }
});
