class Text{
    text;    
    colour;
    size;
    canvas;

    bounceYOffset = 0;
    bounceYOffsetInterval = 0.5;
    bounceYOffsetIntervalMax = 8;
    bounceframeInterval = 1;
    bounceframeIntervalCount = 0;

    constructor(textActualWords, size, colour, canvas){ // You better love my really creative vaiable names 'textActualWords'
        this.text = textActualWords;
        this.canvas = canvas;

        this.colour = colour;
        this.size = size;
    }

    append(center, bounce, x = 0.5, y = 0.5, relative = true) {
        const canvas = this.canvas;
        const text = this.text;
        const size = this.size;
        const colour = this.colour;
        const bounceYOffset = this.bounceYOffset;
        const bounceYOffsetInterval = this.bounceYOffsetInterval;
        const bounceYOffsetIntervalMax = this.bounceYOffsetIntervalMax;
        const frameInterval = this.bounceframeInterval;
        const frameIntervalCount = this.bounceframeIntervalCount;

        // Set the font
        canvas.ctx.font = `${size}px "Fredoka One", cursive`;
        canvas.ctx.fillStyle = colour;
        
        // Add text shadow
        canvas.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        canvas.ctx.shadowOffsetX = 2;
        canvas.ctx.shadowOffsetY = 2;
        canvas.ctx.shadowBlur = 4;
    
        // Calculate the width for centering the text.
        const textWidth = canvas.ctx.measureText(text).width;
    
        if (center) {
            // Center horizontally based on text width and vertically at half canvas height.
            canvas.ctx.fillText(text, (canvas.canvas.width - textWidth) / 2, (canvas.canvas.height / 2) + bounceYOffset);
        } else if (relative) {
            // Treat x and y as percentages of the canvas dimensions.
            canvas.ctx.fillText(text, (canvas.canvas.width - textWidth) * x, (canvas.canvas.height * y) + bounceYOffset);
        } else {
            // Use x and y as absolute positions.
            canvas.ctx.fillText(text, x, (y + bounceYOffset));
        }

        // Increase the bounce offset for next rendered frame
        if (!bounce) {
            bounce = 0;
        }

        if ((bounceYOffsetInterval > 0 && bounceYOffset + bounceYOffsetInterval > bounceYOffsetIntervalMax) ||
            (bounceYOffsetInterval < 0 && bounceYOffset + bounceYOffsetInterval < -bounceYOffsetIntervalMax)) {
            this.bounceYOffsetInterval = -bounceYOffsetInterval;
        } else {
            if(frameIntervalCount < frameInterval){
                this.bounceframeIntervalCount = frameIntervalCount + 1;
            } else {
                this.bounceYOffset = bounceYOffset + bounceYOffsetInterval;
                this.bounceframeIntervalCount = 0;
            }
        }
    
    }
}

export { Text };