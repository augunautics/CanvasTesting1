export default class WorldCanvas {
  constructor(width, height, borderSize) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.position = 'absolute';
      this.canvas.style.top = `${borderSize}px`;
      this.canvas.style.left = `${borderSize}px`;

      this.ctx = this.canvas.getContext('2d');
      document.body.appendChild(this.canvas);
  }

  drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
      this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  setLeftPosition(left) {
      this.canvas.style.left = `${left}px`;
  }

  getLeftPosition() {
      return parseInt(this.canvas.style.left, 10);
  }

  clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
