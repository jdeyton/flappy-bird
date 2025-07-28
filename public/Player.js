
class Player {
  constructor() {
    this.x = 50; // Default starting X position
    this.y = 240; // Default starting Y position (center of 480 height)
    this.radius = 10; // Player radius
    this.velocityY = 0;
    this.gravity = 0.5; // Default gravity value
    this.jumpForce = 8; // Default jump force value
  }

  flap() {
    this.velocityY = -this.jumpForce;
  }

  update() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    // Prevent player from going above the screen
    if (this.y < 0) {
      this.y = 0;
      this.velocityY = 0;
    }
  }
}

module.exports = Player;


