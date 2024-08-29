import Entity from './Entity.js';

export default class Mario extends Entity {
    constructor(imageCtx, aspectRatio, marioImage, worldCanvas, startX, startY) {
        super(imageCtx, aspectRatio, 16, startX, startY, marioImage);
        this.worldCanvas = worldCanvas;  // Assign worldCanvas here
        this.sourceX = 0;
        this.sourceY = 8;
    }

    draw(sourceX, sourceY) {
        const sourceWidth = this.spriteSize;
        const sourceHeight = this.spriteSize;
        const destWidth = this.spriteSize * this.aspectRatio;
        const destHeight = this.spriteSize * this.aspectRatio;

        // Clear the canvas before drawing
        this.imageCtx.clearRect(0, 0, this.imageCtx.canvas.width, this.imageCtx.canvas.height);

        // Redraw the entire background before drawing Mario
        this.worldCanvas.drawWorldImage();  // Now this should work

        // Draw Mario
        this.imageCtx.drawImage(
            this.image,
            sourceX, sourceY,
            sourceWidth, sourceHeight,
            this.destX, this.destY,
            destWidth, destHeight
        );
    }

    start() {
        const updateLoop = () => {
            this.update(this.sourceX, this.sourceY);
            requestAnimationFrame(updateLoop);
        };
        updateLoop();
    }
}
