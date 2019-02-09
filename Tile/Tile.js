class Tile {
    constructor(game, spritesheet, x, y, foreground) {
        this.game = game;
        this.spritesheet = spritesheet;
        this.removeFromWorld = false;
        this.x = x;
        this.y = y;
        this.w = 200;
        this.h = 200;
        this.foreground = foreground;
    }

    update() {
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - camera.x, this.y - camera.y, this.w, this.h);
    }
}

