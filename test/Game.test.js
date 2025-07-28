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
      expect(game.score).to.equal(0);
      expect(game.highScore).to.equal(0);
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

  describe('checkPassedPipe', () => {
    it('should increment score when a pipe is passed', () => {
      const game = new Game();
      game.player = {
        x: 50,
        radius: 10
      };
      const pipe = new Pipe(game.canvasHeight, game.canvasWidth);
      pipe.x = game.player.x - game.player.radius - pipe.width - 1; // Pipe is just past the player
      game.pipes.push(pipe);

      game.checkPassedPipe();

      expect(game.score).to.equal(1);
      expect(pipe.passed).to.be.true;
    });

    it('should update high score if current score is greater', () => {
      const game = new Game();
      game.player = {
        x: 50,
        radius: 10
      };
      game.score = 5;
      game.highScore = 5;
      const pipe = new Pipe(game.canvasHeight, game.canvasWidth);
      pipe.x = game.player.x - game.player.radius - pipe.width - 1; // Pipe is just past the player
      game.pipes.push(pipe);

      game.checkPassedPipe();

      expect(game.score).to.equal(6);
      expect(game.highScore).to.equal(6);
      expect(pipe.passed).to.be.true;
    });

    it('should not increment score if pipe has already been passed', () => {
      const game = new Game();
      game.player = {
        x: 50,
        radius: 10
      };
      const pipe = new Pipe(game.canvasHeight, game.canvasWidth);
      pipe.x = game.player.x - game.player.radius - pipe.width - 1; // Pipe is just past the player
      pipe.passed = true; // Manually set to passed
      game.pipes.push(pipe);

      game.checkPassedPipe();

      expect(game.score).to.equal(0); // Score should not increment
    });

    it('should not increment score if player has not passed the pipe', () => {
      const game = new Game();
      game.player = {
        x: 50,
        radius: 10
      };
      const pipe = new Pipe(game.canvasHeight, game.canvasWidth);
      pipe.x = game.player.x + 10; // Pipe is still in front of the player
      game.pipes.push(pipe);

      game.checkPassedPipe();

      expect(game.score).to.equal(0); // Score should not increment
    });

    it('should not update score if game is over', () => {
      const game = new Game();
      game.isGameOver = true;
      game.player = {
        x: 50,
        radius: 10
      };
      const pipe = new Pipe(game.canvasHeight, game.canvasWidth);
      pipe.x = game.player.x - game.player.radius - pipe.width - 1; // Pipe is just past the player
      game.pipes.push(pipe);

      game.checkPassedPipe();

      expect(game.score).to.equal(0); // Score should not increment
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

  describe('isGameOver property', () => {
    it('should set gameOverTime when isGameOver is set to true', () => {
      const game = new Game();
      game.gameOverTime = Date.now() - 5000; // Set to a past time

      const beforeSet = Date.now();
      game.isGameOver = true;
      const afterSet = Date.now();

      expect(game.gameOverTime).to.be.at.least(beforeSet);
      expect(game.gameOverTime).to.be.at.most(afterSet);
    });

    it('should not change gameOverTime when isGameOver is set to false', () => {
      const game = new Game();
      const initialGameOverTime = Date.now() - 5000; // Set to a past time
      game.gameOverTime = initialGameOverTime;

      game.isGameOver = false;

      expect(game.gameOverTime).to.equal(initialGameOverTime);
    });
  });

  describe('reset', () => {
    it('should reset the game state except for high score', () => {
      const game = new Game();
      const originalPlayer = game.player;
      game.pipes.push(new Pipe(game.canvasHeight, game.canvasWidth));
      game.isGameOver = true;
      game.score = 10;
      game.highScore = 20;
      game.pipeSpawnTimer = 42;

      game.reset();

      expect(game.pipes).to.be.an('array').that.is.empty;
      expect(game.player).to.be.an.instanceOf(Player);
      expect(game.player).to.not.equal(originalPlayer);
      expect(game.isGameOver).to.be.false;
      expect(game.score).to.equal(0);
      expect(game.highScore).to.equal(20);
      expect(game.pipeSpawnTimer).to.equal(0);
    });
  });
});
