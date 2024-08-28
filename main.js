document.addEventListener('DOMContentLoaded', () => {
    // Style the body and html to fill the viewport and disable scrolling
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden'; // Disable scroll bars
    document.body.style.backgroundColor = 'white';

    // Style and append the container
    const container = document.getElementById('canvasContainer');
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.backgroundColor = 'white';

    // Create and style the canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'myCanvas';
    canvas.width = 1000; // Set initial width based on the window size
    canvas.height = 400 * (canvas.width / 1000); // Scale height based on the initial aspect ratio
    canvas.style.backgroundColor = 'blue';
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = `${canvas.width}px`; // Set CSS width
    canvas.style.height = `${canvas.height}px`; // Set CSS height

    // Append the canvas to the container
    container.appendChild(canvas);

    // Initialize canvas position
    let canvasPosition = 0; // This will handle the horizontal position of the canvas

    // Event listener for key presses to move the canvas
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        const step = 20; // Number of pixels to move the canvas horizontally

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

    // Resize listener to adjust canvas size dynamically while maintaining aspect ratio
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
