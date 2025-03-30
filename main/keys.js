const keys = {};

var global = []; // Temporary global object so we don't get errors

// Keyboard input handling
window.addEventListener('keydown', (e) => {
    keys[e.key] = true
    global.keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false
    global.keys[e.key] = false;
})

function load(actualGlobal){
    global = actualGlobal;
}

function update(global){
    if (keys[' '] && !global.start.gameStarted) global.start.gameStarted = true;
}

function draw(global){

}

export { update, draw, load };