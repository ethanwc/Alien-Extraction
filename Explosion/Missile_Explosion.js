class Missile_Explosion extends Explosion {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 620, 620, 3, .08, 7, true), x, y, .5);
    }

    update () {
        super.update();
    }
}