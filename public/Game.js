
class Game {
  constructor() {
    this.player = new Player();
    this.isGameOver = false;
    this.canvasHeight = 480; // Match the canvas height from index.html
  }

  update() {
    if (this.isGameOver) return;

    this.player.update();

    // Check for game over condition (player falls below screen)
    if (this.player.y > this.canvasHeight) {
      this.isGameOver = true;
    }
  }
}
