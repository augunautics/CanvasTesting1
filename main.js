import GameEngine from './GameEngine.js';

// Disable all scrollbars
document.body.style.overflow = 'hidden';

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
    // Initialize and start the game engine with the required images
    const gameEngine = new GameEngine({ worldImage, marioImage });
    gameEngine.start();

    
})
.catch((error) => {
    console.error('Error loading images:', error);
});
