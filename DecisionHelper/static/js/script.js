import { decisionsJSON } from "./decisionsJSON.js"

console.log(`the cheapy jeep beeps a meep`)

// ************************************************
// POPULATE SELECT OPTIONS FOR DECISIONS
let selectDecision = document.getElementById("choose-decision")
let decisionsLength = decisionsJSON.length
for (let i = 0; i < decisionsLength; i++) {
    let newOption = document.createElement("option")
    newOption.setAttribute("value", i)
    newOption.innerHTML = decisionsJSON[i]["Option"]
    selectDecision.appendChild(newOption)
}
// *************************************************

// This function takes user's selected option and shows the next step or question for them to respond
window.showNextStep = function showNextStep() {
    console.log("You have called the genie of the lamp")
}