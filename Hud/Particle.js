class Particle {
    constructor(bar, xoff, yoff, color) {
        this.bar = bar;
        this.x = bar.widths + xoff;
        this.y = yoff;
        this.vx = 0.8 + Math.random();
        this.v = Math.random() * 5;
        this.g = 1 + Math.random() * 3;
        this.down = false;
        this.viewTime = 3;
        this.color = color;
        this.initTime = gameEngine.timer.gameTime;
    }

    update() {
        if ((gameEngine.timer.gameTime - this.initTime) > this.viewTime)
            this.removeFromWorld = true;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        let size = Math.random() * 2;
        ctx.fillRect(this.x, this.y, size, size);
    }
}
