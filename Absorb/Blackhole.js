class Blackhole extends Absorb {
    constructor(game, spritesheet, x, y, scale) {
        super(game, new Animation(spritesheet, 0, 0, 512, 512, 6, .1, 36, true), x, y, scale);

    }

    update () {

    }

}