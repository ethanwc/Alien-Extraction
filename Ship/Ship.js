class Ship {
    constructor(game, animation, x, y, w, h) {
        this.game = game;
        this.moveAnimation = animation;
        this.idleAnimation = new Animation(AM.getAsset("./assets/img/ship_idle_1.png"), 0, 0, 540, 582, 3, .3, 10, true);
        this.fireAnimation = new Animation(AM.getAsset("./assets/img/ship_attack_2.png"), 0, 0, 540, 580, 3, .2, 10, true);
        this.landAnimation = new Animation(AM.getAsset("./assets/img/ship_land.png"), 0, 0, 540, 582, 1, .2, 1, true);
        this.landingDeploy = new Animation(AM.getAsset("./assets/img/ship_landing_deploy.png"), 0, 0, 540, 582, 4, .1, 14, true);
        this.landingRetract = new Animation(AM.getAsset("./assets/img/ship_landing_deploy.png"), 0, 0, 540, 582, 4, .1, 14, true, true);
        this.animation = this.idleAnimation;
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
        this.swapAnimation = 0;
        this.waitTime = 14 * .1 - .1;
        this.flySize = 260;
        this.landSize = 230;
        this.r = this.flySize;


    }

    toggleLanding() {

        if ((gameEngine.timer.gameTime - this.landingStart) > this.waitTime) {

            //already checks if idle or move should occur? just need time in between other animations check
            this.landingGear = !this.landingGear;


            if (this.landingGear) {
                this.r = this.landSize;
                this.animation = this.landingRetract;
            }

            else {
                this.r = this.flySize;
                this.animation = this.landingDeploy;
            }

            this.swapAnimation = 1;
            this.landingStart = gameEngine.timer.gameTime;
        }



    }

    update() {
        if ((gameEngine.timer.gameTime - this.landingStart) > this.waitTime) {

        if (!this.swapAnimation && this.animation !== this.landAnimation) {
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

        else {
            //handle transition still :)
                this.swapAnimation = !this.swapAnimation;
                if (this.animation === this.landingDeploy) {
                    this.resetAnimation(this.landingDeploy);
                    this.animation = this.idleAnimation;
                }
                else if (this.animation === this.landingRetract) {
                    this.resetAnimation(this.landingRetract);
                    this.animation = this.landAnimation;
                }

            }
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
                        this.r, entity.x, entity.y, entity.w, entity.h)) {
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

    shoot() {
        if ((gameEngine.timer.gameTime - this.landingStart) > this.waitTime) {
            gameEngine.addEntity(new Missile(gameEngine, mouse.x, mouse.y));
            this.animation = this.fireAnimation;
            this.shootstart = gameEngine.timer.gameTime;
        }
    }

    resetAnimation(animation) {

        animation.elapsedTime = 0;
    }


    draw(ctx) {
        // ctx.rect(0,0,200,200);
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
        ctx.arc(this.x + this.w * .5 - this.game.camera.x, this.y + this.h * .5 - this.game.camera.y, 260, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FF0000';
        ctx.stroke();
    }
}