import Brick from "./classes/Brick.js";

const bricksDatas = {
  1: {
    color: "#FFFFFF",
    points: 1,
    state: 1,
  },
  2: {
    color: "#0F5DDF",
    points: 2,
    state: 2,
  },
  3: {
    color: "#5DDF0F",
    points: 5,
    state: 3,
  },
  4: {
    color: "#DF0F5D",
    points: 10,
    state: 4,
  },
  5: {
    color: "#777777",
    points: 20,
    state: 5,
  },
  6: {
    color: "#555555",
    points: 50,
    state: 6,
  },
};

const defaultDatas = {
  originalSpeed: 5,
  defaultColor: "#000000",
};

const levels = {
  1: {
    levelInitializer: (bricks) => {
      for (let x = 50; x <= 620; x = x + 50) {
        const newBrick = new Brick(x, 120, 40, 15, 1);
        bricks.push(newBrick);
      }
      for (let x = 70; x <= 600; x = x + 50) {
        const newBrick = new Brick(x, 100, 40, 15, 2);
        bricks.push(newBrick);
      }
      for (let x = 90; x <= 580; x = x + 50) {
        const newBrick = new Brick(x, 80, 40, 15, 3);
        bricks.push(newBrick);
      }
      for (let x = 110; x <= 540; x = x + 50) {
        const newBrick = new Brick(x, 60, 40, 15, 4);
        bricks.push(newBrick);
      }
    },
  },
};

export { bricksDatas, defaultDatas, levels };
