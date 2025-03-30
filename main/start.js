import * as text from "./text.js";
import * as cloudSky from "./cloudsky.js";
import * as startingGame from "./startinggame.js";

const seaPath = './content/sea.jpg';

let starterCount = 0;

let sea = new Image();
let seaLoaded = false;

// Square properties
const seaLocation = {
    x: 1,
    y: 1,
};

// Load the sea
sea.src = seaPath;
sea.onload = () => seaLoaded = true;

var startText;

function load(global){
    startText = new text.Text('Click space to start', 30, '#fff', global.canvas)
}

function update(global){
    if(global.start.gameStarted && starterCount < 1200){
        cloudSky.up();
        starterCount = starterCount + 4;
    }

    if(starterCount === 1200){
        startingGame.load(global);
    }

    startingGame.update(global);
}

function draw(global){
    if (seaLoaded) {
        global.canvas.ctx.drawImage(sea, seaLocation.x, seaLocation.y - starterCount, global.canvas.canvas.width, (global.canvas.canvas.height / 320) * 2043);
    }

    cloudSky.draw(global);
    startingGame.draw(global);

    // Draw text
    if(!global.start.gameStarted){
        startText.append(true, true);
    }
}

export { update, draw, load };