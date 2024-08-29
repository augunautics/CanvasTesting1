export default class Ground {
    constructor(worldCanvas, aspectRatio) {
        this.worldCanvas = worldCanvas;
        this.ctx = worldCanvas.ctx;
        this.aspectRatio = aspectRatio;

        // Define the ground tiles array within the class
        this.tiledDataArray = [
            { height: 16, width: 1104, x: 0, y: 208 },
            { height: 16, width: 240, x: 1136, y: 208 },
            { height: 16, width: 1024, x: 1424, y: 208 },
            { height: 16, width: 896, x: 2480, y: 208 }
        ];
    }

    draw() {
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 2; // Set the border width

        // Iterate over the data to draw each rectangle
        this.tiledDataArray.forEach(tiledData => {
            this.ctx.strokeRect(
                tiledData.x * this.aspectRatio,
                tiledData.y * this.aspectRatio,
                tiledData.width * this.aspectRatio,
                tiledData.height * this.aspectRatio
            ); // Draw the outline of the rectangle at the position and size based on the Tiled data
        });
    }
}
