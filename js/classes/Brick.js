import { bricksDatas, defaultDatas } from "../datas.js";
import Game from "./Game.js";

export default class Brick extends Game {
  constructor(defaultX, defaultY, length, width, kind) {
    super();
    this.x = defaultX;
    this.y = defaultY;
    this.defaultX = defaultX;
    this.defaultY = defaultY;
    this.length = length;
    this.width = width;
    this.speedX = 0;
    this.speedY = 0;
    this.kind = kind;
    this.state = bricksDatas[kind].state;
    this.points = bricksDatas[kind].points;
    this.variant = "default";
  }

  draw() {
    if (this.state === 0) {
      return;
    }
    const x = this.x;
    const y = this.y;
    const ctx = this.ctx;

    ctx.beginPath();
    ctx.fillStyle = bricksDatas[this.state].color;
    ctx.moveTo(x, y);
    ctx.lineTo(x + this.length, y);
    ctx.lineTo(x + this.length, y + this.width);
    ctx.lineTo(x, y + this.width);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.fillStyle = defaultDatas.defaultColor;
  }

  getBoundaries(x, y) {
    const top = y;
    const bottom = y + this.width;
    const left = x;
    const right = x + this.length;
    return { top, bottom, left, right };
  }

  setState() {
    this.state = this.state - 1;
    return this.state;
  }
}
