import { setNewGame, rulesModal } from "./js/functions.js";
window.renders = [];

const newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", () => {
  setNewGame();
});

document.getElementById("info").addEventListener("click", () => {
  rulesModal();
});

window.addEventListener("load", () => {
  setNewGame();
});
