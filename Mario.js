import Entity from './Entity.js';

export default class Mario extends Entity {
    constructor(imageCtx, aspectRatio, marioImage, startX, startY) {
        super(imageCtx, aspectRatio, 16, startX, startY, marioImage);
        this.sourceX = 0;
        this.sourceY = 8;
    }

    start() {
        super.start(this.sourceX, this.sourceY);
    }
}
