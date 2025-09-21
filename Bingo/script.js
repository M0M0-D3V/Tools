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
}

function activateGameMode() {
  const cells = document.querySelectorAll("#bingo-card div");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      cell.classList.toggle("marked");
    });
  });

  // Hide the "Generate New Card" button
  document.getElementById("generate-btn").style.display = "none";
  // Hide the "Use This Card" button
  document.getElementById("use-btn").style.display = "none";
  // Show the tip
  document.getElementById("tip").style.display = "inline-block";
  // Show the "Start Over" button
  document.getElementById("reset-btn").style.display = "inline-block";
}

function resetGame() {
  generateBingoCard();
  document.getElementById("use-btn").style.display = "none";
  document.getElementById("reset-btn").style.display = "none";
  document.getElementById("tip").style.display = "none";
  document.getElementById("generate-btn").style.display = "inline-block";
}

// Initial render
generateBingoCard();

// Button Listeners
document
  .getElementById("generate-btn")
  .addEventListener("click", generateBingoCard);

document.getElementById("use-btn").addEventListener("click", activateGameMode);
document.getElementById("reset-btn").addEventListener("click", resetGame);
