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
    this.score = 0;
    this.highScore = 0;
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
    this.pipes.forEach(pipe => {
      pipe.update();
    });
    // The left-most pipe may be removed or might collide with the player.
    if (this.pipes.length > 0) {
      if (this.pipes[0].isOffscreen()) {
        this.pipes.shift();
      } else {
	this.checkCollision();
        this.checkPassedPipe();
      }
    }
  }

  checkCollision() {
    let pipe = this.pipes[0];
    // Collision with upper pipe
    if (
      this.player.x + this.player.radius > pipe.x &&
      this.player.x - this.player.radius < pipe.x + pipe.width &&
      this.player.y - this.player.radius < pipe.y
    ) {
      this.isGameOver = true;
    }

    // Collision with lower pipe
    if (
      this.player.x + this.player.radius > pipe.x &&
      this.player.x - this.player.radius < pipe.x + pipe.width &&
      this.player.y + this.player.radius > pipe.y + pipe.gap
    ) {
      this.isGameOver = true;
    }
  }

  checkPassedPipe() {
    if (this.isGameOver) return;
    let pipe = this.pipes[0];
    if (pipe.passed) return;

    // Check if pipe has passed the player
    if (pipe.x + pipe.width < this.player.x - this.player.radius) {
      pipe.passed = true;
      this.score++;
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }
    }
  }
}

module.exports = Game;
