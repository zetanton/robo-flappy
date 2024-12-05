export class Obstacle {
  constructor(canvasWidth, canvasHeight) {
    this.x = canvasWidth;
    this.width = 50;
    this.gapHeight = 150;
    this.speed = 3;
    this.canvasHeight = canvasHeight;
    this.top = Math.random() * (canvasHeight - this.gapHeight - 100) + 50;
    this.bottom = this.top + this.gapHeight;
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    // Factory pipe style
    const gradient = ctx.createLinearGradient(this.x, 0, this.x + this.width, 0);
    gradient.addColorStop(0, '#4a4a4a');
    gradient.addColorStop(0.5, '#666');
    gradient.addColorStop(1, '#4a4a4a');

    // Top pipe
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x, 0, this.width, this.top);
    
    // Bottom pipe
    ctx.fillRect(this.x, this.bottom, this.width, this.canvasHeight);

    // Pipe edges
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, 0, this.width, this.top);
    ctx.strokeRect(this.x, this.bottom, this.width, this.canvasHeight - this.bottom);
  }

  hits(robot) {
    if (robot.y < 0 || robot.y + robot.size > this.canvasHeight) return true;
    
    if (robot.x + robot.size > this.x && robot.x < this.x + this.width) {
      if (robot.y < this.top || robot.y + robot.size > this.bottom) {
        return true;
      }
    }
    return false;
  }
}