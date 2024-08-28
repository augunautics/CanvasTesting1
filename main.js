document.addEventListener('DOMContentLoaded', () => {
  // Set up the container
  const container = document.getElementById('canvasContainer');
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.backgroundColor = 'white';

  // Create the canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'myCanvas';
  canvas.width = 1000; // Set initial width based on the window size
  canvas.height = 400 * (canvas.width / 1000); // Scale height based on initial aspect ratio
  canvas.style.backgroundColor = 'blue';
  canvas.style.position = 'absolute';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.width = `${canvas.width}px`; // Set CSS width
  canvas.style.height = `${canvas.height}px`; // Set CSS height

  // Append the canvas to the container
  container.appendChild(canvas);

  // Initialize variables to track width changes
  let lastWidth = window.innerWidth;

  // Handle window resizing
  document.addEventListener('DOMContentLoaded', () => {
    let lastWidth = window.innerWidth;  // Store the initial width of the window

    window.addEventListener('resize', () => {
        let currentWidth = window.innerWidth; // Get the current width of the window
        let widthChange = currentWidth - lastWidth; // Calculate the change in width
        
        // Update the canvas dimensions based on the change
        canvas.width += widthChange;
        canvas.height = 400 * (canvas.width / 1000); // Adjust height to maintain the aspect ratio
        
        // Update the CSS styles to reflect new dimensions
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px`;

        lastWidth = currentWidth; // Update lastWidth to the current width for the next resize event
    });
});

});
