import Transparency from './Transparency.js';
import Constants from './Constants.js';

export default class Entity {
    constructor(imageCtx, aspectRatio, startX, startY, image, worldCanvas) {
        this.imageCtx = imageCtx;
        this.aspectRatio = aspectRatio;
        this.spriteSize = Constants.spriteSize;  // Use the constant from the Constants class
        this.destX = startX;
        this.destY = startY;
        this.image = image;
        this.worldCanvas = worldCanvas;

        // Gravity-related properties
        this.velocityY = Constants.velocityY;  // Use the constant for initial velocity
        this.gravity = Constants.gravity;      // Use the constant for gravity
        this.groundLevel = null;               // Initialize groundLevel to null
        this.isOnGround = false;

        // Initialize the Transparency class
        this.transparency = new Transparency(image, this.spriteSize, 0, 8, worldCanvas, imageCtx);
    }

    draw() {
        const destWidth = this.spriteSize * this.aspectRatio;
        const destHeight = this.spriteSize * this.aspectRatio;

        // Use the Transparency class to render the entity with transparency applied
        this.transparency.renderToCanvas(this.destX, this.destY, destWidth, destHeight);
    }

    update(sourceX, sourceY) {
        //this.applyGravity();
        this.draw(sourceX, sourceY);
    }





}
