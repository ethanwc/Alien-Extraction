class Projectile {
    constructor(game, animation, w, h, mousex, mousey, speed) {
        this.game = game;
        this.animation = animation;
        this.removeFromWorld = false;
        this.speed = speed;
        this.x = ship.x + ship.w/2 * shipscale + 25;
        this.y = ship.y - 400;
        this.initx = this.x;
        this.inity = this.y;
        console.log("missile at: ", this.initx, this.inity);
        this.w = w;
        this.h = h;
    }

    update() {
        this.y += 1 * this.speed * this.game.clockTick;

        for (let i = 0; i < gameEngine.entities.length; i++) {

            let entity = gameEngine.entities[i];

            if (entity instanceof Tile && entity.foreground) {

                let x1 = this.initx - this.w + 45, x2 = x1;
                let y1 = this.inity, y2 = this.y + this.h;
                let rx = entity.x, ry = entity.y;
                let rw = entity.w, rh = entity.h;

                let left = lineRect(x1, y1, x2, y2, rx, ry, rx, ry + rh)[0];
                let right = lineRect(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh)[0];
                let top = lineRect(x1, y1, x2, y2, rx, ry, rx + rw, ry)[0];
                let bottom = lineRect(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh)[0];
                if (left || right || top || bottom) {
                    this.removeFromWorld = true;
                    let explosion = new Missile_Explosion(gameEngine, AM.getAsset("./assets/img/missile_explosion.png"),
                        this.x - 200, this.y+350);

                    gameEngine.addEntity(explosion);
                }
            }

        }
    }

    draw(ctx) {

    }
}