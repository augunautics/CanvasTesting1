import Entity from './Entity.js';

export default class Mario extends Entity {
    constructor(imageCtx, aspectRatio, marioImage, worldCanvas, startX, startY) {
        super(imageCtx, aspectRatio, 16, startX, startY, marioImage);
        this.worldCanvas = worldCanvas;
        this.sourceX = 0;
        this.sourceY = 8;

        // Automatically determine the transparent color based on the first pixel
        this.transparentColor = this.getTransparentColor();
    }

    getTransparentColor() {
        // Create an off-screen canvas to analyze the sprite
        const offScreenCanvas = document.createElement('canvas');
        const offScreenCtx = offScreenCanvas.getContext('2d');

        // Set the size of the off-screen canvas to the sprite size
        offScreenCanvas.width = this.spriteSize;
        offScreenCanvas.height = this.spriteSize;

        // Draw the sprite on the off-screen canvas
        offScreenCtx.drawImage(
            this.image,
            this.sourceX, this.sourceY,
            this.spriteSize, this.spriteSize,
            0, 0,
            this.spriteSize, this.spriteSize
        );

        // Get the first pixel's color (top-left corner)
        const imageData = offScreenCtx.getImageData(0, 0, 1, 1);
        const pixel = imageData.data;

        // Return the RGB value of the first pixel
        return { r: pixel[0], g: pixel[1], b: pixel[2] };
    }

    draw(sourceX, sourceY) {
        const sourceWidth = this.spriteSize;
        const sourceHeight = this.spriteSize;
        const destWidth = this.spriteSize * this.aspectRatio;
        const destHeight = this.spriteSize * this.aspectRatio;

        // Clear the canvas before drawing
        this.imageCtx.clearRect(0, 0, this.imageCtx.canvas.width, this.imageCtx.canvas.height);

        // Redraw the entire background before drawing Mario
        this.worldCanvas.drawWorldImage();

        // Create an off-screen canvas to check transparency
        const offScreenCanvas = document.createElement('canvas');
        const offScreenCtx = offScreenCanvas.getContext('2d');

        offScreenCanvas.width = sourceWidth;
        offScreenCanvas.height = sourceHeight;

        // Draw Mario's sprite on the off-screen canvas
        offScreenCtx.drawImage(
            this.image,
            sourceX, sourceY,
            sourceWidth, sourceHeight,
            0, 0,
            sourceWidth, sourceHeight
        );

        // Get the image data
        const imageData = offScreenCtx.getImageData(0, 0, sourceWidth, sourceHeight);
        const pixels = imageData.data;

        // Replace the "transparent" color with actual transparency
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            // Skip drawing the pixel if it's the transparent color
            if (r === this.transparentColor.r && g === this.transparentColor.g && b === this.transparentColor.b) {
                pixels[i + 3] = 0; // Set the alpha to 0 (fully transparent)
            }
        }

        // Put the modified image data back to the off-screen canvas
        offScreenCtx.putImageData(imageData, 0, 0);

        // Draw the modified image data onto the main canvas
        this.imageCtx.drawImage(
            offScreenCanvas,
            0, 0,
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
