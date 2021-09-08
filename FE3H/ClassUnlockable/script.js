import {classesKeyedJSON} from "./classesKeyedJSON.js"
import {classesJSON} from "./classesJSON.js"

console.log("you rang boss?")

let selectNames = document.getElementById("class-names")
let classesLength = classesJSON.length

for (let i = 0; i < classesLength; i++) {
    let newOption = document.createElement("option")
    newOption.innerHTML = classesJSON[i]["Class Name"]
    selectNames.appendChild(newOption)
}


window.work = function work() {
    console.log("yes it works")
}

window.showClass = function showClass() {
    console.log("triggered")
}