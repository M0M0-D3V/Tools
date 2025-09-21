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
}

// Initial render
generateBingoCard();

// Regenerate on button click
document
  .getElementById("generate-btn")
  .addEventListener("click", generateBingoCard);
