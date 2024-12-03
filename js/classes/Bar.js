import Game from "./Game.js";

export default class Bar extends Game {
  constructor(defaultX, defaultY, length, width) {
    super();
    this.x = defaultX;
    this.y = defaultY;
    this.defaultX = defaultX;
    this.defaultY = defaultY;
    this.length = length;
    this.width = width;
    this.speedX = 0;
    this.speedY = 0;
  }

  draw() {
    const x = this.x;
    const y = this.y;
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + this.length, y);
    ctx.arc(
      x + this.length,
      y + this.width / 2,
      this.width / 2,
      Math.PI * 2,
      false
    );
    ctx.lineTo(x + this.length, y + this.width);
    ctx.lineTo(x, y + this.width);
    ctx.arc(x, y + this.width / 2, this.width / 2, Math.PI * 2, false);
    ctx.fill();
  }

  getBoundaries(x, y) {
    const top = y;
    const bottom = y + this.width;
    const left = x - this.width / 2;
    const right = x + this.length + this.width / 2;
    return { top, bottom, left, right };
  }

  manageCollisionWithWall(side) {
    let newX = this.x;
    let newY = this.y;
    switch (side) {
      case "left":
        newX = this.leftBoundary + this.width / 2;
        break;
      case "right":
        newX = this.rightBoundary - this.width / 2 - this.length;
        break;
      default:
        break;
    }
    return { newX, newY };
  }
}
