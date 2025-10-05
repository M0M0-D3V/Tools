// meow
console.log("yes boss?");

function generateBingoCard() {
  const card = document.getElementById("bingo-card");
  card.innerHTML = ""; // Clear previous card

  // Generate 25 unique numbers from 1 to 50
  const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
  const shuffled = numbers.sort(() => 0.5 - Math.random()).slice(0, 25);

  // Choose one index to be the FREE space
  const freeIndex = Math.floor(Math.random() * 25);

  // Create 5x5 grid cells
  shuffled.forEach((num, index) => {
    const cell = document.createElement("div");
    cell.textContent = index === freeIndex ? "FREE" : num;
    cell.classList.add(index === freeIndex ? "free-cell" : "number-cell");
    card.appendChild(cell);
  });

  // Show the "Use This Card" button
  document.getElementById("use-btn").style.display = "inline-block";
  // Hide the "Save Card as Image" button
  document.getElementById("save-btn").style.display = "none";
  // Hide the "Start Over" button
  document.getElementById("reset-btn").style.display = "none";
  // Hide the tip
  document.getElementById("tip").style.display = "none";
  // Hide the line count display
  document.getElementById("line-count").style.display = "none";
}

function activateGameMode() {
  const grid = document.getElementById("bingo-card");
  grid.classList.add("game-mode");

  const markedIndexes = new Set();
  const completedLines = new Set();
  /*
  Logic for Winning Line conditions
  Grid Indices:
  0  1  2  3  4
  5  6  7  8  9
  10 11 12 13 14
  15 16 17 18 19
  20 21 22 23 24
  */
  const winningLines = [
    // Rows
    [0, 1, 2, 3, 4], // 0
    [5, 6, 7, 8, 9], // 1
    [10, 11, 12, 13, 14], // 2
    [15, 16, 17, 18, 19], // 3
    [20, 21, 22, 23, 24], // 4
    // Columns
    [0, 5, 10, 15, 20], // 5
    [1, 6, 11, 16, 21], // 6
    [2, 7, 12, 17, 22], // 7
    [3, 8, 13, 18, 23], // 8
    [4, 9, 14, 19, 24], // 9
    // Diagonals
    [0, 6, 12, 18, 24], // 10
    [4, 8, 12, 16, 20], // 11
  ];

  function checkForCompletedLines() {
    winningLines.forEach((line, i) => {
      const isComplete = line.every((idx) => markedIndexes.has(idx));

      if (isComplete && !completedLines.has(i)) {
        completedLines.add(i);
        animateLine(line);
        updateLineCountDisplay();
      }
    });
  }

  function animateLine(line) {
    line.forEach((idx) => {
      cells[idx].classList.add("line-highlight");
    });
  }

  function updateLineCountDisplay() {
    document.getElementById(
      "line-count"
    ).textContent = `Lines Completed: ${completedLines.size}`;
  }

  const cells = document.querySelectorAll("#bingo-card div");
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      cell.classList.toggle("marked");

      if (cell.classList.contains("marked")) {
        markedIndexes.add(index);
        console.log(`Marked index: ${index}`);
      } else {
        markedIndexes.delete(index);
        console.log(`Unmarked index: ${index}`);
        // If unmarking a cell, also remove any completed lines that included this cell
        completedLines.forEach((lineIdx) => {
          if (winningLines[lineIdx].includes(index)) {
            completedLines.delete(lineIdx);
            // Remove highlight from the line
            winningLines[lineIdx].forEach((idx) => {
              cells[idx].classList.remove("line-highlight");
            });
          }
        });
        updateLineCountDisplay();
      }

      // Check for winning lines
      checkForCompletedLines();
      console.log(`completedLines:` + [...completedLines]);
    });
  });

  // Hide the "Generate New Card" button
  document.getElementById("generate-btn").style.display = "none";
  // Hide the "Use This Card" button
  document.getElementById("use-btn").style.display = "none";
  // Show the line count display
  document.getElementById("line-count").style.display = "block";
  updateLineCountDisplay();
  // Show the tip
  document.getElementById("tip").style.display = "inline-block";
  // Show the "Start Over" button
  document.getElementById("reset-btn").style.display = "inline-block";
  // Show the "Save Card as Image" button
  document.getElementById("save-btn").style.display = "inline-block";
}

function resetGame() {
  generateBingoCard();
  document.getElementById("bingo-card").classList.remove("game-mode");
  document.getElementById("reset-btn").style.display = "none";
  document.getElementById("tip").style.display = "none";
  document.getElementById("generate-btn").style.display = "inline-block";
  document.getElementById("use-btn").style.display = "inline-block";
}

// Initial render
generateBingoCard();

// Button Listeners
document
  .getElementById("generate-btn")
  .addEventListener("click", generateBingoCard);

document.getElementById("use-btn").addEventListener("click", activateGameMode);

document.getElementById("reset-btn").addEventListener("click", resetGame);

// document.getElementById("save-btn").addEventListener("click", () => {
//   const card = document.getElementById("bingo-card");

//   html2canvas(card).then((canvas) => {
//     const link = document.createElement("a");
//     link.download = "bingo-card.png";
//     link.href = canvas.toDataURL("image/png");
//     link.click();
//   });
// });

document.getElementById("save-btn").addEventListener("click", () => {
  const card = document.getElementById("bingo-image");

  // Apply temporary styling with fade-in
  card.style.border = "4px solid #1e3a8a";
  card.style.borderRadius = "12px";
  card.style.padding = "20px";
  card.style.backgroundColor = "#ffffff";

  // Wait for transition to complete before capturing
  setTimeout(() => {
    html2canvas(card).then((canvas) => {
      const link = document.createElement("a");
      link.download = "bingo-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Restore original styling
      card.style.border = "";
      card.style.borderRadius = "";
      card.style.padding = "";
      card.style.backgroundColor = "";
    });
  }, 500); // 500ms matches the CSS transition
});
