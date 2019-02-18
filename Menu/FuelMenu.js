class FuelMenu extends Menu {
    constructor(x, w) {
        super(AM.getAsset("./assets/img/menu_background.png"), x, w, width/2 - 940/2, height/2 - 1010/2, 940, 1010);
        this.w = 940;
        this.h = 1010;
        this.x = width/2 - this.w/2;
        this.y = height/2 - this.h/2;
        this.img = undefined;
        this.items = [];
        this.text = [];
        this.createMenuItems();

    }

    update() {
        super.update();
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
        temp = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x, this.y + 200 - 30, width, height, this.fullBuy);
        this.items.push(temp);


        for (let i = 0; i < 20; i++) this.text.push("test123");





        temp = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x, (this.y + 200 * 2 - 30), width, height, this.fullBuy, "test");
        this.items.push(temp);
        temp = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x, (this.y + 200 * 3 - 30), width, height, this.fullBuy);
        this.items.push(temp);
        temp = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x, (this.y + 200 * 4 - 30), width, height, this.fullBuy);
        this.items.push(temp);




        x+= 10;

        temp = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x + width, this.y + 200 - 30, width, height, this.fullBuy);
        this.items.push(temp);
        temp = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x + width, this.y + 200 * 2 - 30, width, height, this.fullBuy);
        this.items.push(temp);
        temp = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x + width, this.y + 200 * 3 - 30, width, height, this.fullBuy);
        this.items.push(temp);
        temp = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x + width, this.y + 200 * 4 - 30, width, height, this.fullBuy);
        this.items.push(temp);


        temp = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_exit.png"), this.x + this.w - 135, this.y + 20, 100, 100, this.exit);

        this.items.push(temp);


    }

    drawMenu(ctx) {
        // ctx.drawImage(this.background, this.x, this.y, this.w, this.h);

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

    exit(menuItem) {
        menuItem.menu.setTime();
    }

}