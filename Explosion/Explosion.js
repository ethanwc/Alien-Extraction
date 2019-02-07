class Explosion {
    constructor(game, animation, x, y, viewtime) {
        this.game = game;
        this.animation = animation;
        this.removeFromWorld = false;
        this.x = x;
        this.y = y;
        this.viewTime = viewtime;
        this.initTime = gameEngine.timer.gameTime;
    }

    update() {
        let now = gameEngine.timer.gameTime;

        if ((now - this.initTime) > this.viewTime)
            this.removeFromWorld = true;
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y);
    }
}