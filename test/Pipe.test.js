
const { expect } = require('chai');
const Pipe = require('../public/Pipe.js');

describe('Pipe', () => {
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
