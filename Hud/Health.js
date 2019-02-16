/*
Based on this:
https://www.html5canvastutorials.com/advanced/html5-canvas-animated-progress-bar/
 */
class Health {
    constructor(ship, initialHealth, x, y, w, h) {
        this.ship = ship;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.health = initialHealth;
        this.maxHealth = 100;
        this.previousHealth = this.health;
        this.handler = new ProgressbarHandler(ship, initialHealth, x, y, w, h, "transparent", "rgba(0,255,255,.3)");
    }

    setHealth(newHealth) {
        this.health = newHealth;
    }

    setMaxHealth(newMaxHealth) {
        this.maxHealth = newMaxHealth;
    }

    hurt(damageTaken) {
        // this.previousHealth = this.health;
        // this.health -= damageTaken;
        // if (this.health < 0) this.health = 0;
        this.handler.hurt(damageTaken);
    }

    update() {
        //die event
        if (this.health < 0) ship.die();
        this.handler.update();
    }

    draw(ctx) {
        this.handler.draw(ctx);
    }
}