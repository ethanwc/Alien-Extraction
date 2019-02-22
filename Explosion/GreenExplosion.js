class GreenExplosion extends Explosion {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 400, 380, 4, .1, 8, false), x, y, .8);
}

    update () {
        super.update();
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.5 * shipscale);
    }
}