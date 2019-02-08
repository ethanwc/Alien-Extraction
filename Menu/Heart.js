class Heart extends MenuItem {
    constructor(game, spritesheet, x, y) {
        super(game, new Animation(spritesheet, 0, 0, 350, 306, 6, .05, 11, true), x, y);
    }

    update () {
        // this.x = ship.x + 200;
        // this.y = ship.y - 200;
        // console.log("this",this.x, this.y);
        // console.log("cam", camera.x, camera.y);
        // console.log("ship", ship.x, ship.y);

    }

    draw(ctx) {



        // super.draw(ctx);
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1/3);
    }

}