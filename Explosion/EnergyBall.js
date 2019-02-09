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

            if (entity instanceof Tile) {
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

}