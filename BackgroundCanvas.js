export default class BackgroundCanvas {
    constructor(width, height, borderSize) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = width + 2 * borderSize;
        this.canvas.height = height + 2 * borderSize;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0px';
        this.canvas.style.left = '0px';

        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        document.body.appendChild(this.canvas);
    }

    setLeftPosition(left) {
        this.canvas.style.left = `${left}px`;
    }

    getLeftPosition() {
        return parseInt(this.canvas.style.left, 10);
    }
}
