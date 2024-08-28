export default class WorldCanvas {
    constructor(width, height, bgColor, positionTop, positionLeft) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.position = 'absolute';
      this.canvas.style.top = `${positionTop}px`;
      this.canvas.style.left = `${positionLeft}px`;
  
      this.ctx = this.canvas.getContext('2d');
      this.ctx.fillStyle = bgColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
      document.body.appendChild(this.canvas);
    }
  
    drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
      this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    setStrokeStyle(color) {
      this.ctx.strokeStyle = color;
    }
  
    setLineWidth(width) {
      this.ctx.lineWidth = width;
    }
  
    strokeRect(x, y, width, height) {
      this.ctx.strokeRect(x, y, width, height);
    }
  }
  