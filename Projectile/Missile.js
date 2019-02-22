class Missile extends Projectile {
    constructor(game, mousex, mousey) {
        super(game, new Animation(AM.getAsset("./assets/img/missile.png"),
            0, 0, 138, 477, 6, .1, 10, true), 138, 477, mousex, mousey, 1400);
    }


    update() {

        super.update();
        //detect collision...
        //despawn and explode
        //:^)
    }


    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - (this.w - 30)/shipscale, this.y - this.game.camera.y  * this.h, 1/2 * shipscale);
        let x1 = this.initx - this.w - 70, x2 = x1;
        let y1 = this.inity + this.h, y2 = this.y + ((this.h+230));
        ctx.color = "#AA232d";
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    }
}