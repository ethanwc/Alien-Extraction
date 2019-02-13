class Missile_Explosion extends Explosion {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 620, 620, 3, .08, 7, false), x, y, 2);
    }

    update () {
        super.update();
    }


    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        // ctx.arc(this.x + 620 * .5 - this.game.camera.x, this.y + 620 * .5 - this.game.camera.y, 280, 2 * Math.PI, false);
        // ctx.lineWidth = 3;
        // ctx.strokeStyle = '#FF0000';
        // ctx.stroke();
    }

}