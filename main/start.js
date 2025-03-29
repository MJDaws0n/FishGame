const seaPath = './content/sea.jpg';
const fishPath = './content/fish.png';

let starterCount = 0;

let sea = new Image();
let seaLoaded = false;

let fish = new Image();
let fishLoaded = false;

let showFish = false;

// Square properties
const seaLocation = {
    x: 1,
    y: 1,
};
const fishLocation = {
    x: 1,
    y: 1,
};

// Load the sea
sea.src = seaPath;
sea.onload = () => seaLoaded = true;

// Load the Fish
fish.src = fishPath;
fish.onload = () => fishLoaded = true;

function update(global){
    if(global.start.gameStarted && starterCount < 600){
        starterCount = starterCount + 10;
    }

    if(starterCount === 600){
        showFish = true;
    }
}

function draw(global){
    if (seaLoaded) {
        global.canvas.ctx.drawImage(sea, seaLocation.x, seaLocation.y - starterCount, global.canvas.canvas.width, global.canvas.canvas.height);
    }

    if(showFish){
        global.canvas.ctx.drawImage(fish, fishLocation.x, fishLocation.y, global.canvas.canvas.width, global.canvas.canvas.height);
    }

    // Draw text
    if(!global.start.gameStarted){
        const textWidth = global.canvas.ctx.measureText(`Press SPACE to start`).width;
        global.canvas.ctx.fillStyle = '#333';
        global.canvas.ctx.font = '24px Arial';
        global.canvas.ctx.fillText(`Press SPACE to start`, (global.canvas.canvas.width - textWidth) / 2, (global.canvas.canvas.height) / 2);
    }
}

export { update, draw };