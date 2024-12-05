export class GameState {
  constructor() {
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
    this.isGameOver = false;
    this.gameStarted = false;
  }

  updateScore() {
    this.score++;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore);
    }
  }

  reset() {
    this.score = 0;
    this.isGameOver = false;
  }

  startGame() {
    this.gameStarted = true;
  }

  draw(ctx, canvasWidth, canvasHeight) {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = '24px Orbitron';
    
    // Always show score and high score at the top
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${this.score}`, 10, 30);
    ctx.fillText(`High Score: ${this.highScore}`, 10, 60);

    if (!this.gameStarted) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      ctx.fillStyle = '#0f0';
      ctx.font = '48px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('ROBO FLAPPY', canvasWidth/2, canvasHeight/2 - 40);
      
      // Create a pulsing effect for the start text
      const pulse = Math.sin(Date.now() / 500) * 0.2 + 0.8;
      ctx.globalAlpha = pulse;
      ctx.font = '24px Orbitron';
      ctx.fillText('PRESS SPACE TO START', canvasWidth/2, canvasHeight/2 + 20);
      ctx.globalAlpha = 1;
      
      // Instructions
      ctx.font = '16px Orbitron';
      ctx.fillStyle = '#888';
      ctx.fillText('Use SPACE to activate thrusters', canvasWidth/2, canvasHeight/2 + 60);
    }

    if (this.isGameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      ctx.fillStyle = '#ff0000';
      ctx.font = '48px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('SYSTEM FAILURE', canvasWidth/2, canvasHeight/2 - 20);
      
      ctx.fillStyle = '#0f0';
      ctx.font = '24px Orbitron';
      ctx.fillText('PRESS SPACE TO REBOOT', canvasWidth/2, canvasHeight/2 + 40);
    }
    
    ctx.textAlign = 'left';
  }
}