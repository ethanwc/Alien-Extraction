class Ship {
    constructor(game, animation, x, y, w, h) {
        this.game = game;
        this.animation = animation;
        this.removeFromWorld = false;
        this.speed = 400;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    update() {
        this.x += this.game.clockTick * this.speed * direction.dx;
        this.y += this.game.clockTick * this.speed * direction.dy;
        for (let i = 0; i < gameEngine.entities.length; i++) {

            let entity = gameEngine.entities[i];

            if (entity instanceof Tile) {
                if (rectintersect(this.x, this.y, this.w, this.h, entity.x, entity.y, entity.w, entity.h)) {
                    console.log("removing: ", entity.x, entity.y, entity.w, entity.h);
                    entity.removeFromWorld = true;

                }
            }
        }
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
    }
}