import * as text from "./text.js";

const fishPath = './content/fish.png';
const flippedFishPath = './content/flippedFish.png';
const hookPath = './content/hook.png';

let fish = new Image();
let flippedFish = new Image();
let hook = new Image();
let fishLoaded = 0;
var fishDirection = 0;
var countFrame = 0;
var register = false;

var currentText = 0;

// Kepp track of da fish
const fishLocation = {
    x: 50,
    y: 50,
};

// Hook cords
const hookLocation = {
    x: 50,
    y: 50,
};

// Load the fish and also flipped one and hook
fish.src = fishPath;
fish.onload = () => fishLoaded++;

flippedFish.src = flippedFishPath;
flippedFish.onload = () => fishLoaded++;

hook.src = hookPath;
// Cant botherd with this on load stuff anymore, i assume it will load with the
// amount of time it takes to get from local storage
// I bet even a floppy drive can load it fast enough for this to work

var moveHelp;
var avoidHelp;

function load(global){
    register = true;

    moveHelp = new text.Text('Try moving with A and D', 30, '#fff', global.canvas)
    avoidHelp = new text.Text('Try not to get hit by the hook', 30, '#fff', global.canvas)
}

function update(global){
    if(register){
        if(global.keys['a']){
            fishLocation.x = fishLocation.x - 0.2;
            fishDirection = 0;
        }
        if(global.keys['d']){
            fishLocation.x = fishLocation.x + 0.2;
            fishDirection = 1;
        }
        
        countFrame++;
    }

    if(countFrame === 60 * 2){ // No delta time cause I can't be bothered
        currentText = 1;
    }

    if(countFrame === 60 * 10){
        currentText = 2;
    }

    if(countFrame === 60 * 16){
        currentText = 3;
    }
}

function draw(global){
    if(register){
        const ctx = global.canvas.ctx;
        if (fishLoaded == 2) {
            const fishImg = fishDirection === 0 ? fish : flippedFish;
            ctx.drawImage(fishImg, fishLocation.x / 100 * global.canvas.canvas.width, fishLocation.y / 100 * global.canvas.canvas.height, 100, 100);
        }

        if(currentText === 1){
            moveHelp.append(false, true, 0.5, 0.8);
        }
        if(currentText === 2){
            avoidHelp.append(false, true, 0.5, 0.8);
        }
        if(currentText === 3){
            ctx.drawImage(hook, (hookLocation.y / 100 * global.canvas.canvas.width), ((-1070 + (hookLocation.x / 100 * global.canvas.canvas.width))), 499 / 4.99, 5649 / 4.99);
        }
    }
}

export { update, draw, load };