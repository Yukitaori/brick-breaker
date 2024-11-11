import Game from "./Game.js";

export default class Brick extends Game {
  constructor(defaultX, defaultY, length, width) {
    super();
    this.x = defaultX;
    this.y = defaultY;
    this.defaultX = defaultX;
    this.defaultY = defaultY;
    this.length = length;
    this.width = width;
  }
}
