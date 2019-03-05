class InfoMenu {
    constructor(img, x, y, w, h, textx, texty) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.textx = textx;
        this.texty = texty;
        this.lastClick = 0;
        this.coolDown = .2;
        this.isUnlocked = false;
        this.isEnabled = true;
        this.isDrawing = false;
        this.level = 0;
        this.isUnlocked = false;
    }
    update() {
        if (this.isEnabled && this.checkSelected())
            this.handleClick()
    }

    draw (ctx) {
        if (this.isEnabled)
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

        if (this.isDrawing) {
            ctx.font = "25px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("WASD keys to Move, M1 Laser", this.textx, this.texty, 400);
            ctx.fillText("Space to use Burst, M2 to use Rockets (Cooldowns)", this.textx, this.texty+30, 400);
            ctx.fillText("X to Absorb Particles", this.textx, this.texty+60, 400);
            ctx.fillText("Z to Deploy/Retract Weapons(To land at stores)", this.textx, this.texty+90, 400);
        }
    }

    checkSelected() {
        return (mouse.x > this.x && mouse.x < this.x + this.w &&
            mouse.y > this.y && mouse.y < this.y + this.h);
    }

    handleClick() {
        //toggle draw
        //draw the texts
        if (mouse.isPressed) {
            if ((gameEngine.timer.gameTime - this.lastClick) > this.coolDown) {
                this.isDrawing = !this.isDrawing;
                this.lastClick = gameEngine.timer.gameTime;
            }
        }
    }
}