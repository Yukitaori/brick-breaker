import Game from "./Game.js";

export default class Ball extends Game {
  constructor(defaultX, defaultY, width) {
    super();
    this.x = defaultX;
    this.y = defaultY;
    this.defaultX = defaultX;
    this.defaultY = defaultY;
    this.width = width;
    this.speedX = 0;
    this.speedY = 0;
  }

  draw(x = this.x, y = this.y) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(x, y, this.width / 2, 0, Math.PI * 2, true); // Outer circle
    ctx.fill();
  }

  launch() {
    this.move();
  }

  move(direction) {
    // const newX = this.x;
    // const newY = this.y;
    // if (direction === "L") {
    //   this.x = this.x - this.speed;
    // }
    // if (direction === "R") {
    //   this.x = this.x + this.speed;
    // }
    // this.getBoundaries();
  }
}
