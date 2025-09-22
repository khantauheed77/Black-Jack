/* ======= Game state ======= */
let isAlive = false;
let hasBlackJack = false;
let cards = [];
let sum = 0;
let message = "";

/* ======= DOM ======= */
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");

const playBtn = document.getElementById("play-btn");
const newCardBtn = document.getElementById("new-card-btn");
const restartBtn = document.getElementById("restart-btn");

/* player */
const player = { name: "Per", chips: 145 };
playerEl.textContent = `${player.name} : $${player.chips}`;

/* ======= Helpers ======= */
function getRandomCard() {
  const n = Math.floor(Math.random() * 13) + 1;
  if (n === 1) return 11;       // Ace -> 11
  if (n > 10) return 10;        // J, Q, K -> 10
  return n;                     // 2..10
}

function updateButtons() {
  newCardBtn.disabled = !(isAlive && !hasBlackJack);
  playBtn.disabled = isAlive;
}

/* ======= Main render ======= */
function renderGame() {
  cardsEl.textContent = "Cards: " + (cards.length ? cards.join(" | ") : "—");
  sumEl.textContent = "Sum: " + (sum || "—");

  if (sum === 21) {
    message = "Wohoo! You've got Blackjack!";
    hasBlackJack = true;
  } else if (sum < 21 && sum > 0) {
    message = "Do you want to draw a new card?";
  } else if (sum > 21) {
    message = "You're out of the game!";
    isAlive = false;
  } else {
    message = "Want to play a round?";
  }

  messageEl.textContent = message;
  updateButtons();
}

/* ======= Actions ======= */
function startGame() {
  isAlive = true;
  hasBlackJack = false;
  const firstCard = getRandomCard();
  const secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame();
}

function newCard() {
  if (!isAlive || hasBlackJack) return;
  const card = getRandomCard();
  cards.push(card);
  sum += card;
  renderGame();
}

function restartGame() {
  isAlive = false;
  hasBlackJack = false;
  cards = [];
  sum = 0;
  message = "Want to play a round?";
  renderGame();
}

/* ======= Wire up controls ======= */
playBtn.addEventListener("click", startGame);
newCardBtn.addEventListener("click", newCard);
restartBtn.addEventListener("click", restartGame);

/* initial UI */
renderGame();
