class Animation {
    constructor(spritesheet, startX, startY, frameWidth, frameHeight, sheetWidth, frameDuration,
                frames, loop , reverse) {
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
        this.reverse = reverse | false;
    }

    drawFrame(tick, ctx, x, y, scaleBy) {
        var scaleBy = scaleBy || 1;
        this.elapsedTime += tick;
        if (this.loop) {
            if (this.isDone()) {
                this.elapsedTime = 0;
            }
        } else if (this.isDone()) {
            return;
        }
        var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
        var vindex = 0;
        if ((index+1) * this.frameWidth + this.startX > this.spriteSheet.width) {
            index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
            vindex++;
        }
        while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
            index -= Math.floor(this.spriteSheet.width / this.frameWidth);
            vindex++;
        }

        var locX = x;
        var locY = y;
        var offset = vindex === 0 ? this.startX : 0;
        ctx.drawImage(this.spriteSheet,
            index * this.frameWidth + offset, vindex*this.frameHeight + this.startY,  // source from sheet
            this.frameWidth, this.frameHeight,
            locX, locY,
            this.frameWidth * scaleBy,
            this.frameHeight * scaleBy);
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    }
}