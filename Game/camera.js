class Camera {
    constructor(ship) {
        this.x = ship.x;
        this.y = ship.y;
        this.w = 800;
        this.h = 800;
        this.ship = ship;
    }

    update() {
        if (ship.x - this.w/2 + this.ship.w/4 > 0)
            // &&
            // ship.x - this.w/2 + this.ship.w/4 < tilesize * worldWidth - screen.width * screenScale)
            this.x = this.ship.x - this.w / 2 + this.ship.w / 4;

        let v = ship.y - this.h/2 + this.ship.h/4 + this.h / 2;
        let r = tilesize * worldHeight - (3 * screen.height * screenScale);
        r = Math.ceil(r/100)*100;

        // console.log(v, r);

            if (ship.y - this.h/2 + this.ship.h/4 > 0)
                // &&v < r) {
                this.y = this.ship.y - this.h / 2 + this.ship.h / 4;
            }
    // }

    draw(ctx) {
        // ctx.color = "#AA232d";
        // ctx.rect(0,0, 100, 100);
    }
}