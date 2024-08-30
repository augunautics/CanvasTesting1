import Entity from './Entity.js';

export default class Mario extends Entity {
    constructor(imageCtx, aspectRatio, image, worldCanvas, startX, startY) {
        super(imageCtx, aspectRatio, startX, startY, image, worldCanvas);
        this.sourceX = 0;
        this.sourceY = 8;
    }

    update(sourceX, sourceY) {
        // Custom updates for Mario, if needed
        super.update(sourceX, sourceY);
    }

    start() {
        const updateLoop = () => {
            this.update(this.sourceX, this.sourceY);
            requestAnimationFrame(updateLoop);
        };
        updateLoop();
    }
}
