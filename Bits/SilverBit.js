class SilverBit extends Bits {
    constructor(game, spritesheet, x, y) {
        super(game, spritesheet, x, y);
    }

    update () {
    }

    onAbsorb() {
        bitList.silverBits++;
    }
}