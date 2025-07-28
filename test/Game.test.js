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

  describe('checkCollision', () => {
    it('should set isGameOver to true if player collides with the left side of the upper pipe', () => {
      const game = new Game();
      game.player.x = 50; // Player center x
      game.player.y = 100; // Player center y
      game.player.radius = 10;
      const pipe = new Pipe(game.canvasHeight, game.canvasWidth);
      pipe.x = 55; // Pipe left edge
      pipe.width = 30;
      pipe.y = 110; // Bottom of upper pipe
      game.pipes.push(pipe);

      game.checkCollision();

      expect(game.isGameOver).to.be.true;
    });

    it('should set isGameOver to true if player collides with the bottom of the upper pipe', () => {
      const game = new Game();
      game.player.x = 100; // Player center x
      game.player.y = 100; // Player center y
      game.player.radius = 10;
      const pipe = new Pipe(game.canvasHeight, game.canvasWidth);
      pipe.x = 90; // Pipe left edge
      pipe.width = 30;
      pipe.y = 95; // Bottom of upper pipe
      game.pipes.push(pipe);

      game.checkCollision();

      expect(game.isGameOver).to.be.true;
    });

    it('should set isGameOver to true if player collides with the left side of the lower pipe', () => {
      const game = new Game();
      game.player.x = 50; // Player center x
      game.player.y = 200; // Player center y
      game.player.radius = 10;
      const pipe = new Pipe(game.canvasHeight, game.canvasWidth);
      pipe.x = 55; // Pipe left edge
      pipe.width = 30;
      pipe.y = 100; // Bottom of upper pipe
      pipe.gap = 50; // Gap size
      game.pipes.push(pipe);

      game.checkCollision();

      expect(game.isGameOver).to.be.true;
    });

    it('should set isGameOver to true if player collides with the top of the lower pipe', () => {
      const game = new Game();
      game.player.x = 100; // Player center x
      game.player.y = 160; // Player center y
      game.player.radius = 10;
      const pipe = new Pipe(game.canvasHeight, game.canvasWidth);
      pipe.x = 90; // Pipe left edge
      pipe.width = 30;
      pipe.y = 145; // Bottom of upper pipe
      pipe.gap = 20; // Gap size
      game.pipes.push(pipe);

      game.checkCollision();

      expect(game.isGameOver).to.be.true;
    });

    it('should not set isGameOver to true if player is in the gap', () => {
      const game = new Game();
      game.player.x = 100; // Player center x
      game.player.y = 150; // Player center y
      game.player.radius = 10;
      const pipe = new Pipe(game.canvasHeight, game.canvasWidth);
      pipe.x = 90; // Pipe left edge
      pipe.width = 30;
      pipe.y = 150 - 11 ; // Bottom of upper pipe
      pipe.gap = 21; // Gap size, just bigger than player
      game.pipes.push(pipe);

      game.checkCollision();

      expect(game.isGameOver).to.be.false;
    });
  });
});
