
// Get the canvas and its 2D rendering context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Import the Player class (this will be handled by the browser's module system or script order)
// For now, we assume Player is globally available due to script order in index.html

// Create a new Player instance
const player = new Player();

// Function to draw the player (currently a circle)
function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

// Main game loop (for now, just drawing)
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player
  drawPlayer();

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
