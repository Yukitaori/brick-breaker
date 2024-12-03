import Game from "./Game.js";

export default class Ball extends Game {
  constructor(defaultX, defaultY, width) {
    super();
    this.x = defaultX;
    this.y = defaultY;
    this.defaultX = defaultX;
    this.defaultY = defaultY;
    this.length = 0;
    this.width = width;
    this.speedX = 0;
    this.speedY = 0;
  }

  draw() {
    const x = this.x;
    const y = this.y;
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(x, y, this.width / 2, 0, Math.PI * 2, true); // Outer circle
    ctx.fill();
  }

  getBoundaries(x, y) {
    const top = y - this.width / 2;
    const bottom = y + this.width / 2;
    const left = x - this.width / 2;
    const right = x + this.width / 2;
    return { top, bottom, left, right };
  }

  getCollisionAngle(newX, newY, bar) {
    if (newX === bar.x + bar.length / 2) {
      // la balle tape pile au milieu
    }
    if (newX > bar.x + bar.length / 2) {
      // la balle tape sur la droite de la barre
    }
    if (newX < bar.x + bar.length / 2) {
      // la balle tape sur la gauche de la barre
    }
  }

  launch() {
    this.isMoving = true;
    if (window.pressedKeys["ArrowRight"] && !window.pressedKeys["ArrowLeft"]) {
      this.speedY = -5;
      this.speedX = -5;
    } else if (
      window.pressedKeys["ArrowLeft"] &&
      !window.pressedKeys["ArrowRight"]
    ) {
      this.speedY = -5;
      this.speedX = 5;
    } else {
      this.speedX = 1;
      this.speedY = -5;
    }
  }

  manageCollisionWithWall(side) {
    let newX = this.x;
    let newY = this.y;
    switch (side) {
      case "left":
        this.speedX = -this.speedX;
        newX = this.leftBoundary + this.width / 2;
        break;
      case "right":
        this.speedX = -this.speedX;
        newX = this.rightBoundary - this.width / 2 - this.length;
        break;
      case "top":
        this.speedY = -this.speedY;
        newY = this.topBoundary + this.width / 2;
        break;
      case "bottom":
        this.isMoving = false;
        this.gameOver();
        this.speedY = -this.speedY;
        newY = this.bottomBoundary - this.width / 2;
        break;
      default:
        break;
    }
    return { newX, newY };
  }

  manageCollisionWithBrick(side, brick) {
    let newX = this.x;
    let newY = this.y;
    const {
      top: brickTop,
      bottom: brickBottom,
      left: brickLeft,
      right: brickRight,
    } = brick.getBoundaries(brick.x, brick.y);

    switch (side) {
      case "left":
        this.speedX = -this.speedX;
        newX = brickRight + this.width / 2;
        break;
      case "right":
        this.speedX = -this.speedX;
        newX = brickLeft - this.width / 2;
        break;
      case "bottom":
        this.speedY = -this.speedY;
        newY = brickTop - this.width / 2;
        break;
      case "top":
        this.speedY = -this.speedY;
        newY = brickBottom + this.width / 2;
        break;
      default:
        break;
    }

    brick.setState();
    return { newX, newY };
  }

  manageCollisionWithBar(side, bar) {
    let newX = this.x;
    let newY = this.y;
    const {
      top: barTop,
      bottom: barBottom,
      left: barLeft,
      right: barRight,
    } = bar.getBoundaries(bar.x, bar.y);
    switch (side) {
      case "left":
        this.speedX = -this.speedX;
        newX = barRight + this.width / 2;
        break;
      case "right":
        this.speedX = -this.speedX;
        newX = barLeft - this.width / 2;
        break;
      case "bottom":
        this.speedY = -this.speedY;
        newY = barTop - this.width / 2;
        break;
      default:
        break;
    }
    return { newX, newY };
  }

  setSpeed;
}
