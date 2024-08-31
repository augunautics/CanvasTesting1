export default class Ground {
    constructor(imageCtx, aspectRatio) {
        this.imageCtx = imageCtx;
        this.aspectRatio = aspectRatio;
        this.tiledDataArray = [
            { height: 16, id: 5, name: "", rotation: 0, type: "", visible: true, width: 1104, x: 0, y: 208 },
            { height: 16, id: 6, name: "", rotation: 0, type: "", visible: true, width: 240, x: 1136, y: 208 },
            { height: 16, id: 7, name: "", rotation: 0, type: "", visible: true, width: 1024, x: 1424, y: 208 },
            { height: 16, id: 8, name: "", rotation: 0, type: "", visible: true, width: 896, x: 2480, y: 208 }
        ];
    }

    draw() {
        this.imageCtx.strokeStyle = 'red';  // Set the border color to red
        this.imageCtx.lineWidth = 2;        // Set the border width

        // Iterate over the data to draw each rectangle with the red border
        this.tiledDataArray.forEach(tiledData => {
            this.imageCtx.strokeRect(
                tiledData.x * this.aspectRatio,
                tiledData.y * this.aspectRatio,
                tiledData.width * this.aspectRatio,
                tiledData.height * this.aspectRatio
            ); // Draw the outline of the rectangle at the position and size based on the Tiled data
        });
    }
}
