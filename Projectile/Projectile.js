class Projectile {
    constructor(game, animation, w, h, mousex, mousey, speed) {
        this.game = game;
        this.animation = animation;
        this.removeFromWorld = false;
        this.speed = speed;
        this.x = ship.x + ship.w/2;
        this.y = ship.y - 300;
        this.initx = this.x;
        this.inity = this.y;
        this.w = w;
        this.h = h;
        this.xrate = undefined;
        this.yrate = undefined;

        let a = (mouse.y - this.y);
        let b = (mouse.x - this.x);
        let c = Math.sqrt(a*a + b*b);

        this.xrate = (b > 0) ? Math.cos(b/a) : -1 * Math.cos(a/c);
        this.yrate = (a > 0) ? Math.sin(c/a) : -1 * Math.sin(b/c);

        console.log("start: ", this.x, this.y);
        console.log("missile to: ", mousex - camera.w/2, mousey - camera.h/2);
        console.log("dif: ", b, a);
        console.log(this.xrate, this.yrate);

    }

    update() {
        // this.x += this.xrate * this.speed * this.game.clockTick;
        this.y += 1 * this.speed * this.game.clockTick;


        // let x1 = this.initx + camera.x, x2 = this.endx + camera.x;
        // let y1 = this.inity + camera.y, y2 = this.endy + camera.y;
        // let rx = entity.x, ry = entity.y;
        // let rw = entity.w, rh = entity.h;



        for (let i = 0; i < gameEngine.entities.length; i++) {

            let entity = gameEngine.entities[i];

            if (entity instanceof Tile && entity.foreground) {

                let x1 = this.initx - this.w - 30, x2 = x1;
                let y1 = this.inity + this.h, y2 = this.y + ((this.h+230));
                let rx = entity.x, ry = entity.y;
                let rw = entity.w, rh = entity.h;

                let left = lineRect(x1, y1, x2, y2, rx, ry, rx, ry + rh);
                let right = lineRect(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
                let top = lineRect(x1, y1, x2, y2, rx, ry, rx + rw, ry);
                let bottom = lineRect(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);
                if (left || right || top || bottom) {
                    this.removeFromWorld = true;

                    let explosion = new Missile_Explosion(gameEngine, AM.getAsset("./assets/img/missile_explosion.png"),
                        this.x-520, this.y + 400);

                    gameEngine.addEntity(explosion);
                }
            }

        }
    }

    draw(ctx) {

    }
}