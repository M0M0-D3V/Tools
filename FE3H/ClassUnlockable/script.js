import {classesKeyedJSON} from "./classesKeyedJSON.js"
import {classesJSON} from "./classesJSON.js"

let selectNames = document.getElementById("class-names")
let classesLength = classesJSON.length

for (let i = 0; i < classesLength; i++) {
    let newOption = document.createElement("option")
    newOption.innerHTML = classesJSON[i]["Class Name"]
    selectNames.appendChild(newOption)
}


const work = () => {
    console.log("yes it works")
}

