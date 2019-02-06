class Heart extends MenuItem {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 350, 306, 6, .05, 11, true), x, y);
    }

    update () {
    }

}