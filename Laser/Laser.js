class Laser {
    constructor(game, animation, x, y, endx, endy) {
        this.game = game;
        this.animation = animation;
        this.removeFromWorld = false;
        this.x = x;
        this.y = y;
        this.endx = endx;
        this.endy = endy;
        this.viewTime = .1;
        this.initTime = gameEngine.timer.gameTime;
    }

        update() {

        }


        draw(ctx) {
            // this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        }
}