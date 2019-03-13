class WinMenu {
    constructor(img, x, y, w, h) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lastClick = 0;
        this.coolDown = .2;
        this.isUnlocked = false;
        this.isEnabled = false;
        this.isDrawing = false;
        this.level = 0;
        this.isUnlocked = false;
        this.menuItem = undefined;
        this.init();
    }

    init() {
        this.menuItem = new MenuItem(this, undefined,
            AM.getAsset("./assets/img/menu_table1.png"), this.x, this.y + 100, this.w, this.h * 1.8, this.restartGame, "Play Again?");
    }

    restartGame() {
        console.log("making it here");
        this.isEnabled = false;
        restartGame();
    }

    update() {
        if (explosionLevel === 4 && damageLevel === 4 && speedLevel === 4 && hangarLevel === 4 && healthLevel === 4 && fuelLevel === 4) {
            this.isEnabled = true;
        }

        if (this.isEnabled) {
            this.menuItem.update();
            godMenu = true;
        }
    }

    draw (ctx) {
        if (this.isEnabled) {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            this.menuItem.draw(ctx);
            ctx.font = "50px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Play Again?", this.x + 100, this.y + 160, this.w);
        }
    }
}