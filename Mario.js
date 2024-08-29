export default class Mario {
    constructor(imageCtx, aspectRatio, marioImage) {
        this.imageCtx = imageCtx;
        this.aspectRatio = aspectRatio;
        this.spriteSize = 16; // As defined in main.js
        this.sourceX = 0; // Starting x-coordinate of the source rectangle
        this.sourceY = 8; // Starting y-coordinate of the source rectangle
        this.destX = 50; // Destination x-coordinate on the canvas
        this.destY = 50; // Destination y-coordinate on the canvas
        this.marioImage = marioImage; // The image of Mario passed to the constructor
    }

    draw() {
        const sourceWidth = this.spriteSize; // Width of the source rectangle
        const sourceHeight = this.spriteSize; // Height of the source rectangle
        const destWidth = this.spriteSize * this.aspectRatio; // Width of the destination rectangle (scaled)
        const destHeight = this.spriteSize * this.aspectRatio; // Height of the destination rectangle (scaled)

        this.imageCtx.strokeStyle = 'red';
        this.imageCtx.lineWidth = 2;
        this.imageCtx.drawImage(
            this.marioImage,
            this.sourceX, this.sourceY,
            sourceWidth, sourceHeight,
            this.destX, this.destY,
            destWidth, destHeight
        );
    }
}
