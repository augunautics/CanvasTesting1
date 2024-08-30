export default class Transparency {
    constructor(image, spriteSize, sourceX, sourceY, worldCanvas, imageCtx) {
        this.image = image;
        this.spriteSize = spriteSize;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
        this.worldCanvas = worldCanvas;
        this.imageCtx = imageCtx;
        this.transparentColor = this.getTransparentColor(); // Now an instance method
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

    applyTransparency(imageData) {
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

        return imageData;
    }

    renderToCanvas(destX, destY, destWidth, destHeight) {
        // Clear the canvas before drawing
        this.imageCtx.clearRect(0, 0, this.imageCtx.canvas.width, this.imageCtx.canvas.height);

        // Redraw the entire background before drawing Mario
        this.worldCanvas.drawWorldImage();

        const offScreenCanvas = document.createElement('canvas');
        const offScreenCtx = offScreenCanvas.getContext('2d');

        offScreenCanvas.width = this.spriteSize;
        offScreenCanvas.height = this.spriteSize;

        // Draw Mario's sprite on the off-screen canvas
        offScreenCtx.drawImage(
            this.image,
            this.sourceX, this.sourceY,
            this.spriteSize, this.spriteSize,
            0, 0,
            this.spriteSize, this.spriteSize
        );

        // Get the image data
        let imageData = offScreenCtx.getImageData(0, 0, this.spriteSize, this.spriteSize);

        // Apply transparency to the image data
        imageData = this.applyTransparency(imageData);

        // Put the modified image data back to the off-screen canvas
        offScreenCtx.putImageData(imageData, 0, 0);

        // Draw the modified image data onto the main canvas
        this.imageCtx.drawImage(
            offScreenCanvas,
            0, 0,
            this.spriteSize, this.spriteSize,
            destX, destY,
            destWidth, destHeight
        );
    }
}
