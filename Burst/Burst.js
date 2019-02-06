class Burst {
    constructor(game, animation, x, y, radius) {
        this.game = game;
        this.animation = animation;
        this.removeFromWorld = false;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    update() {

    }

    draw(ctx) {
        //complex logic here? :^)
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
    }
}