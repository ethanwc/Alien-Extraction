class Ship {
    constructor(game, animation, x, y, w, h) {
        this.game = game;
        this.moveAnimation = animation;
        this.idleAnimation = new Animation(AM.getAsset("./assets/img/ship_idle_1.png"), 0, 0, 540, 582, 3, .3, 10, true);
        this.fireAnimation = new Animation(AM.getAsset("./assets/img/ship_attack_2.png"), 0, 0, 540, 580, 3, .2, 10, true);
        this.landAnimation = new Animation(AM.getAsset("./assets/img/ship_land.png"), 0, 0, 540, 580, 3, .2, 10, true);
        // this.takingoffAnimation;
        // this.landingAnimation;
        this.animation = this.landAnimation;
        this.removeFromWorld = false;

        //landing, landed, taking off animations
        this.maxspeed = 600;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.hv = 0;
        this.vv = 0;
        this.ha = 0;
        this.va = 0;
        this.prevx = 0;
        this.prevy = 0;
        this.move = 0;
        this.shootime = 1;
        this.landingGear = 0;
        this.shootstart = 0;
        this.landingStart = 0;
        this.waitTime = 2;


    }

    toggleLanding() {

        //already checks if idle or move should occur? just need time in between other animations check

        if ((gameEngine.timer.gameTime - this.landingStart) > this.waitTime) {

        //if gear is deployed...retract
        if (this.landingGear) {
            //set animation to detract, then set to idle after 2 seconds
            this.landingStart = gameEngine.timer.gameTime;

        }
        //gear is retracted...deploy
        else {
            //set animation to deploy...then keep deploy until press again

            this.landingStart = gameEngine.timer.gameTime;

        }
}



this.landingGear = !this.landingGear;
    }

    update() {

            if(!this.landingGear && (gameEngine.timer.gameTime - this.landingStart) > this.waitTime) {

                if ((gameEngine.timer.gameTime - this.shootstart) > this.shootime) {

                    if (Math.abs(this.hv) < 100 && Math.abs(this.vv) < 100) {
                        if (this.move) {
                            this.animation = this.idleAnimation;
                            this.move = 0;
                        }
                    } else if (!this.move) {
                        this.move = 1;
                        this.animation = this.moveAnimation;
                    }

                }
            }
            //landing gear deployed animation...
            else {

            }

        this.prevx = this.x;
        this.prevy = this.y;

        this.x += this.game.clockTick * this.hv;
        this.y += this.game.clockTick * this.vv;

        this.hv += this.game.clockTick * this.ha;
        this.vv += this.game.clockTick * this.va;

        if (this.hv > this.maxspeed) this.hv = this.maxspeed;
        if (this.hv < -1 * this.maxspeed) this.hv = -1 * this.maxspeed;

        if (this.vv > this.maxspeed) this.vv = this.maxspeed;
        if (this.vv < -1 * this.maxspeed) this.vv = -1 * this.maxspeed;


        for (let i = 0; i < gameEngine.entities.length; i++) {

            let entity = gameEngine.entities[i];

            if (entity instanceof Tile) {
                if (RectCircleColliding(this.x + this.w * .5, this.y + this.h * .5,
                        260, entity.x, entity.y, entity.w, entity.h)) {
                    entity.removeFromWorld = true;

                    gameEngine.addEntity(new Boom(gameEngine, AM.getAsset("./assets/img/boom.png"),
                        entity.x-70, entity.y-66));//c

                    //handle collision with a block...
                    this.x = this.prevx;
                    this.y = this.prevy;

                    this.hv = - .3 * this.hv;
                    this.vv = - .3 * this.vv;
                }
            }
        }
    }

    shootstate() {
        this.animation = this.fireAnimation;
        this.shootstart = gameEngine.timer.gameTime;
    }

    draw(ctx) {
        ctx.rect(0,0,200,200);
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
    }
}