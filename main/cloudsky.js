const clouds = [
    {
        x: Math.floor(Math.random() * (90 - 10 + 1)) + 10, // Percentage of the canvas width
        y: 1, // Percentage of the canvas height
        speed: (Math.random() * (0.3 - 0.05) + 0.05) * (Math.random() < 0.5 ? 1 : -1),
        image: Math.floor(Math.random() * 3)
    }, 
    {
        x: Math.floor(Math.random() * (90 - 10 + 1)) + 10,
        y: 8,
        speed: (Math.random() * (0.3 - 0.05) + 0.05) * (Math.random() < 0.5 ? 1 : -1),
        image: Math.floor(Math.random() * 3)
    },
    {
        x: Math.floor(Math.random() * (90 - 10 + 1)) + 10,
        y: 16,
        speed: (Math.random() * (0.3 - 0.05) + 0.05) * (Math.random() < 0.5 ? 1 : -1),
        image: Math.floor(Math.random() * 3)
    },
    {
        x: Math.floor(Math.random() * (90 - 10 + 1)) + 10,
        y: 24,
        speed: (Math.random() * (0.3 - 0.05) + 0.05) * (Math.random() < 0.5 ? 1 : -1),
        image: Math.floor(Math.random() * 3)
    },
    {
        x: Math.floor(Math.random() * (90 - 10 + 1)) + 10,
        y: 32,
        speed: (Math.random() * (0.3 - 0.05) + 0.05) * (Math.random() < 0.5 ? 1 : -1),
        image: Math.floor(Math.random() * 3)
    }
];

// Load the cloud images
var cloudStage = 0;

const cloudImages = [
    new Image(),
    new Image(),
    new Image()
];
cloudImages[0].src = '/content/cloud1.png';
cloudImages[0].onload = () => cloudStage++;

cloudImages[1].src = '/content/cloud2.png';
cloudImages[1].onload = () => cloudStage++;

cloudImages[2].src = '/content/cloud3.png';
cloudImages[2].onload = () => cloudStage++;

function draw(global){
    // Draw the clouds
    if(cloudStage === 3){
        for(let i = 0; i < clouds.length; i++){
            global.canvas.ctx.drawImage(cloudImages[clouds[i].image], clouds[i].x * global.canvas.canvas.width / 100, clouds[i].y  * global.canvas.canvas.height / 100, 225, 87);
            clouds[i].x = (clouds[i].x + clouds[i].speed / 10000 * global.canvas.canvas.width) % global.canvas.canvas.width;
        }
    }
}

function up(){
    for(let i = 0; i < clouds.length; i++){
        clouds[i].y = clouds[i].y - 0.42;
    }
}

export { draw, up };