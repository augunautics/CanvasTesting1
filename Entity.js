export default class Entity {
    constructor(imageCtx, aspectRatio, spriteSize, startX, startY, image) {
        this.imageCtx = imageCtx;
        this.aspectRatio = aspectRatio;
        this.spriteSize = spriteSize;
        this.destX = startX;
        this.destY = startY;
        this.image = image;

        // Gravity-related properties
        this.velocityY = 0;
        this.gravity = 0.5;
        this.groundLevel = null;
    }

    applyGravity() {
        this.velocityY += this.gravity;
        this.destY += this.velocityY;

        if (this.groundLevel !== null) {
            // Collision detection with the ground
            const entityBottomY = this.destY + this.spriteSize * this.aspectRatio;
            if (entityBottomY >= this.groundLevel) {
                this.destY = this.groundLevel - this.spriteSize * this.aspectRatio; // Align with ground
                this.velocityY = 0; // Stop falling
            }
        }
    }

    draw(sourceX, sourceY) {
        const sourceWidth = this.spriteSize;
        const sourceHeight = this.spriteSize;
        const destWidth = this.spriteSize * this.aspectRatio;
        const destHeight = this.spriteSize * this.aspectRatio;

        this.imageCtx.drawImage(
            this.image,
            sourceX, sourceY,
            sourceWidth, sourceHeight,
            this.destX, this.destY,
            destWidth, destHeight
        );
    }

    update(sourceX, sourceY) {
        this.applyGravity();
        this.draw(sourceX, sourceY);
    }

    setGroundLevel(groundLevel) {
        this.groundLevel = groundLevel;
    }

    start(sourceX, sourceY) {
        const updateLoop = () => {
            this.update(sourceX, sourceY);
            requestAnimationFrame(updateLoop);
        };
        updateLoop();
    }
}
