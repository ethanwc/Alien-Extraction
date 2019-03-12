class Tile {
    constructor(game, spritesheet, x, y, foreground) {
        this.game = game;
        this.spritesheet = spritesheet;
        this.removeFromWorld = false;
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;
        this.foreground = foreground;
        this.health = 1000;
    }

    hitByLaser(dmg) {
        this.health-= dmg;
    }

    hitByExplosion() {
        this.health-= 50;
    }

    hitByBurst() {
        this.health -= 100;
    }

    hitByShip() {
        this.health -= 1000;
        playHitSomething();
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - camera.x, this.y - camera.y, this.w, this.h);
    }
}