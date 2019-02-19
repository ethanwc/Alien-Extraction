class Camera {
    constructor(ship) {
        this.x = ship.x;
        this.y = ship.y;
        this.w = 800;
        this.h = 800;
        this.ship = ship;
    }

    update() {
        this.x = this.ship.x - this.w / 2 + this.ship.w / 4;
        this.y = this.ship.y - this.h / 2 + this.ship.h / 4;
    }

    draw(ctx) {
        // ctx.color = "#AA232d";
        // ctx.rect(0,0, 100, 100);
    }
}