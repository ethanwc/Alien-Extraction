class MainMenu extends Menu{
    constructor() {
        super();
        this.background = AM.getAsset("./assets/img/menu_background.png");
        this.w = 940;
        this.h = 1080;
        this.x = width/2 - this.w/2;
        this.y = 100;
        this.img = undefined;
        this.items = [];
        this.createMenuItems();
    }

    update() {

    }

    draw(ctx) {
        if (this.isEnabled) {
            this.drawMenu(ctx);
        }
    }

    createMenuItems() {
        let temp = new MenuItem(AM.getAsset("./assets/img/menu_start.png"), this.x + 20, this.y + 160, 410, 121);
        this.items.push(temp);
    }


    drawMenu(ctx) {
        ctx.drawImage(this.background, this.x, this.y, this.w, this.h);
        // canvas.appendChild(this.img);

        // ctx.drawImage(this.img, this.x + 20, this.y + 160);

        for (let i = 0; i < this.items.length; i++) {
            let menuItem = this.items[i];
            menuItem.update();
            menuItem.draw(ctx);
        }
    }
}