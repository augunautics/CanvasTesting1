import Mario from './Mario.js';
import Ground from './Ground.js';

// Disable all scrollbars
document.body.style.overflow = 'hidden';

// Set the aspect ratio constant
const aspectRatio = 4;
const spriteSize = 16; // Base size of the sprite
const borderSize = 20;

// Create a function to set up a canvas
function createCanvas(width, height, bgColor, positionTop, positionLeft) {
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

// Load the world image and adjust the canvas sizes accordingly
const worldImage = new Image();
worldImage.src = 'world1-1.png'; // Update with the image path

// Load the Mario image
const marioImage = new Image();
marioImage.src = 'mario.png'; // Update with the Mario image path

worldImage.onload = () => {
  // Crop the image to half its height minus spriteSize pixels
  const croppedHeight = worldImage.height / 2 - spriteSize; // this is good
  const originalWidth = worldImage.width;

  // Scale the cropped height and the original width to fill the world canvas
  const scaledHeight = croppedHeight * aspectRatio;
  const scaledWidth = originalWidth * aspectRatio;

  // Set the world canvas dimensions
  const worldCanvasWidth = scaledWidth + 2 * borderSize;
  const worldCanvasHeight = scaledHeight + 2 * borderSize;

  // Set up the black world background canvas (scaled size)
  const worldCanvas = createCanvas(worldCanvasWidth, worldCanvasHeight, 'black', 0, 0);

  // Set up the canvas to draw the cropped and scaled image
  const imageCanvas = createCanvas(scaledWidth, scaledHeight, 'transparent', borderSize, borderSize);

  // Draw the cropped and scaled image onto the canvas
  const imageCtx = imageCanvas.getContext('2d');
  imageCtx.drawImage(
    worldImage,                       // Source image
    0, 0,                             // Source x, y (start from the top-left of the image)
    originalWidth, croppedHeight,     // Source width, height (full width, cropped height)
    0, 0,                             // Destination x, y (start at the top-left of the canvas)
    scaledWidth, scaledHeight         // Destination width, height (scaled width and height)
  );

  // Draw the red rectangle outline
  const rectX = worldImage.height - spriteSize * aspectRatio; // X position of the rectangle
  const rectWidth = 69 * spriteSize * aspectRatio;
  const rectHeight = spriteSize * aspectRatio;

  const ground = new Ground(imageCtx, aspectRatio);
  ground.draw();

  const marioImage = new Image();
  marioImage.src = 'mario.png'; // Update with the Mario image path
  
  marioImage.onload = () => {
      const mario = new Mario(imageCtx, aspectRatio, marioImage);
      mario.draw();
  };

  // Variables to track the current position of the canvases
  let canvasX = 0;

  // Handle keydown events for left and right arrow keys
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      canvasX += 100; // Move canvases right (view moves left)
    } else if (event.key === 'ArrowRight') {
      canvasX -= 100; // Move canvases left (view moves right)
    }

    // Ensure the canvases stay within the bounds of the world canvas
    const maxCanvasX = 0;
    const minCanvasX = window.innerWidth - worldCanvasWidth;

    canvasX = Math.max(minCanvasX, Math.min(maxCanvasX, canvasX));

    // Update the position of both canvases
    worldCanvas.style.left = `${canvasX}px`;
    imageCanvas.style.left = `${canvasX + borderSize}px`; // Image remains aligned within the world canvas
  });
};
