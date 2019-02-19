class Menu {
    constructor(background, boundx, widthx, x, y, w, h) {
        this.background = background;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.boundx = boundx;
        this.widthx = widthx;
        this.isEnabled = false;
        this.closeTime = 0;
        this.waitTime = 5;
    }

    update() {


        if ((gameEngine.timer.gameTime - this.closeTime) > this.waitTime) {

            if (ship.landed && this.inBounds()) {

                this.isEnabled = true;

            }


        }

        else this.isEnabled = false;

        if (!ship.landingGear || !ship.landed) this.isEnabled = false;

    }

    draw(ctx) {

    }

    inBounds() {
        return ((ship.x + 200 > this.boundx) && ((ship.x + 200 + ship.w ) < (this.boundx + this.widthx)))
    }
    setTime() {
        this.closeTime = gameEngine.timer.gameTime;
    }
}