class UpgradeStore extends Store {
    constructor(spritesheet, x, y, w, h) {
        super(spritesheet, x, y, w, h);
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - camera.x, this.y - camera.y, this.w * .5, this.h * .5);
    }

}