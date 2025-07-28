
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
  });
});
