document.addEventListener("DOMContentLoaded", function() {
    var saveButton = document.getElementById("saveButton");
    var daysInput = document.getElementById("daysInput");
  
    saveButton.addEventListener("click", function() {
      var timePeriod = parseInt(daysInput.value);
      chrome.storage.sync.set({ timePeriod: timePeriod }, function() {
        console.log("Time period saved:", timePeriod);
        window.close();
      });
    });
  });
  