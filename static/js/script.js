import { toolsJSON } from "./toolsJSON.js";

console.log(`Hello my favorite human, I am here to serve you.`);

let contentArea = document.getElementById("content-area");
let infoArea = document.getElementById("info-blurb");
let numberOfTools = toolsJSON.length;

// POPULATE THE CONTENT AREA WITH TOOL NAMES
for (let i = 0; i < numberOfTools; i++) {
  let thisTool = toolsJSON[i];
  let title = document.createElement("h3");
  title.setAttribute("onmouseover", `showTool(${i})`);
  let link = "";
  if (thisTool["Link"] == "#") {
    link = `<a href="${thisTool["Link"]}">`;
  } else {
    link = `<a href="${thisTool["Link"]}" target="_blank" rel="noopener noreferrer">`;
  }
  // title.innerHTML = `Day ${thisTool["Days"]} - ${link}${thisTool["Tool Name"]}</a>`;
  title.innerHTML = `${link}${thisTool["Tool Name"]}</a>`;
  contentArea.append(title);
}

// FUNCTION TO DISPLAY DESCRIPTION ON MOUSEHOVER
window.showTool = function showTool(index) {
  infoArea.innerHTML = `<h3 class="info">${toolsJSON[index]["Description"]}</h3>`;
};
