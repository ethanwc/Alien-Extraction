class Info {
    constructor(initx) {
        this.initx = initx;
        this.cargoCapacity = "0%";
        this.elevation = 0;
        this.balance = 10000;
        this.string = null;
        this.dirtQuantity = 0;
        this.goldQuantity = 0;
        this.goldValue = 20;
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
        this.elevation = -1 * ((ship.y + ship.w * .5)/10 - 2 | 0);
        this.string = "Balance: " + this.balance + "  Elevation: " + this.elevation + "  Capacity: " + this.cargoCapacity;
    }

    draw(ctx) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.string, this.initx, 50, 400);
    }
}