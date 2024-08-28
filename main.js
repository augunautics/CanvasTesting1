// main.js file

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('myCanvas');
  let canvasPosition = 0;

  // Initially position the canvas at the left edge
  canvas.style.left = `${canvasPosition}px`;

  document.addEventListener('keydown', (event) => {
      const key = event.key;
      const step = 20; // Number of pixels to move the canvas

      if (key === 'ArrowRight') {
          // Move the canvas to the right
          canvasPosition -= step;
          canvas.style.left = `${canvasPosition}px`;
      } else if (key === 'ArrowLeft') {
          // Move the canvas to the left
          canvasPosition += step;
          canvas.style.left = `${canvasPosition}px`;
      }
  });
});
