class Progressbar {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        console.log("y: ", this.y/2 + 12);
        this.offset = this.h/2 - 12;
        this.widths = 0;
        this.hue = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'hsla(' + this.hue + ', 100%, 50%, 1)';
        ctx.fillRect(this.x, this.y + this.offset, this.widths, 25);
        let grad = ctx.createLinearGradient(this.x, this.y, 0, this.w);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, "rgba(0,0,0,0.8)");
        ctx.fillStyle = grad;
        ctx.fillRect(this.x, this.y + this.offset, this.widths, 25);
    }
}