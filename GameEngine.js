import WorldCanvas from './WorldCanvas.js';
import Ground from './Ground.js';
import Mario from './Mario.js';
import Constants from './Constants.js';

export default class GameEngine {
    constructor({ worldImage, marioImage }) {
        this.worldCanvas = new WorldCanvas(worldImage, Constants.aspectRatio, Constants.spriteSize, Constants.borderSize);
        this.ground = new Ground(this.worldCanvas.getImageContext(), Constants.aspectRatio);

        // Initialize Mario
        this.mario = new Mario(this.worldCanvas.getImageContext(), Constants.aspectRatio, marioImage, this.worldCanvas, 50, 50);

        // Set Mario's ground level
        this.setGroundLevel(this.mario);

        // Gravity-related properties
        this.velocityY = Constants.velocityY;
        this.gravity = Constants.gravity;
    }

    start() {
        const gameLoop = () => {
            // Clear the canvas
            this.worldCanvas.getImageContext().clearRect(0, 0, this.worldCanvas.getImageContext().canvas.width, this.worldCanvas.getImageContext().canvas.height);

            // Apply gravity and update Mario's position
            if (this.mario) {
                this.applyGravity(this.mario);  // Apply gravity to Mario
                this.mario.update();            // Update Mario's position and draw
            }

            // Redraw the ground with the red border
            this.ground.draw();

            // Continue the loop
            requestAnimationFrame(gameLoop);
        };

        // Start the game loop
        gameLoop();
    }

    setGroundLevel(entity) {
        let closestGround = null;
        let minDistance = Infinity;

        // Loop through all ground tiles to find the closest one below the entity
        for (let tiledData of this.ground.tiledDataArray) {
            const groundTopY = tiledData.y * this.aspectRatio;
            const groundBottomY = groundTopY + tiledData.height * this.aspectRatio;

            // Check if the entity is above the current tile (considering its x and width)
            if (entity.destX >= tiledData.x * this.aspectRatio && entity.destX <= (tiledData.x + tiledData.width) * this.aspectRatio) {
                // Check if the ground is directly below the entity and find the closest one
                if (entity.destY + entity.spriteSize * this.aspectRatio <= groundBottomY) {
                    const distance = groundTopY - (entity.destY + entity.spriteSize * this.aspectRatio);
                    if (distance >= 0 && distance < minDistance) {
                        closestGround = tiledData;
                        minDistance = distance;
                    }
                }
            }
        }

        // Set groundLevel based on the closest ground tile
        if (closestGround) {
            const groundLevel = closestGround.y * this.aspectRatio;
            console.log(`Setting Ground Level to: ${groundLevel} based on closest ground tile.`);
            entity.setGroundLevel(groundLevel);
        } else {
            console.log('No ground tile found directly below the entity.');
            entity.setGroundLevel(null); // No ground found, so set groundLevel to null
        }
    }

    applyGravity(entity) {
        if (!entity.isOnGround) {
            this.velocityY += this.gravity;
            entity.destY += this.velocityY;

            if (entity.groundLevel !== null) {
                const entityBottomY = entity.destY + entity.spriteSize * this.aspectRatio;
                if (entityBottomY > entity.groundLevel) {
                    entity.destY = entity.groundLevel - entity.spriteSize * this.aspectRatio;
                    this.velocityY = 0;
                    entity.isOnGround = true;
                    console.log("Entity has collided with the ground and stopped falling.");
                }
            }
        } else {
            entity.destY = entity.groundLevel - entity.spriteSize * this.aspectRatio;
        }
    }
}
