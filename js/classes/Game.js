import { setNewGame, alertModal, rulesModal } from "../functions.js";

export default class Game {
  constructor(ball, bar, bricks) {
    this.ball = ball;
    this.bar = bar;
    this.bricks = bricks;
    this.speedX = 0;
    this.speedY = 0;
    this.canvas = document.getElementById("gameCanvas");
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }
    this.leftBoundary = 0;
    this.rightBoundary = this.canvas.width;
    this.topBoundary = 0;
    this.bottomBoundary = this.canvas.height;
    this.isMoving = false;
    this.renderDelay = 20;
    this.level = 1;
    this.score = 0;
  }

  checkIfCollisionWithBar(newX, newY, bar) {
    const { top, bottom, left, right } = this.getBoundaries(newX, newY);
    const {
      top: barTop,
      bottom: barBottom,
      left: barLeft,
      right: barRight,
    } = bar.getBoundaries(bar.x, bar.y);
    const collision = [];
    if (
      bottom >= barTop &&
      ((left <= barRight && left >= barLeft) ||
        (right >= barLeft && right <= barRight)) &&
      top <= barTop
    ) {
      collision.push("bottom");
    }
    return collision;
  }

  checkIfCollisionWithBricks(newX, newY, bricks) {
    const { top, bottom, left, right } = this.getBoundaries(newX, newY);
    const collision = [];
    for (let brick of bricks) {
      if (brick.state === 0) {
        continue;
      }
      const {
        top: brickTop,
        bottom: brickBottom,
        left: brickLeft,
        right: brickRight,
      } = brick.getBoundaries(brick.x, brick.y);
      if (
        bottom >= brickTop &&
        top <= brickTop &&
        ((left <= brickRight && left >= brickLeft) ||
          (right >= brickLeft && right <= brickRight)) &&
        this.speedY > 0
      ) {
        collision.push({ brick, side: "bottom" });
        break;
      }
      if (
        top <= brickBottom &&
        bottom >= brickBottom &&
        ((left <= brickRight && left >= brickLeft) ||
          (right >= brickLeft && right <= brickRight)) &&
        this.speedY < 0
      ) {
        collision.push({ brick, side: "top" });
        break;
      }
    }
    return collision;
  }

  checkIfCollisionWithWall(newX, newY) {
    const { top, bottom, left, right } = this.getBoundaries(newX, newY);
    const collision = [];
    if (top <= 0) {
      collision.push("top");
    }
    if (bottom >= this.bottomBoundary) {
      collision.push("bottom");
    }
    if (left <= 0) {
      collision.push("left");
    }
    if (right >= this.rightBoundary) {
      collision.push("right");
    }
    return collision;
  }

  cleanGame() {
    this.ctx.clearRect(0, 0, this.rightBoundary, this.bottomBoundary);
  }

  drawElements() {
    this.ball.draw();
    this.bar.draw();
    this.bricks.map((brick) => brick.draw());
  }

  async gameOver() {
    const confirmation = await alertModal("Game Over", "OK");
    if (confirmation) {
      this.newGame();
    }
  }

  getNewCoordinates(element) {
    let x = element.x;
    let y = element.y;
    let newX = x;
    let newY = y;
    const speedX = element.speedX;
    const speedY = element.speedY;

    newX = x + speedX;
    newY = y + speedY;
    return { newX, newY };
  }

  initGame() {
    this.setScore(0);
    this.setAutoRender();
  }

  keyDown(key) {
    // TODO Gérer la persistence des touches pressées lors de l'appui sur une nouvelle touche
    if (
      (window.pressedKeys["ArrowRight"] || window.pressedKeys["ArrowLeft"]) &&
      key === "ArrowRight"
    ) {
      this.bar.isMoving = true;
      this.bar.speedX = 10;
    }
    if (
      (window.pressedKeys["ArrowRight"] || window.pressedKeys["ArrowLeft"]) &&
      key === "ArrowLeft"
    ) {
      this.bar.isMoving = true;
      this.bar.speedX = -10;
    }
    if (window.pressedKeys[" "]) {
      if (!this.ball.isMoving) {
        this.ball.launch();
      }
    }
  }

  keyUp() {
    if (!window.pressedKeys["ArrowLeft"] && !window.pressedKeys["ArrowRight"]) {
      this.bar.isMoving = false;
    }
  }

  move(newX, newY) {
    this.setCoordinates(newX, newY);
    const { top, bottom, left, right } = this.getBoundaries(newX, newY);
    this.setBoundaries(top, bottom, left, right);
  }

  moveElements() {
    // On bouge d'abord la barre
    if (this.bar.isMoving) {
      let { newX, newY } = this.getNewCoordinates(this.bar);
      const collisionWithWall = this.bar.checkIfCollisionWithWall(newX, newY);
      if (collisionWithWall.length >= 1) {
        const coordinatesAfterCollision = this.bar.manageCollisionWithWall(
          collisionWithWall[0]
        );
        newX = coordinatesAfterCollision.newX;
        newY = coordinatesAfterCollision.newY;
      }

      this.bar.move(newX, newY);
    }

    // Puis on bouge la balle
    if (this.ball.isMoving) {
      let { newX, newY } = this.getNewCoordinates(this.ball);
      const collisionWithWall = this.ball.checkIfCollisionWithWall(newX, newY);
      const collisionWithBrick = this.ball.checkIfCollisionWithBricks(
        newX,
        newY,
        this.bricks
      );

      if (collisionWithBrick.length >= 1) {
        const datasAfterCollision = this.ball.manageCollisionWithBrick(
          collisionWithBrick[0].side,
          collisionWithBrick[0].brick
        );
        newX = datasAfterCollision.newX;
        newY = datasAfterCollision.newY;
        if (datasAfterCollision.brokenBrick) {
          this.setScore(collisionWithBrick[0].brick.points);
        }
      }

      if (collisionWithWall.length >= 1) {
        const datasAfterCollision = this.ball.manageCollisionWithWall(
          collisionWithWall[0]
        );
        newX = datasAfterCollision.newX;
        newY = datasAfterCollision.newY;
      }

      const collisionWithBar = this.ball.checkIfCollisionWithBar(
        newX,
        newY,
        this.bar
      );

      if (collisionWithBar.length >= 1) {
        for (let collision of collisionWithBar) {
          const datasAfterCollision = this.ball.manageCollisionWithBar(
            collision,
            this.bar
          );
          newX = datasAfterCollision.newX;
          newY = datasAfterCollision.newY;
        }
      }

      if (!this.bricks.find((brick) => brick.state > 0)) {
        this.ball.isMoving = false;
        this.winGame();
      }

      this.ball.move(newX, newY);
    }
  }

  newGame() {
    setNewGame();
  }

  renderCanvas() {
    this.cleanGame();
    this.moveElements();
    this.drawElements();
  }

  setAutoRender() {
    const render = setInterval(() => this.renderCanvas(), this.renderDelay);
    window.renders.push(render);
  }

  setBoundaries(top, bottom, left, right) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }

  setCoordinates(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

  setScore(points) {
    this.score += points;
    document.getElementById("scoreDisplay").innerText = this.score;
  }

  async winGame() {
    const confirmation = await alertModal("You win !", "OK");
    if (confirmation) {
      this.newGame();
    }
  }
}
