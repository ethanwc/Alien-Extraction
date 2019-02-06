class Animation {
    constructor(spritesheet, startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration,
                frames, loop) {
        this.spriteSheet = spritesheet;
        this.startX = startX;
        this.startY = startY;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.sheetWidth = sheetWidth;
        this.frameDuration = frameDuration;
        this.frames = frames;
        this.totalTime = frameDuration * frames;
        this.elapsedTime = 0;
        this.loop = loop;
    }

    drawFrame(tick, ctx, x, y, scaleBy) {
        let scale = scaleBy || 1;
        this.elapsedTime += tick;
        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            }
        }

        let frame = this.currentFrame();

        let xindex = frame % this.sheetWidth;
        let yindex = Math.floor(frame / this.sheetWidth);

        ctx.drawImage(this.spriteSheet,
            xindex * this.frameWidth, yindex * this.frameHeight + this.startY,  // source from sheet
            this.frameWidth, this.frameHeight,
            x,y ,
            this.frameWidth * scale,
            this.frameHeight * scale);
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    }
}