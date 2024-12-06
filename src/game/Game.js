import { Robot } from './Robot.js';
import { Obstacle } from './Obstacle.js';
import { GameState } from './GameState.js';
import { Background } from './Background.js';
import { AudioManager } from './AudioManager.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.robot = new Robot(50, canvas.height/2);
    this.obstacles = [];
    this.gameState = new GameState();
    this.background = new Background(canvas.width, canvas.height);
    this.frameCount = 0;
    this.audioManager = new AudioManager();
    
    this.setupEventListeners();
    this.reset(false);
  }

  reset(playStartSounds = false) {
    this.robot = new Robot(50, this.canvas.height/2);
    this.obstacles = [];
    this.gameState.reset();
    this.frameCount = 0;
    this.audioManager.stopBackgroundMusic();
    
    if (playStartSounds) {
      this.audioManager.playBeginSound();
      this.audioManager.playBackgroundMusic();
    }
  }

  setupEventListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!this.gameState.gameStarted) {
          this.gameState.startGame();
          this.audioManager.playBeginSound();
          this.audioManager.playBackgroundMusic();
        } else if (this.gameState.isGameOver) {
          this.reset(true);
        } else {
          this.robot.flap();
          this.audioManager.playThrusterSound();
        }
      }
    });

    window.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (!this.gameState.gameStarted) {
        this.gameState.startGame();
        this.audioManager.playBeginSound();
        this.audioManager.playBackgroundMusic();
      } else if (this.gameState.isGameOver) {
        this.reset(true);
      } else {
        this.robot.flap();
        this.audioManager.playThrusterSound();
      }
    }, { passive: false });
  }

  update() {
    if (!this.gameState.gameStarted || this.gameState.isGameOver) return;

    this.frameCount++;
    
    // Add new obstacles
    if (this.frameCount % 100 === 0) {
      this.obstacles.push(new Obstacle(this.canvas.width, this.canvas.height));
    }

    this.robot.update();

    // Update and filter obstacles
    this.obstacles = this.obstacles.filter(obstacle => {
      obstacle.update();
      
      // Check for collision
      if (obstacle.hits(this.robot)) {
        this.gameState.isGameOver = true;
        this.audioManager.stopBackgroundMusic();
        this.audioManager.playFailSound();
      }
      
      // Score point when passing obstacle
      if (obstacle.x + obstacle.width < this.robot.x && !obstacle.scored) {
        obstacle.scored = true;
        this.gameState.updateScore();
      }
      
      return obstacle.x > -obstacle.width;
    });
  }

  draw() {
    this.background.draw(this.ctx);
    
    this.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
    this.robot.draw(this.ctx);
    this.gameState.draw(this.ctx, this.canvas.width, this.canvas.height);
  }

  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}