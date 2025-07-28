
const { expect } = require('chai');
const Pipe = require('../public/Pipe.js');

describe('Pipe', () => {
  it('should be instantiated with properties based on canvas dimensions', () => {
    // Note that these are not necessarily the actual game resolution.
    const canvasWidth = 320;
    const canvasHeight = 480;

    const pipe = new Pipe(canvasHeight, canvasWidth);

    const minHeight = 50;
    expect(pipe.width).toBe(80);
    expect(pipe.gap).toBe(200);
    expect(pipe.x).toBe(canvasWidth);
    expect(pipe.speedX).toBe(-3);
    expect(pipe.y).toBeGreaterThanOrEqual(minHeight);
    expect(pipe.y).toBeLessThanOrEqual(canvasHeight - pipe.gap - minHeight);
  });
});
