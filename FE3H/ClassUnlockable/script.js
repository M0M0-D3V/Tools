import {classesKeyedJSON} from "./classesKeyedJSON.js"
import {classesJSON} from "./classesJSON.js"

console.log("you rang boss?")

// POPULATE THE SELECT OPTIONS WITH CLASS NAMES
let selectNames = document.getElementById("class-names")
let classesLength = classesJSON.length

for (let i = 0; i < classesLength; i++) {
    let newOption = document.createElement("option")
    newOption.setAttribute("value", i)
    newOption.innerHTML = classesJSON[i]["Class Name"]
    selectNames.appendChild(newOption)
}
// END POPULATE

window.work = function work() {
    console.log("yes it works")
}

window.showClass = function showClass() {
    let selected = document.getElementById("class-names").selectedIndex;
    let idNum = document.getElementsByTagName("option")[selected].value
    let displayClass = document.getElementById("displayClass")
    let thisClass = classesJSON[idNum]
    displayClass.innerHTML = "<h5>Class Name:</h5>"
    displayClass.innerHTML += `<p>${thisClass["Class Name"]}</p>`

    displayClass.innerHTML += "<h5>Certification:</h5>"
    displayClass.innerHTML += `<p>${thisClass["Certification"]}</p>`

    displayClass.innerHTML += "<h5>Level Seal:</h5>"
    displayClass.innerHTML += `<p>${thisClass["Level Seal"]}</p>`

    displayClass.innerHTML += "<h5>Proficiency:</h5>"
    displayClass.innerHTML += `<p>${thisClass["Proficiency"]}</p>`
    
    displayClass.innerHTML += "<h5>Abilities:</h5>"
    displayClass.innerHTML += `<p>${thisClass["Abilities"]}</p>`
    
    displayClass.innerHTML += "<h5>Mastery Abilities:</h5>"
    displayClass.innerHTML += `<p>${thisClass["Mastery Abilities"]}</p>`
    
    displayClass.innerHTML += "<h5>Specific:</h5>"
    displayClass.innerHTML += `<p>${thisClass["Specific"]}</p>`
}