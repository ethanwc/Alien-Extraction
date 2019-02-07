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

        for (let i = 0; i < gameEngine.entities.length; i++) {

            let entity = gameEngine.entities[i];

            if (entity instanceof Tile) {
                if (RectCircleColliding(this.x + 620 * .5, this.y + 620 * .5,
                        280, entity.x, entity.y, entity.w, entity.h)) {
                    //custom offset to align
                    entity.removeFromWorld = true;

                    gameEngine.addEntity(new Smoke(gameEngine, AM.getAsset("./assets/img/smoke.png"),
                        entity.x-70, entity.y-26));//c

                    // entity.explode(entity.x-70, entity.y-26);

                }
            }
        }
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y);
        // ctx.arc(this.x + 620 * .5 - this.game.camera.x, this.y + 620 * .5 - this.game.camera.y, 280, 2 * Math.PI, false);
        // ctx.lineWidth = 3;
        // ctx.strokeStyle = '#FF0000';
        // ctx.stroke();
    }
}