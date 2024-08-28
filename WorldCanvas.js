export default class WorldCanvas {
  constructor(width, height, positionTop, positionLeft) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.position = 'absolute';
      this.canvas.style.top = `${positionTop}px`;
      this.canvas.style.left = `${positionLeft}px`;

      this.ctx = this.canvas.getContext('2d');
      document.body.appendChild(this.canvas);
  }

  drawImage(image, sx, sy, swidth, sheight, dx, dy, dwidth, dheight) {
      this.ctx.drawImage(image, sx, sy, swidth, sheight, dx, dy, dwidth, dheight);
  }
}
