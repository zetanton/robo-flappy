export class Background {
  constructor(canvasWidth, canvasHeight) {
    this.width = canvasWidth;
    this.height = canvasHeight;
  }

  draw(ctx) {
    // Factory background
    const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(1, '#333');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);

    // Grid pattern
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < this.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < this.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
  }
}