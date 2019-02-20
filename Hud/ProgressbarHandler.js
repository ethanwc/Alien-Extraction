/*
Based on this:
https://www.html5canvastutorials.com/advanced/html5-canvas-animated-progress-bar/
 */
class ProgressbarHandler {
    constructor(ship, initial, x, y, w, h, colorstop1, colorstop2) {
        this.ship = ship;
        this.bar = new Progressbar(x, y, w, h, colorstop1, colorstop2);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.max = initial;
        this.current = initial;
        this.previous = this.current;
        this.ctx = undefined;
        this.isDrawing = true;
        this.counter = 0;
        this.particles = [];
    }


    setCurrent(newValue) {
        this.current = newValue;
    }

    setMax(newMax) {
        this.max = newMax;
    }

    negate(toRemove) {
        this.previous = this.current;
        this.current -= toRemove;

         if (this.current <= 0)  {
            this.current = 0;
            this.update();
            ship.die();
        }
    }

    fakeUpdate(ctx) {

        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            p.x -= p.vx;
            if (p.down === true) {
                p.g += 0.1;
                p.y += p.g;
            } else {
                if (p.g < 0) {
                    p.down = true;
                    p.g += 0.1;
                    p.y += p.g;
                } else {
                    p.y -= p.g;
                    p.g -= 0.1;
                }
            }
            p.draw(ctx);
        }
    }

    fakeDraw(ctx) {
        this.softReset(ctx);
        this.counter++;
        this.bar.hue += 0.7;

        this.bar.widths += 2;

        if (this.bar.widths > (this.current / this.max) * this.w) {
            this.isDrawing = false;
            this.bar.isDrawling = false;
            if (this.isDrawing) {
                if (this.counter > this.w / 2) {
                    this.hardReset(ctx);
                }
                this.bar.hue = 126;
                this.bar.widths = this.w;
                this.bar.draw(ctx);
            } else this.bar.draw(ctx);
        } else {
            this.bar.draw(ctx);
            for (let i = 0; i < 25; i += 10) {
                this.particles.push(new Particle(this.bar, this.x, this.y + this.h / 2 - 10));
            }
        }
        this.fakeUpdate(ctx);
    }

    update() {
        if (!this.isDrawing && this.previous !== this.current) {
            this.isDrawing = true;
            this.bar.widths = (this.current / this.max) * this.w;
        }
    }

    draw(ctx) {
        if (this.isDrawing) this.fakeDraw(ctx);
        else this.bar.draw(ctx);

    }

    softReset(ctx) {
        let offset = this.h / 2 - 12;
        // ctx.fillRect(this.x, this.y + offset, this.w, 25);
    }

    hardReset(ctx) {
        this.softReset(ctx);
        this.bar.hue = 0;
        this.bar.widths = 0;
        this.counter = 0;
        this.particles = [];
    }
}