import Mario from './Mario.js';
import Ground from './Ground.js';
import WorldCanvas from './WorldCanvas.js';

// Disable all scrollbars
document.body.style.overflow = 'hidden';

// Set the aspect ratio constant
const aspectRatio = 4;
const spriteSize = 16; // Base size of the sprite
const borderSize = 20;

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
    loadImage('world1-1.png'), // Update with the world image path
    loadImage('mario.png')     // Update with the Mario image path
])
.then(([worldImage, marioImage]) => {
    // Create the world canvas
    const worldCanvas = new WorldCanvas(worldImage, aspectRatio, spriteSize, borderSize);

    // Draw the ground
    const ground = new Ground(worldCanvas.getImageContext(), aspectRatio);
    ground.draw();

    // Draw Mario
    const mario = new Mario(worldCanvas.getImageContext(), aspectRatio, marioImage);
    mario.draw();
})
.catch((error) => {
    console.error('Error loading images:', error);
});
