import BackgroundCanvas from './BackgroundCanvas.js';
import WorldCanvas from './WorldCanvas.js';
import Ground from './Ground.js';
import Mario from './Mario.js';

// Load images and data, then use the classes as needed
const backgroundCanvas = new BackgroundCanvas(worldCanvasWidth, worldCanvasHeight, borderSize);
const worldCanvas = new WorldCanvas(scaledWidth, scaledHeight, borderSize);
const ground = new Ground(worldCanvas, tiledDataArray, aspectRatio);
const mario = new Mario(worldCanvas, marioImage, spriteSize, aspectRatio);

// Draw the world image onto the world canvas
worldCanvas.drawImage(worldImage, 0, 0, originalWidth, croppedHeight, 0, 0, scaledWidth, scaledHeight);

// Draw the ground
ground.draw();

// Draw Mario and apply gravity in the game loop
function gameLoop() {
    worldCanvas.clear();
    worldCanvas.drawImage(worldImage, 0, 0, originalWidth, croppedHeight, 0, 0, scaledWidth, scaledHeight);
    ground.draw();
    mario.applyGravity();
    mario.checkCollision(tiledDataArray);
    mario.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
