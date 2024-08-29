import Entity from './Entity.js';

export default class Mario extends Entity {
    constructor(imageCtx, aspectRatio, spriteSize, startX, startY, image, worldCanvas) {
        super(imageCtx, aspectRatio, spriteSize, startX, startY, image, worldCanvas);
    }

    // Additional Mario-specific methods can be added here if needed
}
