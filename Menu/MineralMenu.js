class MineralMenu extends Menu {
    constructor(x, w) {
        super(AM.getAsset("./assets/img/window_long.png"), x, w, width/2 - 940/4, height/2 - 1400/4, 940/2, 1400/2);
        this.items = [];
        this.createMenuItems();
        this.currentCost = 0;
    }

    createMenuItems() {
        let x = this.x + 20;
        let y = this.y;


        let temp = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), this.x + 10, this.y + this.w/2 + 335, 450, 101, this.sellAll, undefined);
        this.items.push(temp);

        let r = new MenuItem(this, undefined, AM.getAsset("./assets/img/gold_bit.png"), this.x + 50, this.y + 80, 50, 50, this.sellGold, undefined);
        this.items.push(r);

    }

        update() {
        super.update();
    }

    draw(ctx) {

        if (this.isEnabled) {
            ctx.drawImage(this.background, this.x, this.y, this.w, this.h);

            this.drawMenu(ctx);


            ctx.font = "40px Arial";
            ctx.fillStyle = "white";

            ctx.fillText("Item:    Quantity:    Total Value:   ", this.x + this.w / 2 - 200, this.y + 55, 400);


            ctx.fillText(info.goldQuantity + "      $" + info.goldQuantity * info.goldValue, this.x + 180, this.y + this.w / 2 - 115, 300);


            ctx.font = "60px Arial";


            ctx.fillText("Sell All: " + this.totalValue(), this.x + 30, this.y + this.w / 2 + 400, 400);
        }
    }

    drawMenu(ctx) {

        for (let i = 0; i < this.items.length; i++) {
            let menuItem = this.items[i];
            menuItem.update();
            menuItem.draw(ctx);
        }
    }
    updateCost() {

    }

    sellGold() {
        this.currentCost ++;
    }

    totalValue() {
        return "100000 Crystals";
    }

    sellAll() {
        info.updateBalance(100);
    }

}