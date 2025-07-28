
const { expect } = require('chai');
const Pipe = require('../public/Pipe.js');

describe('Pipe', () => {
  describe('constructor', () => {
    it('should be instantiated with properties based on canvas dimensions', () => {
      // Note that these are not necessarily the actual game resolution.
      const canvasWidth = 320;
      const canvasHeight = 480;

      const pipe = new Pipe(canvasHeight, canvasWidth);

      const minHeight = 50;
      expect(pipe.width).to.equal(80);
      expect(pipe.gap).to.equal(200);
      expect(pipe.x).to.equal(canvasWidth);
      expect(pipe.speedX).to.equal(-3);
      expect(pipe.y).to.be.at.least(minHeight);
      expect(pipe.y).to.be.at.most(canvasHeight - pipe.gap - minHeight);
    });
  });

  describe('update', () => {
    it('should update the x position', () => {
      const pipe = new Pipe(480, 320);
      const initialX = pipe.x;

      pipe.update();

      expect(pipe.x).to.equal(initialX + pipe.speedX);
    });
  });

  describe('isOffscreen', () => {
    it('should return true if the pipe is offscreen', () => {
      const pipe = new Pipe(480, 320);

      pipe.x = -pipe.width;

      expect(pipe.isOffscreen()).to.be.true;
    });

    it('should return false if the pipe is not offscreen', () => {
      const pipe = new Pipe(480, 320);

      pipe.x = -pipe.width + 1;

      expect(pipe.isOffscreen()).to.be.false;
    });
  });
});
