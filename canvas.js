export default class Canvas {
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
  }
  