class DirtBit extends Bits {
    constructor(game, spritesheet, x, y) {
        super(game, spritesheet, x, y);
        this.xOffset = -70;
        this.yOffset = -26;
    }

    update () {
    }

    onAbsorb() {
        bitList.dirtBits++;
    }
}