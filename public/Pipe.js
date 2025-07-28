class Pipe {
  constructor(canvasHeight, canvasWidth) {
    this.width = 80;
    this.gap = 200;
    this.x = canvasWidth;
    this.speedX = -3;

    const yMin = 50;
    const yMax = canvasHeight - this.gap - yMin;

    // `y` is the position of the bottom edge of the upper pipe.
    this.y = Math.floor(Math.random() * (yMax - yMin) + yMin);
  }

  update() {
    this.x += this.speedX;
  }

  isOffscreen() {
    return this.x + this.width <= 0;
  }
}

module.exports = Pipe;
