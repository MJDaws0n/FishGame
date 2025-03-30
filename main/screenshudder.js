let lastGlitchTime = 0;       
const glitchDuration = 1000;  // Glitch lasts for ~1 second

// Preload glitch sounds
const glitchSounds = [
    new Audio('/content/sounds/glitch1.mp3'),
    new Audio('/content/sounds/glitch2.mp3'),
    new Audio('/content/sounds/glitch3.mp3')
];

function load(global) {
    const canvas = global.canvas.canvas;
    const ctx = global.canvas.ctx;

    // Set sound volumes low for subtle creepiness
    glitchSounds.forEach(sound => {
        sound.volume = 0.3;
    });
}

function update(global) {
    const now = performance.now();

    // Trigger glitch every 5+ seconds
    if (now - lastGlitchTime > 5000 && Math.random() < 0.05) {  
        lastGlitchTime = now;

        // Play a random glitch sound (reset each time glitch occurs)
        const randomSound = glitchSounds[Math.floor(Math.random() * glitchSounds.length)];
        randomSound.currentTime = 0;  // Reset to start
        randomSound.play();
    }
}

function draw(global) {
    const canvas = global.canvas.canvas;
    const ctx = global.canvas.ctx;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const now = performance.now();
    const glitchActive = (now - lastGlitchTime) < glitchDuration;

    if (glitchActive) {
        // **Intense Horizontal Line Shift**
        const maxShift = 50;  
        for (let y = 0; y < canvas.height; y += 5) {
            const shiftAmount = (Math.random() * maxShift - maxShift / 2) | 0;
            const start = (y * canvas.width + shiftAmount) * 4;
            const end = (y * canvas.width + canvas.width) * 4;
            data.copyWithin(start, end - canvas.width * 4, end);
        }

        // **Strong Color Channel Offset**
        for (let i = 0; i < data.length; i += 4) {
            if (Math.random() < 0.1) {
                data[i] = data[i + 8] || 0;     // Heavy red shift
                data[i + 1] = data[i + 12] || 0; // Heavy green shift
                data[i + 2] = data[i + 16] || 0; // Heavy blue shift
            }
        }

        // **Intense Noise Overlay**
        for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 100;
            data[i] += noise;     // Red
            data[i + 1] += noise; // Green
            data[i + 2] += noise; // Blue
        }

        // **Flash "WAKE UP" Text**
        ctx.save();
        ctx.font = `${Math.random() > 0.5 ? 60 : 80}px "Courier New", monospace`;
        ctx.fillStyle = `rgba(255, 0, 0, ${Math.random() * 0.7 + 0.3})`;  // Flickering opacity
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Slightly randomized position for creepiness
        const x = canvas.width / 2 + (Math.random() * 20 - 10);
        const y = canvas.height / 2 + (Math.random() * 20 - 10);

        ctx.fillText("WAKE UP", x, y);
        ctx.restore();
    }

    // Draw the modified image data
    ctx.putImageData(imageData, 0, 0);
}

export { update, draw, load };
