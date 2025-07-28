
// Get the canvas and its 2D rendering context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Create a new Game instance
const game = new Game();

// Function to draw the player (currently a circle)
function drawPlayer() {
  ctx.beginPath();
  ctx.arc(game.player.x, game.player.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

// Main game loop (for now, just drawing)
function gameLoop() {
  // Update game state
  game.update();

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  drawPlayer();

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
