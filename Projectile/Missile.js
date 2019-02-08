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
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.w/2, this.y - this.game.camera.y + this.h/2, 1);
    }
}