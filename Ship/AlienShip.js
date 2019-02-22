class AlienShip extends Ship {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 540, 584, 3, .1, 10, true), x, y, 540, 584);
    }
    update () {
        super.update();
    }
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1/2 * shipscale);
        // ctx.arc(this.x + this.w * .25 - this.game.camera.x, this.y + this.h * .25 - this.game.camera.y, this.flySize, 2 * Math.PI, false);
        // ctx.lineWidth = 3;
        // ctx.strokeStyle = '#FF0000';
        // ctx.stroke();
    }
}