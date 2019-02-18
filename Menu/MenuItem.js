class MenuItem {
    constructor(img, x, y, w, h, callback) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lastClick = 0;
        this.coolDown = .2;
        this.callback = callback;
    }
    update() {
        if (this.checkClick()) this.handleClick();
    }

    draw (ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    checkClick() {
        return (mouse.x > this.x && mouse.x < this.x + this.w &&
            mouse.y > this.y && mouse.y < this.y + this.h && mouse.isPressed);
    }

    handleClick() {
        if ((gameEngine.timer.gameTime - this.lastClick) > this.coolDown) {
            this.callback();
            this.lastClick = gameEngine.timer.gameTime;
        }
    }
}