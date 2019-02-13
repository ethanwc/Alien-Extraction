class Grass extends Tile {
    constructor(game, spritesheet, x, y, foreground, health) {
        super(game, spritesheet, x, y, foreground, health);
    }

    update () {
        if (this.health < 1) {
            this.onDestroy();
            this.removeFromWorld = true;
        }
    }


    onDestroy() {
        gameEngine.addEntity(new Smoke(gameEngine, AM.getAsset("./assets/img/smoke.png"), this.x-70, this.y-26));//custom offset to align
    }
}