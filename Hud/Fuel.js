
class Fuel {
    constructor(ship, initialFuel, x, y, w, h) {
        this.ship = ship;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fuelLevel = initialFuel;
        this.fuelCapacity = 70;
        this.previousLevel = this.fuelLevel;
        this.handler = new ProgressbarHandler(ship, initialFuel, x, y, w, h, "transparent", "rgba(0,255,255,.3)");
    }

    drainFuel(toDrain) {
        this.fuelLevel -= toDrain;
        this.handler.negate(toDrain);
    }

    addFuel(toAdd) {
        this.fuelLevel += toAdd;
        if (this.fuelLevel > this.fuelCapacity) this.fuelLevel = this.fuelCapacity;
    }

    setFuelLevel(newLevel) {
        this.fuelLevel = newLevel;
    }

    setFuelCapacity(maxCapacity) {
        this.fuelCapacity = maxCapacity;
    }

    update() {
        //die event
        //
        this.handler.setCurrent(this.fuelLevel);
        if (this.fuelLevel < 0) {
            ship.die();
            this.fuelLevel = 0;
        }
        this.handler.update();
    }

    draw(ctx) {
        this.handler.draw(ctx);
    }
}