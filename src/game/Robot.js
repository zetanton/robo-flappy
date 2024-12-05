export class Robot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.gravity = 0.5;
    this.lift = -8;
    this.size = 30;
    this.exhaustParticles = [];
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  flap() {
    this.velocity = this.lift;
    this.isJumping = true;
    this.jumpTimer = 10;
    
    // Add exhaust particles
    for (let i = 0; i < 5; i++) {
      this.exhaustParticles.push({
        x: this.x + this.size/2,
        y: this.y + this.size,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2 + 2,
        life: 20
      });
    }
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    
    if (this.jumpTimer > 0) {
      this.jumpTimer--;
    } else {
      this.isJumping = false;
    }
    
    // Update exhaust particles
    this.exhaustParticles = this.exhaustParticles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;
      return particle.life > 0;
    });
  }

  draw(ctx) {
    // Draw exhaust particles
    this.exhaustParticles.forEach(particle => {
      const alpha = particle.life / 20;
      ctx.fillStyle = `rgba(255, 100, 0, ${alpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Robot body
    ctx.fillStyle = '#666';
    ctx.fillRect(this.x, this.y, this.size, this.size);
    
    // Eye with glow effect
    ctx.fillStyle = '#00ff00';
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur = 10;
    ctx.fillRect(this.x + this.size - 10, this.y + 5, 5, 5);
    ctx.shadowBlur = 0;
    
    // Antenna
    ctx.strokeStyle = '#888';
    ctx.beginPath();
    ctx.moveTo(this.x + this.size/2, this.y);
    ctx.lineTo(this.x + this.size/2, this.y - 10);
    ctx.stroke();
    
    // Exhaust pipe
    ctx.fillStyle = '#444';
    ctx.fillRect(this.x + this.size/2 - 5, this.y + this.size, 10, 5);
    
    // Exhaust flame when jumping
    if (this.isJumping) {
      const gradient = ctx.createLinearGradient(
        this.x + this.size/2,
        this.y + this.size + 5,
        this.x + this.size/2,
        this.y + this.size + 20
      );
      gradient.addColorStop(0, '#ff4400');
      gradient.addColorStop(1, 'rgba(255, 68, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(this.x + this.size/2 - 5, this.y + this.size + 5);
      ctx.lineTo(this.x + this.size/2, this.y + this.size + 20);
      ctx.lineTo(this.x + this.size/2 + 5, this.y + this.size + 5);
      ctx.fill();
    }
  }
}