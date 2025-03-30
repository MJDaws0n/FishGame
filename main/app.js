import * as global from "./global.js";
import * as start from "./start.js";
import * as keys from "./keys.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

global.canvas.canvas = canvas;
global.canvas.ctx = ctx;

// Resize canvas to fullscreen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// For the files to have a default load behaviour
start.load(global);
keys.load(global);

function update() {
    start.update(global);
    keys.update(global);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    start.draw(global);
    keys.draw(global);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();