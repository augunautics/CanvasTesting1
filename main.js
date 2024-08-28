const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let canvasWidth = 2000; // Set a large width to enable scrolling
const canvasHeight = 600; // Fixed height of the canvas

let scrollX = 0; // Initial scroll position

// Resize the canvas to fit the window width while maintaining the fixed height
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = canvasHeight; // Keeping height constant

  draw(); // Redraw the canvas upon resizing
}

// Draw everything on the canvas
function draw() {
  ctx.setTransform(1, 0, 0, 1, -scrollX, 0); // Translate canvas based on scrollX

  // Clear the canvas
  ctx.clearRect(scrollX, 0, canvas.width + scrollX, canvas.height);

  // Draw blue background over the entire canvas width
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, canvasWidth, canvas.height);

  // Draw a red box that scales with the canvas height
  const scaleFactor = canvas.height / canvasHeight; // Scale factor based on height
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 10, 16 * scaleFactor, 16 * scaleFactor); // Scaled 16x16 red box
}

// Event listener for keyboard input to handle left and right scrolling
function handleKeyDown(event) {
  const speed = 30; // Speed of scrolling
  if (event.key === 'ArrowRight') {
    scrollX = Math.min(scrollX + speed, canvasWidth - window.innerWidth);
  } else if (event.key === 'ArrowLeft') {
    scrollX = Math.max(scrollX - speed, 0);
  }
  draw(); // Redraw the canvas with the new scroll position
}

// Attach event listeners
window.addEventListener('resize', resizeCanvas);
window.addEventListener('keydown', handleKeyDown);

// Initial setup and draw
resizeCanvas();
