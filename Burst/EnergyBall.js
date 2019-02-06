class EnergyBall extends Burst {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 315, 300, 4, .1, 12, true), x, y);
    }

    update () {

    }
}