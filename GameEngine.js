import Constants from './Constants'; // Adjust the path as necessary

export default class GameEngine {
    constructor(isOnGround = false, velocityY = 0, destY = 0, groundLevel = null) {
        this.isOnGround = isOnGround;
        this.velocityY = velocityY;
        this.gravity = Constants.GRAVITY;
        this.destY = destY;
        this.groundLevel = groundLevel;
        this.spriteSize = Constants.SPRITE_SIZE;
        this.aspectRatio = Constants.ASPECT_RATIO;
    }

    applyGravity() {
        if (!this.isOnGround) {
            this.velocityY += this.gravity;
            this.destY += this.velocityY;

            if (this.groundLevel !== null) {
                const entityBottomY = this.destY + this.spriteSize * this.aspectRatio;
                if (entityBottomY > this.groundLevel) {
                    this.destY = this.groundLevel - this.spriteSize * this.aspectRatio; // Align with ground
                    this.velocityY = 0; // Stop falling
                    this.isOnGround = true;
                    console.log("Mario has collided with the ground and stopped falling.");
                }
            }
        } else {
            this.destY = this.groundLevel - this.spriteSize * this.aspectRatio;
        }
    }
}
