class Missile extends Projectile {
    constructor(game, mousex, mousey) {
        super(game, new Animation(AM.getAsset("./assets/img/missile.png"),
            0, 0, 138, 477, 6, .3, 10, true),
            ship.x + ship.w/2, ship.y + ship.h/2, mousex, mousey, 500);
    }


    update() {

        super.update();
        //detect collision...
        //despawn and explode
        //:^)
    }


    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
    }
}