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

// ****************************************************************
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
// ****************************************************************

// will add addional drop downs to select another stat and level
window.work = function work() {
    let number = 0
    while(document.getElementById(`stats${number}`) != null) {
        number++
    }
    if(number <= stats.length) {
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
    // [] refactor to make callable function
    let inputs = []
    // loop to get elements pushed inside input array as strings
    let number = 0
    // reset display-results
    document.getElementById("display-results").innerHTML = ""
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
        let temp = `${classesJSON[i]["Class Name"]}: ${classesJSON[i].Certification}`
        // checks if JSON has single stat
        if(!classesJSON[i].Certification.includes(",")) {
            for(let j = 0; j < inputs.length; j++) {
                // [] extract this as callable function to convert stats and compare from inputs to JSON
                // [x] create a way to evaulate if >= than JSON value
                let stat = inputs[j].slice(0, -1)
                let level = inputs[j].slice(-1)
                if(inputs[j].slice(-2, -1) == "1") {
                    level = inputs[j].slice(-2)
                }
                // let lvlAsStr = stat + levels[level]
                let thisCert = classesJSON[i].Certification
                let thisStat = ""
                let thisStatLvl = 0
                if(thisCert.slice(-1) == "+") {
                    thisStat = thisCert.slice(0, -3)
                    thisStatLvl = levels[thisCert.indexOf(thisCert.slice(-2))]
                }
                else {
                    if(levels.includes(thisCert.slice(-1))) {
                        thisStat = thisCert.slice(0, -2)
                        thisStatLvl = levels.indexOf(thisCert.slice(-1))
                    }
                }
                // [] extract this as a callable function to push results onto page
                if((stat.slice(0, -1) == thisStat || stat.slice(0, -2) == thisStat) && level >= thisStatLvl) {
                    console.log("yup")
                    document.getElementById("display-results").innerHTML += `<h5 class="single-stat">${temp}</h5>`
                }
            }
        }
        // if multiple stats, split it into array and loop
        else {
            let certArray = classesJSON[i].Certification.split(", ")
            let match = 0
            certloop: for(let j = 0; j < certArray.length; j++) {
                // 3rd loop to now compare certArray and inputs
                inputloop: for(let k = 0; k < inputs.length; k++) {
                    // brute force, copying above for loop straight in...
                    // [] figure out how to refactor later
                    let stat = inputs[k].slice(0, -1)
                    let level = inputs[k].slice(-1)
                    if(inputs[k].slice(-2, -1) == "1") {
                        level = inputs[k].slice(-2)
                    }
                    let thisCert = certArray[j]
                    let thisStat = ""
                    let thisStatLvl = 0
                    if(thisCert.slice(-1) == "+") {
                        thisStat = thisCert.slice(0, -3)
                        thisStatLvl = levels.indexOf(thisCert.slice(-2))
                    }
                    else {
                        if(levels.includes(thisCert.slice(-1))) {
                            thisStat = thisCert.slice(0, -2)
                            thisStatLvl = levels.indexOf(thisCert.slice(-1))
                        }
                    }
                    // beginner classes have 'OR' requirements
                    if(classesJSON[i]["Level Seal"] == "Beginner"){
                        // [] extract this as a callable function to push results onto page
                        if((stat.slice(0, -1) == thisStat || stat.slice(0, -2) == thisStat) && level >= thisStatLvl) {
                            console.log("yup")
                            document.getElementById("display-results").innerHTML += `<h5 class="beginner">${temp} <span>(need just 1)</span></h5>`
                            break certloop
                        }
                    }
                    // non beginner classes have 'AND' requirements
                    else {
                        if((stat.slice(0, -1) == thisStat || stat.slice(0, -2) == thisStat) && level >= thisStatLvl) {
                            match++
                        }
                    }
                }
                if(match == certArray.length) {
                    console.log(`############# found match! ${classesJSON[i]["Class Name"]}`)
                    document.getElementById("display-results").innerHTML += `<h5 class="intermediate">${temp} <span>(need all)</span></h5>`
                }
                else if(match + 1 == certArray.length) {
                    console.log(`~~~~~~ missing 1 stat ${classesJSON[i]["Class Name"]}`)
                    document.getElementById("display-results").innerHTML += `<h5 class="intermediate">${temp} <span>(missing 1 stat)</span></h5>`
                }
            }
            match = 0
        }
    }
}

// this function retrieves class information when it is chosen from drop down
window.showClass = function showClass() {
    let selected = document.getElementById("class-names").selectedIndex;
    let idNum = document.getElementsByTagName("option")[selected].value
    let displayClass = document.getElementById("display-class")
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

    displayClass.innerHTML += "<h5>Can Use Magic:</h5>"
    displayClass.innerHTML += `<p>${thisClass["Magic"]}</p>`
    
    displayClass.innerHTML += "<h5>Specific:</h5>"
    displayClass.innerHTML += `<p>${thisClass["Specific"]}</p>`
}