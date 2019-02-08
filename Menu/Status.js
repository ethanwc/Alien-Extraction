class Status {
    constructor(ship) {
        this.ship = ship;
        this.health = ship.health;
        this.fuel = ship.fuel;
        this.capacity = ship.capacity;
        this.value = ship.value;
    }
}