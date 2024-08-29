export default class Entity {
    constructor(imageCtx, aspectRatio, spriteSize, startX, startY, image, worldCanvas) {
        this.imageCtx = imageCtx;
        this.aspectRatio = aspectRatio;
        this.spriteSize = spriteSize;
        this.destX = startX;
        this.destY = startY;
        this.worldCanvas = worldCanvas;

        // Image loading
        this.image = new Image();
        this.image.src = image;
        this.imageLoaded = false;

        this.image.onload = () => {
            this.imageLoaded = true;
        };

        // Gravity-related properties
        this.velocityY = 0;
        this.gravity = 0.5;
        this.groundLevel = null;
        this.isOnGround = false;
    }

    moveLeft() {
        this.destX -= 5; // Adjust speed as needed
        if (this.destX < 0) {
            this.destX = 0; // Prevent moving off the screen
        }
        this.updateWorldCanvas(-5); // Scroll world to the right as entity moves left
    }

    moveRight() {
        this.destX += 5; // Adjust speed as needed
        if (this.destX > this.imageCtx.canvas.width / 2) {
            this.destX = this.imageCtx.canvas.width / 2; // Limit entity to the center of the screen
        }
        this.updateWorldCanvas(5); // Scroll world to the left as entity moves right
    }

    updateWorldCanvas(offset) {
        // If the entity is near the middle of the screen, move the world
        if (this.destX >= this.imageCtx.canvas.width / 2) {
            this.worldCanvas.scroll(offset);
        }
    }

    applyGravity() {
        if (!this.isOnGround) {
            this.velocityY += this.gravity;
            this.destY += this.velocityY;

            if (this.groundLevel !== null) {
                const entityBottomY = this.destY + this.spriteSize * this.aspectRatio;
                if (entityBottomY > this.groundLevel) {
                    this.destY = this.groundLevel - this.spriteSize * this.aspectRatio;
                    this.velocityY = 0;
                    this.isOnGround = true;
                }
            }
        } else {
            this.destY = this.groundLevel - this.spriteSize * this.aspectRatio;
        }
    }

    draw(sourceX, sourceY) {
        if (this.imageLoaded) { // Only draw if the image is fully loaded
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
    }

    update(sourceX, sourceY) {
        this.applyGravity();
        this.draw(sourceX, sourceY);
    }

    setGroundLevel(ground) {
        let closestGround = null;
        let minDistance = Infinity;

        for (let tiledData of ground.tiledDataArray) {
            const groundTopY = tiledData.y * this.aspectRatio;
            const groundBottomY = groundTopY + tiledData.height * this.aspectRatio;

            if (this.destX >= tiledData.x * this.aspectRatio && this.destX <= (tiledData.x + tiledData.width) * this.aspectRatio) {
                if (this.destY + this.spriteSize * this.aspectRatio <= groundBottomY) {
                    const distance = groundTopY - (this.destY + this.spriteSize * this.aspectRatio);
                    if (distance >= 0 && distance < minDistance) {
                        closestGround = tiledData;
                        minDistance = distance;
                    }
                }
            }
        }

        if (closestGround) {
            this.groundLevel = closestGround.y * this.aspectRatio;
            console.log(`Setting Ground Level to: ${this.groundLevel} based on closest ground tile.`);
        } else {
            console.log('No ground tile found directly below entity.');
            this.groundLevel = null;
        }

        this.isOnGround = false;
    }

    start(sourceX, sourceY) {
        const updateLoop = () => {
            this.update(sourceX, sourceY);
            requestAnimationFrame(updateLoop);
        };

        // Delay the start until the image is loaded
        if (this.imageLoaded) {
            updateLoop();
        } else {
            this.image.onload = updateLoop;
        }
    }
}
