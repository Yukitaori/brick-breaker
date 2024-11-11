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
  }

  draw(x = this.x, y = this.y) {
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

  manageCollision(side) {
    let newX = this.x;
    switch (side) {
      case "left":
        newX = this.leftBoundary + this.width / 2;
        break;
      case "right":
        newX = this.rigthtBoundary - this.width / 2 - this.length;
        break;

      default:
        break;
    }
    return newX;
  }

  move(direction) {
    let { newX, newY } = this.getCoordinates(this.x, this.y, direction);
    const collision = this.checkIfCollision(newX, newY);

    if (collision.length >= 1) {
      newX = this.manageCollision(collision[0]);
      this.setCoordinates(newX, newY);
      const { top, bottom, left, right } = this.getBoundaries(newX, newY);
      this.setBoundaries(top, bottom, left, right);
      return console.log(collision);
    } else {
      const { top, bottom, left, right } = this.getBoundaries(newX, newY);
      this.setCoordinates(newX, newY);
      this.setBoundaries(top, bottom, left, right);
    }
  }
}
