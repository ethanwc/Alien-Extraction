class Ship {
    constructor(game, animation, x, y, w, h) {
        this.game = game;
        this.animation = animation;
        this.removeFromWorld = false;
        this.maxspeed = 600;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.hv = 0;
        this.vv = 0;
        this.ha = 0;
        this.va = 0;
    }

    update() {
        this.x += this.game.clockTick * this.hv;
        this.y += this.game.clockTick * this.vv;

        this.hv += this.game.clockTick * this.ha;
        this.vv += this.game.clockTick * this.va;

        if (this.hv > this.maxspeed) this.hv = this.maxspeed;
        if (this.hv < -1 * this.maxspeed) this.hv = -1 * this.maxspeed;

        if (this.vv > this.maxspeed) this.vv = this.maxspeed;
        if (this.vv < -1 * this.maxspeed) this.vv = -1 * this.maxspeed;


        for (let i = 0; i < gameEngine.entities.length; i++) {

            let entity = gameEngine.entities[i];

            if (entity instanceof Tile) {
                if (rectintersect(this.x, this.y, this.w, this.h, entity.x, entity.y, entity.w, entity.h)) {
                    // entity.removeFromWorld = true;
                    // gameEngine.addEntity(new Smoke(gameEngine, AM.getAsset("./assets/img/smoke.png"),
                    //     entity.x-70, entity.y-26));//custom offset to align

                    //handle collision with a block...

                    this.hv = - .5 * this.hv;
                    this.vv = - .5 * this.vv;
                }
            }
        }
    }

    draw(ctx) {
        ctx.rect(0,0,200,200);
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
    }
}