class Missile extends Projectile {
    super(game, animation, x, y) {

    }

        update() {
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
    }
}