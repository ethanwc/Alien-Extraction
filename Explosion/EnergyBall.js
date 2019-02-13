class EnergyBall extends Explosion {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 315, 300, 4, .06, 12, false), x, y);
    }

    update () {
        let now = gameEngine.timer.gameTime;

        if ((now - this.initTime) > this.viewTime)
            this.removeFromWorld = true;

        for (let i = 0; i < gameEngine.entities.length; i++) {

            let entity = gameEngine.entities[i];

            if (entity instanceof Tile && entity.foreground) {
                if (RectCircleColliding(this.x + 315 * .5, this.y + 300 * .5,
                        300, entity.x, entity.y, entity.w, entity.h)) {
                    //custom offset to align
                    entity.removeFromWorld = true;

                    gameEngine.addEntity(new Smoke(gameEngine, AM.getAsset("./assets/img/smoke.png"),
                        entity.x-70, entity.y-26));//c

                }
            }
        }
    }
    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        // ctx.arc(this.x + 315 * .5 - this.game.camera.x, this.y + 300 * .5 - this.game.camera.y, 300, 2 * Math.PI, false);
        // ctx.lineWidth = 3;
        // ctx.strokeStyle = '#FF0000';
        // ctx.stroke();
    }

}