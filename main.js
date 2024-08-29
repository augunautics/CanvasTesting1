import Mario from './Mario.js';
import Ground from './Ground.js';
import WorldCanvas from './WorldCanvas.js';

// Disable all scrollbars
document.body.style.overflow = 'hidden';

// Set the aspect ratio constant
const aspectRatio = 4;
const spriteSize = 16;
const borderSize = 20;

let worldCanvas, mario, ground;

// Function to load an image and return a Promise
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// Load images with promises
Promise.all([
    loadImage('world1-1.png'),  // Background image
    loadImage('mario.png')      // Mario image
])
.then(([worldImage, marioImage]) => {
    worldCanvas = new WorldCanvas(worldImage, aspectRatio, spriteSize, borderSize);

    ground = new Ground(worldCanvas.getImageContext(), aspectRatio);
    ground.draw();

    // Calculate the ground's y-coordinate for collision detection
    const groundY = worldCanvas.getImageContext().canvas.height - 48; // Adjust based on ground's height
    mario = new Mario(worldCanvas.getImageContext(), aspectRatio, marioImage, worldCanvas, 50, 50);
    mario.setGroundLevel(groundY);
    mario.start();

    // Game loop is automatically managed by Mario's start method
})
.catch((error) => {
    console.error('Error loading images:', error);
});
