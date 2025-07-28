const Player = require('./Player.js');
const Pipe = require('./Pipe.js');

class Game {
  constructor() {
    this.player = new Player();
    this.pipes = [];
    this.isGameOver = false;
    this.canvasHeight = 480; // Match the canvas height from index.html
    this.canvasWidth = 854; // Match the canvas width from index.html
    this.pipeSpawnTimer = 0;
  }

  update() {
    if (this.isGameOver) return;

    this.player.update();

    // Check for game over condition (player falls below screen)
    if (this.player.y > this.canvasHeight) {
      this.isGameOver = true;
    }

    // Spawn new pipes every 100 updates.
    this.pipeSpawnTimer++;
    if (this.pipeSpawnTimer >= 100) {
      this.pipes.push(new Pipe(this.canvasHeight, this.canvasWidth));
      this.pipeSpawnTimer = 0;
    }

    // Update pipes.
    for (let i = this.pipes.length - 1; i >= 0; i--) {
      this.pipes[i].update();
      // Remove the first pipe if off screen.
      if (i == 0 && this.pipes[0].isOffscreen()) {
        this.pipes.shift();
      }
    }
  }
}

module.exports = Game;
