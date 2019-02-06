class Camera {
    constructor(ship) {
        this.x = ship.x;
        this.y = ship.y;
        this.w = 800;
        this.h = 800;
        this.ship = ship;
    }

    update() {
        this.x = this.ship.x - this.w / 2;
        this.y = this.ship.y - this.h / 2;
    }

    draw(ctx) {
        console.log("h9");
        ctx.color = "#AA232d";
        ctx.rect(0,0, 100, 100);
    }
}