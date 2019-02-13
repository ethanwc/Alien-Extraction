class Bits {
    constructor(game, spritesheet, x, y) {
        this.game = game;
        this.spritesheet = spritesheet;
        this.removeFromWorld = false;
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;
    }

    update() {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - camera.x, this.y - camera.y, this.w, this.h);
    }
}

