class Icon {
    constructor(game, spritesheet, x, y, w, h) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.spritesheet = spritesheet;
    }

    update () {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
    }
}