class Tile {
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

    explode(x, y) {
        gameEngine.addEntity(new Smoke(gameEngine, AM.getAsset("./assets/img/smoke.png"),
            x, y), 2);//custom offset to align
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - camera.x, this.y - camera.y, this.w, this.h);
    }
}

