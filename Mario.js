import Entity from './Entity.js';

export default class Mario extends Entity {
    constructor(imageCtx, aspectRatio, image, worldCanvas, startX, startY) {
        super(imageCtx, aspectRatio, startX, startY, image, worldCanvas);
        this.sourceX = 0;
        this.sourceY = 8;
    }
}
