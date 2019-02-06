class Magnet extends Absorb {
    constructor(game, spritesheet, x, y, scale) {
        super(game, new Animation(spritesheet, 0, 0, 56, 102, 4, .2, 4, true), x, y, scale);
    }

    update () {
    }

}