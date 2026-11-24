import backgroundMusic from '/sounds/background.mp3'
import thrusterSound from '/sounds/thruster.mp3'
import beginSound from '/sounds/begin.mp3'
import failSound from '/sounds/fail.mp3'

export class AudioManager {
  constructor() {
    this.backgroundMusic = new Audio(backgroundMusic);
    this.thrusterSound = new Audio(thrusterSound);
    this.beginSound = new Audio(beginSound);
    this.failSound = new Audio(failSound);

    // Configure background music
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3;

    // Configure thruster sound
    this.thrusterSound.volume = 0.15;
    this.thrusterSound.loop = true; // Make it loopable
    this.isThrusterPlaying = false;
  }

  playBackgroundMusic() {
    this.backgroundMusic.play().catch(e => console.log("Background music failed:", e));
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  playThrusterSound() {
    if (!this.isThrusterPlaying) {
      this.isThrusterPlaying = true;
      this.thrusterSound.play()
        .then(() => {
          // Gradually increase volume
          this.thrusterSound.volume = 0;
          setTimeout(() => this.thrusterSound.volume = 0.10, 45);
        })
        .catch(e => console.log("Thruster sound failed:", e));
      
      // Stop the sound after a short delay
      setTimeout(() => {
        this.thrusterSound.volume = 0;
        setTimeout(() => {
          this.thrusterSound.pause();
          this.isThrusterPlaying = false;
        }, 50);
      }, 200);
    }
  }

  playBeginSound() {
    this.beginSound.play().catch(e => console.log("Begin sound failed:", e));
  }

  playFailSound() {
    this.failSound.play().catch(e => console.log("Fail sound failed:", e));
  }
} 