var csvParsedArray = [];
$(document).on("click", "#btnUploadFile", function () {
  if ($("#fileToUpload").get(0).files.length == 0) {
    alert("Please upload the file first.");
    return;
  }
  let fileUpload = $("#fileToUpload").get(0);
  let files = fileUpload.files;
  if (files[0].name.toLowerCase().lastIndexOf(".csv") == -1) {
    alert("Please upload only CSV files");
    return;
  }
  let reader = new FileReader();
  let bytes = 50000;

  reader.onloadend = function (evt) {
    let lines = evt.target.result;
    if (lines && lines.length > 0) {
      let line_array = CSVToArray(lines);
      if (lines.length == bytes) {
        line_array = line_array.splice(0, line_array.length - 1);
      }
      let codeSnip = document.getElementById("code-snip")
      codeSnip.innerHTML = "<code>"
      let columnArray = [];
      let stringHeader = "<thead><tr>";
      let stringBody = "<tbody>";
      for (let i = 0; i < line_array.length; i++) {
        let cellArr = line_array[i];
        stringBody += "<tr>";
        for (let j = 0; j < cellArr.length; j++) {
          if (i == 0) {
            columnArray.push(cellArr[j].replace("ï»¿", ""));
            stringHeader += "<th>" + columnArray[j] + "</th>";
          } else {
            stringBody += "<td>" + cellArr[j] + "</td>";
            csvParsedArray.push({
              column: columnArray[j],
              value: cellArr[j],
            });
          }
          console.log(columnArray[j], cellArr[j])
          codeSnip.innerHTML += `${columnArray[j]}: ${cellArr[j]} <br>`
        }
        stringBody += "</tr>";
      }
      stringBody += "</tbody>";
      stringHeader += "</tr></thead>";
      $(".csv-table table").append(stringHeader);
      $(".csv-table table").append(stringBody);

      codeSnip.innerHTML += "</code>"
    }
  };

  let blob = files[0].slice(0, bytes);
  reader.readAsBinaryString(blob);
});

function CSVToArray(strData, strDelimiter) {
  strDelimiter = strDelimiter || ",";
  let objPattern = new RegExp(
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );
  let arrData = [[]];
  let arrMatches = null;
  while ((arrMatches = objPattern.exec(strData))) {
    let strMatchedDelimiter = arrMatches[1];
    let strMatchedValue = [];
    if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
      arrData.push([]);
    }
    if (arrMatches[2]) {
      strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      strMatchedValue = arrMatches[3];
    }
    arrData[arrData.length - 1].push(strMatchedValue);
  }
  return arrData;
}
