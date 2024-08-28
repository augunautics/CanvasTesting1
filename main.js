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

  // Call the function with the image context and aspect ratio
  drawGround(imageCtx, aspectRatio);

  // Draw the Mario image when it's loaded
  marioImage.onload = () => {
    mario(imageCtx, aspectRatio);
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

// Function to draw rectangles from Tiled data
function drawGround(imageCtx, aspectRatio) {
  imageCtx.strokeStyle = 'red';
  imageCtx.lineWidth = 2; // Set the border width

  // Array of Tiled data inside the function
  const tiledDataArray = [
    {
      height: 16,
      id: 5,
      name: "",
      rotation: 0,
      type: "",
      visible: true,
      width: 1104,
      x: 0,
      y: 208
    },
    {
      height: 16,
      id: 6,
      name: "",
      rotation: 0,
      type: "",
      visible: true,
      width: 240,
      x: 1136,
      y: 208
    },
    {
      height: 16,
      id: 7,
      name: "",
      rotation: 0,
      type: "",
      visible: true,
      width: 1024,
      x: 1424,
      y: 208
    },
    {
      height: 16,
      id: 8,
      name: "",
      rotation: 0,
      type: "",
      visible: true,
      width: 896,
      x: 2480,
      y: 208
    }
  ];

  // Iterate over the data to draw each rectangle
  tiledDataArray.forEach(tiledData => {
    imageCtx.strokeRect(
      tiledData.x * aspectRatio,
      tiledData.y * aspectRatio,
      tiledData.width * aspectRatio,
      tiledData.height * aspectRatio
    ); // Draw the outline of the rectangle at the position and size based on the Tiled data
  });
}

function mario(imageCtx, aspectRatio) {
  // Source rectangle (portion of the image to draw)
  const sourceX = 0; // Starting x-coordinate of the source rectangle
  const sourceY = 8; // Starting y-coordinate of the source rectangle
  const sourceWidth = spriteSize; // Width of the source rectangle
  const sourceHeight = spriteSize; // Height of the source rectangle

  // Destination rectangle (where to draw on the canvas)
  const destX = 50; // Destination x-coordinate on the canvas
  const destY = 50; // Destination y-coordinate on the canvas
  const destWidth = spriteSize * aspectRatio; // Width of the destination rectangle (scaled)
  const destHeight = spriteSize * aspectRatio; // Height of the destination rectangle (scaled)

  imageCtx.strokeStyle = 'red';
  imageCtx.lineWidth = 2; // Set the border width
  imageCtx.drawImage(
    marioImage,         // Source image
    sourceX, sourceY,   // Source x, y (start of the 16x16 sprite)
    sourceWidth, sourceHeight,  // Source width, height (size of the 16x16 sprite)
    destX, destY,       // Destination x, y (position on the canvas)
    destWidth, destHeight // Destination width, height (scaled size on the canvas)
  );

  imageCtx.strokeRect(destX, destY, destWidth, destHeight);
}
