const { expect } = require('chai');
const Game = require('../public/Game.js');
const Player = require('../public/Player.js');
const Pipe = require('../public/Pipe.js');

describe('Game', () => {
  describe('constructor', () => {
    it('should initialize with a player, empty pipes array, and game not over', () => {
      const game = new Game();

      expect(game.player).to.be.an.instanceOf(Player);
      expect(game.isGameOver).to.be.false;
      expect(game.pipes).to.be.an('array').that.is.empty;
    });
  });

  describe('update', () => {
    it('should set isGameOver to true if player falls below the screen', () => {
      const game = new Game();
      game.player.y = 480; // Set player at the bottom edge of the screen (canvas height)

      game.update(); // One update should make it fall below

      expect(game.isGameOver).to.be.true;
    });

    it('should add a new pipe when the spawn timer reaches the threshold', () => {
      const game = new Game();
      // Mock the player for these tests to prevent game over
      game.player = {
        update: () => {},
        y: 240 // Keep player y within bounds
      };
      // Run updates to spawn a pipe
      for (let i = 0; i < 100; i++) {
        game.update();
      }

      expect(game.pipes).to.have.lengthOf(1);
      expect(game.pipes[0]).to.be.an.instanceOf(Pipe);
    });

    it('should remove pipes that are offscreen', () => {
      const game = new Game();
      // Mock the player for these tests to prevent game over
      game.player = {
        update: () => {},
        y: 240 // Keep player y within bounds
      };
      const pipe = new Pipe(game.canvasHeight, game.canvasWidth);
      // Position the pipe so it goes offscreen after 2 updates
      pipe.x = -pipe.width + (2 * Math.abs(pipe.speedX)); // Pipe edge is at x = 6. 
      game.pipes.push(pipe);
      game.update();                                      // Pipe edge is at x = 3.
      expect(game.pipes).to.have.lengthOf(1);

      game.update();                                      // Pipe edge is at x = 0.

      expect(game.pipes).to.have.lengthOf(0);
    });
  });
});
