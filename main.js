import './style.css';

const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.querySelector('#app').innerHTML = '';
document.querySelector('#app').appendChild(canvas);

import { Game } from './src/game/Game.js';

const game = new Game(canvas);
game.gameLoop();