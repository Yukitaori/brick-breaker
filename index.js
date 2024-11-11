import { setNewGame, rulesModal } from "./js/functions.js";
window.renders = [];

const newGameButton = document.getElementById("newGameButton");
const resetButton = document.getElementById("resetButton");
newGameButton.addEventListener("click", () => {
  setNewGame();
});

document.getElementById("info").addEventListener("click", () => {
  rulesModal();
});

window.addEventListener("load", () => {
  const game = setNewGame();

  window.pressedKeys = {};
  window.addEventListener("keydown", (e) => {
    // TODO Gérer le delay entre la première pression et la seconde
    window.pressedKeys[e.key] = true;
    game.keyDown(e.key);
  });
  window.addEventListener("keyup", (e) => {
    window.pressedKeys[e.key] = false;
    game.keyUp(e.key);
  });
});
