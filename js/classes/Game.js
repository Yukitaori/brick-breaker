export default class Game {
  constructor(ball, bar) {
    this.ball = ball;
    this.bar = bar;
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
  }

  checkIfCollisionWithBar(newX, newY, bar) {
    const { top, bottom, left, right } = this.getBoundaries(newX, newY);
    const { top: barTop, bottom: barBottom, left: barLeft, right: barRight } = bar.getBoundaries(bar.x, bar.y);
    const collision = [];
    if (bottom >= barTop && (left <= barRight && left >= barLeft || right >= barLeft && right <= barRight)) {
      collision.push("bottom");
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

  drawElements() {
    this.ball.draw();
    this.bar.draw();
  }

  getNewCoordinates(element) {
    let x = element.x;
    let y = element.y;
    let newX = x;
    let newY = y;
    const direction = element.direction;
    const speedX = element.speedX;
    const speedY = element.speedY;

    if (direction === "L" || direction === "R") {
      newX = x + speedX;
    }
    if (
      direction === "LU" ||
      direction === "RU" ||
      direction === "LD" ||
      direction === "RD"
    ) {
      newX = x + speedX;
      newY = y + speedY;
    }

    if (direction === "U" || direction === "D") {
      newY = y + speedY;
    }
    // console.log(newX, newY, direction, speedX, speedY);
    return { newX, newY };
  }

  keyDown() {
    // TODO Gérer la persistence des touches pressées lors de l'appui sur une nouvelle touche
    if (window.pressedKeys["ArrowRight"] && !window.pressedKeys["ArrowLeft"]) {
      this.bar.isMoving = true;
      this.bar.speedX = 10;
      this.bar.direction = "R";
    }
    if (window.pressedKeys["ArrowLeft"] && !window.pressedKeys["ArrowRight"]) {
      this.bar.isMoving = true;
      this.bar.speedX = -10;
      this.bar.direction = "L";
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

      if (collisionWithWall.length >= 1) {
        // TODO Gérer avec un foreach
        const coordinatesAfterCollision = this.ball.manageCollisionWithWall(
          collisionWithWall[0]
        );
        newX = coordinatesAfterCollision.newX;
        newY = coordinatesAfterCollision.newY;
      }

      const collisionWithBar = this.ball.checkIfCollisionWithBar(newX, newY, this.bar);

      if (collisionWithBar.length >= 1) {

        for (let collision of collisionWithBar) {
          const coordinatesAfterCollision = this.ball.manageCollisionWithBar(collision, this.bar);
          newX = coordinatesAfterCollision.newX;
          newY = coordinatesAfterCollision.newY;
        }

      }

      this.ball.move(newX, newY);
    }
  }

  renderCanvas() {
    this.ctx.clearRect(0, 0, this.rightBoundary, this.bottomBoundary);
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
}
