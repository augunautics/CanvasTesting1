export default class Entity {
    constructor(imageCtx, aspectRatio, spriteSize, startX, startY, image) {
        this.imageCtx = imageCtx;
        this.aspectRatio = aspectRatio;
        this.spriteSize = spriteSize;
        this.destX = startX;
        this.destY = startY;
        this.image = image;

        // Gravity-related properties
        this.velocityY = 0;
        this.gravity = 0.5;
        this.groundLevel = null; // Initialize groundLevel to null
        this.isOnGround = false;
    }

    applyGravity() {
        if (!this.isOnGround) {
            this.velocityY += this.gravity;
            this.destY += this.velocityY;

            if (this.groundLevel !== null) {
                // Collision detection with the ground
                const entityBottomY = this.destY + this.spriteSize * this.aspectRatio;
                if (entityBottomY > this.groundLevel) {
                    this.destY = this.groundLevel - this.spriteSize * this.aspectRatio; // Align with ground
                    this.velocityY = 0; // Stop falling
                    this.isOnGround = true;
                    console.log("Mario has collided with the ground and stopped falling.");
                }
            }
        } else {
            // Force Mario to stay at the ground level after collision
            this.destY = this.groundLevel - this.spriteSize * this.aspectRatio;
        }
    }

    draw(sourceX, sourceY) {
        const sourceWidth = this.spriteSize;
        const sourceHeight = this.spriteSize;
        const destWidth = this.spriteSize * this.aspectRatio;
        const destHeight = this.spriteSize * this.aspectRatio;

        this.imageCtx.drawImage(
            this.image,
            sourceX, sourceY,
            sourceWidth, sourceHeight,
            this.destX, this.destY,
            destWidth, destHeight
        );
    }

    update(sourceX, sourceY) {
        this.applyGravity();
        this.draw(sourceX, sourceY);
    }

    setGroundLevel(ground) {
        let closestGround = null;
        let minDistance = Infinity;
    
        // Loop through all ground tiles to find the closest one below Mario
        for (let tiledData of ground.tiledDataArray) {
            const groundTopY = tiledData.y * this.aspectRatio;
            const groundBottomY = groundTopY + tiledData.height * this.aspectRatio;
    
            // Check if Mario is above the current tile (considering its x and width)
            if (this.destX >= tiledData.x * this.aspectRatio && this.destX <= (tiledData.x + tiledData.width) * this.aspectRatio) {
                // Check if the ground is directly below Mario and find the closest one
                if (this.destY + this.spriteSize * this.aspectRatio <= groundBottomY) {
                    const distance = groundTopY - (this.destY + this.spriteSize * this.aspectRatio);
                    if (distance >= 0 && distance < minDistance) {
                        closestGround = tiledData;
                        minDistance = distance;
                    }
                }
            }
        }
    
        // Set groundLevel based on the closest ground tile
        if (closestGround) {
            this.groundLevel = closestGround.y * this.aspectRatio;
            console.log(`Setting Ground Level to: ${this.groundLevel} based on closest ground tile.`);
        } else {
            console.log('No ground tile found directly below Mario.');
            this.groundLevel = null; // No ground found, so set groundLevel to null
        }
    
        this.isOnGround = false; // Reset the flag when ground level is set
    }
    

    start(sourceX, sourceY) {
        const updateLoop = () => {
            this.update(sourceX, sourceY);
            requestAnimationFrame(updateLoop);
        };
        updateLoop();
    }
}
