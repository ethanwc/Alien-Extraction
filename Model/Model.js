class Model {
    constructor(initx) {
        this.initx = initx;
        this.cargo = 0;
        this.cargoCapacity = 100;
        this.fuelCapacity = 50;
        this.elevation = 0;
        this.balance = 0;
        this.string = null;
        this.dirtQuantity = 0;
        this.goldQuantity = 0;
        this.goldValue = 20;
        this.drainSince = 0;
        this.drainTime = 1;
        this.fuelLevel = this.fuelCapacity;
        // this.health = undefined;
        // this.fuel =
        // this.createModel();
    }

    createModel() {

    }

    updateCargoCapacity(newCapacity) {
        this.cargoCapacity = newCapacity;
    }

    updateElevation(newElevation) {
        this.elevation = newElevation;
    }

    updateBalance(newBalance) {
        this.balance += newBalance;
    }



    update() {
        this.elevation =150 + -1 * ((ship.y + ship.w * .5)/10 - 2 | 0);
        this.string = "Balance: " + this.balance + "  Elevation: " + this.elevation +
            "  Capacity: " + ((this.cargo / this.cargoCapacity) * 100 | 0) + "%";
        this.checkFuel();
    }

    draw(ctx) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.string, this.initx, 50, 400);
    }

    checkFuel() {
        if (gameEngine.timer.gameTime - this.drainSince > this.drainTime) {
            this.drainSince = gameEngine.timer.gameTime;
            // console.log("draining: ", fuelDrainRate);
            fuel.drainFuel(fuelDrainRate);
        }
    }
}