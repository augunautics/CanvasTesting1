export default class Mario {
    constructor(worldCanvas, marioImage, spriteSize, aspectRatio) {
        this.ctx = worldCanvas.ctx;
        this.image = marioImage;
        this.spriteSize = spriteSize;
        this.aspectRatio = aspectRatio;
        this.x = 50; // initial position
        this.y = 50; // initial position
        this.gravity = 0.5;
        this.velocityY = 0;
    }

    draw() {
        const sourceX = 0;
        const sourceY = 8;
        const sourceWidth = this.spriteSize;
        const sourceHeight = this.spriteSize;

        const destWidth = this.spriteSize * this.aspectRatio;
        const destHeight = this.spriteSize * this.aspectRatio;

        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 2;
        this.ctx.drawImage(
            this.image,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            this.x,
            this.y,
            destWidth,
            destHeight
        );

        this.ctx.strokeRect(this.x, this.y, destWidth, destHeight);
    }

    applyGravity() {
        this.velocityY += this.gravity;
        this.y += this.velocityY;
    }

    checkCollision(groundArray) {
        for (const ground of groundArray) {
            const groundTop = ground.y * this.aspectRatio;
            const groundBottom = groundTop + ground.height * this.aspectRatio;

            if (this.y + this.spriteSize * this.aspectRatio >= groundTop && this.y <= groundBottom) {
                this.y = groundTop - this.spriteSize * this.aspectRatio;
                this.velocityY = 0;
            }
        }
    }
}
