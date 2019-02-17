class Store {
    constructor(spritesheet, x, y, w, h) {
        this.spritesheet = spritesheet;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    update() {

    }


    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - camera.x, this.y - camera.y, this.w, this.h);
    }
}