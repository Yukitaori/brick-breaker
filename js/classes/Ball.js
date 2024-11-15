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

  launch() {
    this.isMoving = true;
    this.speedY = -5;
    if (window.pressedKeys["ArrowRight"] && !window.pressedKeys["ArrowLeft"]) {
      this.speedX = -5;
      this.direction = "LU";
    } else if (
      window.pressedKeys["ArrowLeft"] &&
      !window.pressedKeys["ArrowRight"]
    ) {
      this.speedX = 5;
      this.direction = "RU";
    } else {
      this.speedX = 0;
      this.direction = "U";
    }
  }

  manageCollisionWithWall(side) {
    let newX = this.x;
    let newY = this.y;
    switch (side) {
      case "left":
        this.speedX = -this.speedX;
        this.direction = this.direction.replace("L", "R");
        newX = this.leftBoundary + this.width / 2;
        break;
      case "right":
        this.speedX = -this.speedX;
        this.direction = this.direction.replace("R", "L");
        newX = this.rightBoundary - this.width / 2 - this.length;
        break;
      case "top":
        this.speedY = -this.speedY;
        this.direction = this.direction.replace("U", "D");
        newY = this.topBoundary + this.width / 2;
        break;
      case "bottom":
        // TODO Game Over ici
        this.speedY = -this.speedY;
        this.direction = this.direction.replace("D", "U");
        newY = this.bottomBoundary - this.width / 2;
        break;
      default:
        break;
    }
    return { newX, newY };
  }

  manageCollisionWithBar(side, bar) {
    let newX = this.x;
    let newY = this.y;
    const { top: barTop, bottom: barBottom, left: barLeft, right: barRight } = bar.getBoundaries(bar.x, bar.y);
    switch (side) {
      case "left":
        
      break;
      case "right":
        
      break;
      case "bottom":
        this.speedY = -this.speedY;
        this.direction = this.direction.replace("U", "D");
        newY = barTop - this.width / 2;
        break;
      default:
      break;
    }
    return { newX, newY };
  }
}
