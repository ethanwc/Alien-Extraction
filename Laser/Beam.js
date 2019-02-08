class Beam extends Laser {
    constructor(game, startx, starty) {
        super(game, startx, starty, mouse.x, mouse.y);
    }

    update() {
        super.update();
    }

    draw(ctx) {
        let x1 = this.x, y1 = this.y;
        let x2 = this.endx, y2 = this.endy;


        let gradient = ctx.createLinearGradient(-(y1 - y2 + camera.y) + y2, x1 + camera.x, y1 + camera.y, -(x1 + camera.x - x2) + x2);


        // gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(.4, "#66ff66");
        gradient.addColorStop(.5, "#66ff66");
        gradient.addColorStop(.6, "#66ff66");
        // gradient.addColorStop(1, "#ffffff");

        gradient.stroke = "butt";
        ctx.fillStyle = gradient;


        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineCap = "round";
        ctx.lineWidth = 20;
        ctx.strokeStyle = gradient;

        ctx.stroke();

        // this.ctx.shadowBlur = 10;
        // this.ctx.shadowColor = "#008000";
    }
}