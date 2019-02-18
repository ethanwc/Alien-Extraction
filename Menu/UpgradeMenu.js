class UpgradeMenu extends Menu {
    constructor() {
        super(AM.getAsset("./assets/img/menu_background.png"));
        this.w = 940;
        this.h = 1080;
        this.x = width/2 - this.w/2;
        this.y = height/2 - this.h/2;
        this.img = undefined;
        this.items = [];
        this.text = [];
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
        let x = this.x + 15;
        let temp;
        let height = 200;
        let width = (this.w/2 - 20);
        temp = new MenuItem(AM.getAsset("./assets/img/menu_table1.png"), x, this.y + 200 - 30, width, height, this.fullBuy);
        this.items.push(temp);


        temp = new MenuItem(AM.getAsset("./assets/img/header_upgrade.png"), x + this.w/4, this.y + 50, 442, 59, this.dummyCallback);
        this.items.push(temp);



        temp = new MenuItem(AM.getAsset("./assets/img/menu_exit.png"), this.x + this.w - 135, this.y + 20, 100, 100, this.fullBuy);
        this.items.push(temp);


    }

    drawMenu(ctx) {
        ctx.drawImage(this.background, this.x, this.y, this.w, this.h);

        for (let i = 0; i < this.items.length; i++) {
            let menuItem = this.items[i];
            menuItem.update();
            menuItem.draw(ctx);
            if (menuItem.text !== undefined) {
                ctx.font = "60px Arial";
                ctx.fillStyle = "white";
                ctx.fillText(menuItem.text, menuItem.x + menuItem.w/4 , menuItem.y + menuItem.h/2, menuItem.w);
            }

        }
    }

    fullBuy() {
        info.updateBalance(500);
    }

    dummyCallback() {

    }

}