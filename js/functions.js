import Game from "./classes/Game.js";
import Ball from "./classes/Ball.js";
import Bar from "./classes/Bar.js";
import Brick from "./classes/Brick.js";

function setNewGame() {
  window.renders.forEach((render) => {
    clearInterval(render);
  });

  const bar = new Bar(330, 260, 40, 10);
  const ball = new Ball(350, 250, 20);
  const game = new Game(ball, bar);
  game.setAutoRender();

  window.pressedKeys = {};
  window.addEventListener("keydown", (e) => {
    // TODO Gérer le delay entre la première pression et la seconde
    window.pressedKeys[e.key] = true;
    game.keyDown();
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
  modalButton.addEventListener("click", removeModal);
  modal.appendChild(modalButton);

  function removeModal() {
    modalBg.remove();
  }
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
