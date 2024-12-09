import Game from "./classes/Game.js";
import Ball from "./classes/Ball.js";
import Bar from "./classes/Bar.js";
import Brick from "./classes/Brick.js";
import { levels } from "./datas.js";

function setNewGame() {
  window.renders.forEach((render) => {
    clearInterval(render);
  });

  const bar = new Bar(330, 260, 40, 10);
  const ball = new Ball(350, 250, 20);
  const bricks = [];
  levels[1].levelInitializer(bricks);

  const game = new Game(ball, bar, bricks);
  game.initGame();

  window.pressedKeys = {};
  window.addEventListener("keydown", (e) => {
    window.pressedKeys[e.key] = true;
    game.keyDown(e.key);
  });
  window.addEventListener("keyup", (e) => {
    window.pressedKeys[e.key] = false;
    game.keyUp();
  });

  return game;
}

function alertModal(alert, confirm) {
  document.getElementById("alertModalBg")
    ? document
        .getElementById("main")
        .removeChild(document.getElementById("alertModalBg"))
    : null;

  let modalBg = document.createElement("div");
  modalBg.setAttribute("class", "modalBg");
  modalBg.setAttribute("id", "alertModalBg");
  document.getElementById("main").appendChild(modalBg);

  let modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.setAttribute("id", "alertModal");
  modalBg.appendChild(modal);

  let modalText = document.createElement("p");
  modalText.setAttribute("class", "modalText");
  modalText.innerText = alert;
  modal.appendChild(modalText);

  let modalButton = document.createElement("button");
  modalButton.setAttribute("class", "modalButton");
  modalButton.innerText = confirm;
  modal.appendChild(modalButton);

  function removeModal() {
    modalBg.remove();
  }

  return new Promise((resolve, reject) => {
    modalButton.addEventListener("click", () => {
      resolve(true);
      removeModal();
    });
  });
}

function rulesModal() {
  document.getElementById("alertModalBg")
    ? document
        .getElementById("main")
        .removeChild(document.getElementById("alertModalBg"))
    : null;

  let modalBg = document.createElement("div");
  modalBg.setAttribute("class", "modalBg");
  modalBg.setAttribute("id", "alertModalBg");
  document.getElementById("main").appendChild(modalBg);

  let modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.setAttribute("id", "alertModal");
  modalBg.appendChild(modal);

  let modalText = document.createElement("p");
  modalText.setAttribute("class", "modalText");
  modalText.innerHTML =
    "<h2>Rules</h2><p>Rules here</p><br /><p>And again</p><br />";
  modal.appendChild(modalText);

  let modalButton = document.createElement("button");
  modalButton.setAttribute("class", "modalButton");
  modalButton.innerText = "OK";
  modalButton.addEventListener("click", removeModal);
  modal.appendChild(modalButton);

  function removeModal() {
    modalBg.remove();
  }
}

export { setNewGame, alertModal, rulesModal };
