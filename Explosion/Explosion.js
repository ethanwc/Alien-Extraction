class Explosion {
    constructor(game, animation, x, y) {
        this.game = game;
        this.animation = animation;
        this.removeFromWorld = false;
        this.x = x;
        this.y = y;
    }

    update() {

    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y);
    }
}