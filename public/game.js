
// Get the canvas and its 2D rendering context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Import the Player class (this will be handled by the browser's module system or script order)
// For now, we assume Player is globally available due to script order in index.html

const Game = require('./Game.js');

// Create a new Game instance
const game = new Game();

// Function to draw the player
function drawPlayer() {
  ctx.beginPath();
  ctx.arc(game.player.x, game.player.y, game.player.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

// Main game loop (for now, just drawing)
function drawPipes() {
  game.pipes.forEach(pipe => {
    // Upper pipe
    ctx.fillStyle = 'green';
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.y);
    // Lower pipe
    ctx.fillRect(pipe.x, pipe.y + pipe.gap, pipe.width, canvas.height - (pipe.y + pipe.gap));
  });
}

// Main game loop (for now, just drawing)
function drawScores() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`High Score: ${game.highScore}`, 10, 30);
  ctx.fillText(`Current Score: ${game.score}`, 10, 60);
}

function gameLoop() {
  // Update game state
  game.update();

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawPipes();
  drawScores();

  requestAnimationFrame(gameLoop);
}

// Add event listener for player flap
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    game.player.flap();
  }
});

// Start the game loop
gameLoop();
