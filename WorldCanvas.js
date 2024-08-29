export default class WorldCanvas {
  constructor(worldImage, aspectRatio, spriteSize, borderSize) {
      this.worldImage = worldImage;
      this.aspectRatio = aspectRatio;
      this.spriteSize = spriteSize;
      this.borderSize = borderSize;

      // Crop the image to half its height minus spriteSize pixels
      this.croppedHeight = this.worldImage.height / 2 - this.spriteSize;
      this.originalWidth = this.worldImage.width;

      // Scale the cropped height and the original width to fill the world canvas
      this.scaledHeight = this.croppedHeight * this.aspectRatio;
      this.scaledWidth = this.originalWidth * this.aspectRatio;

      // Set the world canvas dimensions
      this.worldCanvasWidth = this.scaledWidth + 2 * this.borderSize;
      this.worldCanvasHeight = this.scaledHeight + 2 * this.borderSize;

      // Create the canvases
      this.worldCanvas = this.createCanvas(this.worldCanvasWidth, this.worldCanvasHeight, 'black', 0, 0);
      this.imageCanvas = this.createCanvas(this.scaledWidth, this.scaledHeight, 'transparent', this.borderSize, this.borderSize);
      this.imageCtx = this.imageCanvas.getContext('2d');

      // Draw the world image
      this.drawWorldImage();

      // Initialize canvas position
      this.canvasX = 0;

      // Add event listener for movement
      this.addMovementListener();
  }

  createCanvas(width, height, bgColor, positionTop, positionLeft) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.style.position = 'absolute';
      canvas.style.top = `${positionTop}px`;
      canvas.style.left = `${positionLeft}px`;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      document.body.appendChild(canvas);
      return canvas;
  }

  drawWorldImage() {
      this.imageCtx.drawImage(
          this.worldImage,                    // Source image
          0, 0,                               // Source x, y (start from the top-left of the image)
          this.originalWidth, this.croppedHeight, // Source width, height (full width, cropped height)
          0, 0,                               // Destination x, y (start at the top-left of the canvas)
          this.scaledWidth, this.scaledHeight // Destination width, height (scaled width and height)
      );
  }

  addMovementListener() {
      document.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowLeft') {
              this.canvasX += 100; // Move canvases right (view moves left)
          } else if (event.key === 'ArrowRight') {
              this.canvasX -= 100; // Move canvases left (view moves right)
          }

          // Ensure the canvases stay within the bounds of the world canvas
          const maxCanvasX = 0;
          const minCanvasX = window.innerWidth - this.worldCanvasWidth;

          this.canvasX = Math.max(minCanvasX, Math.min(maxCanvasX, this.canvasX));

          // Update the position of both canvases
          this.worldCanvas.style.left = `${this.canvasX}px`;
          this.imageCanvas.style.left = `${this.canvasX + this.borderSize}px`; // Image remains aligned within the world canvas
      });
  }

  getImageContext() {
      return this.imageCtx;
  }
}
