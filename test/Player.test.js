
const { expect } = require('chai');
const Player = require('../public/Player.js');

describe('Player', () => {
  describe('constructor', () => {
    it('should initialize the player at default coordinates', () => {
      const player = new Player();
      expect(player.x).to.equal(50);
      expect(player.y).to.equal(240);
    });

    it('should initialize vertical velocity to 0', () => {
      const player = new Player();
      expect(player.velocityY).to.equal(0);
    });

    it('should initialize default gravity and jump force', () => {
      const player = new Player();
      expect(player.gravity).to.equal(0.5);
      expect(player.jumpForce).to.equal(8);
    });
  });

  describe('update', () => {
    it('should apply gravity and update velocity and position', () => {
      const player = new Player();
      const initialY = player.y;
      const initialVelocityY = player.velocityY;
      player.update();
      expect(player.velocityY).to.equal(initialVelocityY + player.gravity);
      expect(player.y).to.equal(initialY + initialVelocityY + player.gravity);
    });

    it('should not allow player to go above the top of the screen', () => {
      const player = new Player();
      player.y = -10; // Set player above the screen
      player.update();
      expect(player.y).to.equal(0); // Should be clamped to 0 (or radius if we add it)
      expect(player.velocityY).to.equal(0); // Velocity should be reset
    });

    it('should apply gravity cumulatively over multiple updates', () => {
      const player = new Player();
      const initialY = player.y;
      const initialVelocityY = player.velocityY;

      player.update(); // First update
      const yAfterOneUpdate = player.y;
      const velocityYAfterOneUpdate = player.velocityY;
      player.update(); // Second update

      // Expected velocity after two updates: initialVelocityY + gravity + gravity
      expect(player.velocityY).to.equal(initialVelocityY + (player.gravity * 2));
      // Expected y after two updates: initialY + (initialVelocityY + gravity) + (initialVelocityY + gravity + gravity)
      // Simplified: initialY + (velocity after 1st update) + (velocity after 2nd update)
      expect(player.y).to.equal(yAfterOneUpdate + velocityYAfterOneUpdate + player.gravity);
    });
  });
});
