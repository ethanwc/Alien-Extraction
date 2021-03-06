
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
        this.handler = new ProgressbarHandler(ship, initialHealth, x, y, w, h, "transparent", "rgba(255,0,0,.6)");
    }

    setHealth(newHealth) {
        this.health = newHealth;
    }

    addHealth(toAdd) {
        this.health += toAdd;
        this.handler.setCurrent(this.health);
    }

    setMaxHealth(newMaxHealth) {
        this.maxHealth = newMaxHealth;
    }

    hurt(damageTaken) {
        // this.previousHealth = this.health;
        // this.health -= damageTaken;
        // if (this.health < 0) this.health = 0;
        this.handler.negate(damageTaken * healthDamageMultiplier);
    }

    update() {
        this.handler.update();
        this.handleSound();
    }

    draw(ctx) {
        this.handler.draw(ctx);
    }

    handleSound() {
        let health = this.handler.current;

        if (health > 30 && !alarm.pause) {
            alarm.pause();
        }

        else if (health <= 30 && ship.isAlive) {
            alarm.play();
            alarm.loop = 1;
        }

        if (health === 0) alarm.pause();
    }
}