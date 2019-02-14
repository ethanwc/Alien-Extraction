class Particle {
    constructor(bar, xoff, yoff) {
        this.bar = bar;
        this.x = bar.widths + xoff;
        this.y = yoff;
        this.vx = 0.8 + Math.random();
        this.v = Math.random() * 5;
        this.g = 1 + Math.random() * 3;
        this.down = false;
        this.viewTime = 3;
        this.initTime = gameEngine.timer.gameTime;
    }

    update() {
        if ((gameEngine.timer.gameTime - this.initTime) > this.viewTime)
            this.removeFromWorld = true;
    }

    draw(ctx) {
        ctx.fillStyle = 'hsla(' + (this.bar.hue + 0.3) + ', 100%, 40%, 1)';
        let size = Math.random() * 2;
        ctx.fillRect(this.x, this.y, size, size);
    }
}
