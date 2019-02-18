class MenuItem {
    constructor(menu, level, img, x, y, w, h, callback, text) {
        this.menu = menu;
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lastClick = 0;
        this.coolDown = .2;
        this.callback = callback;
        this.text = text;
        this.isUnlocked = false;
        this.level = 0;
        this.isClicked = false;
        this.level = level;
    }
    update() {
        if (this.menu.isEnabled)
        this.handleClick()
    }

    draw (ctx) {
        if (this.menu.isEnabled)
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    checkSelected() {
        return (mouse.x > this.x && mouse.x < this.x + this.w &&
            mouse.y > this.y && mouse.y < this.y + this.h);
    }

    handleClick() {
        if (this.checkSelected()) {
            if (this.level !== undefined) {
                this.menu.updateCost(this.level);
            }
            if (mouse.isPressed) {
                if ((gameEngine.timer.gameTime - this.lastClick) > this.coolDown) {
                    this.callback(this);
                    this.lastClick = gameEngine.timer.gameTime;
                }
            }
        }

    }
}