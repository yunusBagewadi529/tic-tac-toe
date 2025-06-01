const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = true;

function handleClick(e) {
  const cell = e.target;

  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    statusText.textContent = `It's a Draw! 🤝`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      cells[a].classList.add("winning");
      cells[b].classList.add("winning");
      cells[c].classList.add("winning");

      return true;
    }
  }

  return false;
}

function checkDraw() {
  return [...cells].every((cell) => cell.textContent !== "");
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winning");
  });
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `${currentPlayer}'s Turn`;
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
});

resetBtn.addEventListener("click", resetBoard);
