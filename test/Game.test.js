
const { expect } = require('chai');
const Game = require('../public/Game.js');
const Player = require('../public/Player.js');

describe('Game', () => {
  describe('constructor', () => {
    it('should initialize with a player, empty pipes array, and game not over', () => {
      const game = new Game();

      expect(game.player).to.be.an.instanceOf(Player);
      expect(game.isGameOver).to.be.false;
      expect(game.pipes).to.be.an('array').that.is.empty;
    });
  });

  it('should set isGameOver to true if player falls below the screen', () => {
    const game = new Game();
    game.player.y = 480; // Set player at the bottom edge of the screen (canvas height)

    game.update(); // One update should make it fall below

    expect(game.isGameOver).to.be.true;
  });
});
