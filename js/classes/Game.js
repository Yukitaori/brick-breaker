export default class Game {
  constructor(ball, bar) {
    this.ball = ball;
    this.bar = bar;
    this.speedX = 20;
    this.speedY = 20;
    this.canvas = document.getElementById("gameCanvas");
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }
    this.leftBoundary = 0;
    this.rigthtBoundary = this.canvas.width;
    this.topBoundary = 0;
    this.bottomBoundary = this.canvas.height;
  }

  checkIfCollision(newX, newY) {
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
    if (right >= this.rigthtBoundary) {
      collision.push("right");
    }

    console.log(collision);
    return collision;
  }

  keyDown(key) {
    if (key === "ArrowRight") {
      this.bar.move("R");
    }
    if (key === "ArrowLeft") {
      this.bar.move("L");
    }
    if (key === " ") {
      this.ball.launch(key);
    }
  }

  keyUp(key) {}

  getBoundaries(x, y) {
    const top = y;
    const bottom = y + this.width;
    const left = x + this.width / 2;
    const right = x + this.length + this.width / 2;
    return { top, bottom, left, right };
  }

  getCoordinates(x, y, direction, speedX = this.speedX) {
    let newX = x;
    let newY = y;

    if (direction === "L") {
      newX = x - speedX;
    }
    if (direction === "R") {
      newX = x + speedX;
    }

    return { newX, newY };
  }

  renderCanvas() {
    this.ctx.clearRect(0, 0, this.rigthtBoundary, this.bottomBoundary);
    this.ball.draw(this.ball.x, this.ball.y);
    this.bar.draw(this.bar.x, this.bar.y);
  }

  setAutoRender() {
    const render = setInterval(() => this.renderCanvas(), 10);
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
