import {classesKeyedJSON} from "./classesKeyedJSON.js"
import {classesJSON} from "./classesJSON.js"

const levelIndex = {
    "E": 0,
    "E+": 1,
    "D": 2,
    "D+": 3,
    "C": 4,
    "C+": 5,
    "B": 6,
    "B+": 7,
    "A": 8,
    "A+": 9,
    "S": 10
}

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
// POPULATE STAT LIST AS OPTIONS
let selectStats = document.getElementById("stats0")
let stats = ["Sword", "Axe", "Bow", "Brawl", "Authority", "Reason", "Faith", "Heavy Armor", "Lance", "Riding", "Flying"]
for (let i = 0; i < stats.length; i++) {
    let statOption = document.createElement("option")
    statOption.setAttribute("value", stats[i])
    statOption.innerHTML = stats[i]
    selectStats.appendChild(statOption)
}
// POPULATE LEVELS LIST AS OPTIONS
let selectLevels = document.getElementById("level0")
let levels = ["E", "E+", "D", "D+", "C", "C+", "B", "B+", "A", "A+", "S"]
for(let i = 0; i < levels.length; i++) {
    let levelOption = document.createElement("option")
    levelOption.setAttribute("value", i)
    levelOption.innerHTML = levels[i]
    selectLevels.appendChild(levelOption)
}
// END POPULATE

// will add addional drop downs to select another stat and level
window.work = function work() {
    let number = 0
    while(document.getElementById(`stats${number}`) != null) {
        number++
    }
    if(number <= 10) {
        let prevStat = document.getElementById(`stats${number - 1}`)
        let prevLevel = document.getElementById(`level${number - 1}`)
        let newStat = prevStat.cloneNode(true)
        let newLevel = prevLevel.cloneNode(true)
        newStat.setAttribute("id", `stats${number}`)
        newStat.setAttribute("name", `stats${number}`)
        newLevel.setAttribute("id", `level${number}`)
        newLevel.setAttribute("name", `level${number}`)
        prevLevel.after(newStat)
        newStat.after(newLevel)
    }
    console.log("yes it works")
}

// this will check the classesJSON for the various stats and levels and return what classes fit the stats by level
window.runAlgorithm = function runAlgorithm() {
    console.log("we are running yo")
    let inputs = []
    // loop to get elements pushed inside input array as strings
    let number = 0
    while(document.getElementById(`stats${number}`) != null) {
        let stat = document.getElementById(`stats${number}`).selectedIndex
        let name = document.getElementsByTagName("option")[stat].value
        let level = document.getElementById(`level${number}`).selectedIndex
        let skill = document.getElementsByTagName("option")[level].value
        let text = `${stats[name]} ${skill}`
        inputs.push(text)
        number++
    }
    console.log(inputs)
    // loop classesJSON.Certification to find string value(s) in array
    for(let i = 0; i < classesJSON.length; i++) {
        console.log(`${classesJSON[i]["Class Name"]}: ${classesJSON[i].Certification}`)
        let temp = `${classesJSON[i]["Class Name"]} ${classesJSON[i].Certification}`
        if(!classesJSON[i].Certification.includes(",")) {
            for(let j = 0; j < inputs.length; j++) {
                let stat = inputs[j].slice(0, -1)
                let level = inputs[j].slice(-1)
                let compare = stat + levels[level]
                console.log(`*******${compare}`)
                if(compare == classesJSON[i].Certification) {
                    document.getElementById("displayResults").innerHTML = `<h5>${classesJSON[i]["Class Name"]}</h5>`
                }
            }
        }
    }
    // find level string from levelIndex and return number value
}

// this function retrieves class information when it is chosen from drop down
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