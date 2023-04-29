// Get the form and the save button
var form = document.querySelector("form");
var saveBtn = document.getElementById("saveBtn");

// Get the timePeriod input field
var timePeriodInput = document.getElementById("timePeriod");

// Get the current time period setting from storage (set to 3 days if not present)
chrome.storage.sync.get(["timePeriod"], function(result) {
  timePeriodInput.value = result.timePeriod || 3;
});

// Listen for the form submit event
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the new time period value from the input field
  var newTimePeriod = timePeriodInput.value;

  // Save the new time period setting to storage
  chrome.storage.sync.set({timePeriod: newTimePeriod}, function() {
    console.log("Time period saved:", newTimePeriod);
  });
});

// Send a message to background.js to update the interval variable with
