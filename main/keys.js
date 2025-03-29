const keys = {};

// Keyboard input handling
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false)

function update(global){
    if (keys[' '] && !global.start.gameStarted) global.start.gameStarted = true;
}

function draw(global){

}

export { update, draw };