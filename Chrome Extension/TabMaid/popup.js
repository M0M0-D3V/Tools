document.addEventListener("DOMContentLoaded", () => {
  var saveButton = document.getElementById("save");
  var numberInput = document.getElementById("numberInput");

  saveButton.addEventListener("click", () => {
    var timePeriod = parseInt(numberInput.value);
    chrome.storage.sync.set({ timePeriod: timePeriod }, () => {
      console.log(`Time period saved: ${timePeriod}`);
      window.close();
    });
  });
});

function validateForm() {
  var radios = document.getElementsByName("gender");
  var formValid = false;

  var i = 0;
  while (!formValid && i < radios.length) {
    if (radios[i].checked) {
      formValid = true;
      var selectedValue = radios[i].value;
    }
    i++;
  }

  if (!formValid) alert("Must check some option!");
  return formValid;
}
