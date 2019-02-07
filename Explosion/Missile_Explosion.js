class Missile_Explosion extends Explosion {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 620, 620, 3, .08, 7, false), x, y, 2);
    }

    update () {
        super.update();
    }
}