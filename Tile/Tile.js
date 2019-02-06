class Tile {
    constructor(game, spritesheet, x, y, w, h) {
        this.game = game;
        this.spritesheet = spritesheet;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    update() {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
    }
}

