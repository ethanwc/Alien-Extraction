class Ufo extends Ship {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 56, 39, 6, .02, 11, true), x, y);
    }

    update () {

    }

}