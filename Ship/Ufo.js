class Ufo extends Ship {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 56, 39, 6, .02, 11, true), x, y, 56, 39);
    }
    update () {
        super.update();
    }
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
    }
}