class Smoke extends Explosion {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 230, 161, 3, .05, 18, false), x, y);
    }

    update () {
        super.update();
    }

}