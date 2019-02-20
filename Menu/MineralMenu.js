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

        let exit = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_exit.png"), x + this.w - 120, this.y - 150, 100, 100, this.exit);
        this.items.push(exit);

        let temp = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), this.x + 10, this.y + this.w/2 + 335, 450, 101, this.sellAll, undefined);
        this.items.push(temp);

        let r = new MenuItem(this, undefined, AM.getAsset("./assets/img/dirt_bit.png"), this.x + 50, this.y + 80, 50, 50, this.sellGold, undefined);
        this.items.push(r);
        r = new MenuItem(this, undefined, AM.getAsset("./assets/img/stone_bit.png"), this.x + 50, this.y + 80 + 60, 50, 50, this.sellBlueCrystal, undefined);
        this.items.push(r);

        r = new MenuItem(this, undefined, AM.getAsset("./assets/img/copper_bit.png"), this.x + 50, this.y + 80 + 60 * 2, 50, 50, this.sellStone, undefined);
        this.items.push(r);

        r = new MenuItem(this, undefined, AM.getAsset("./assets/img/silver_bit.png"), this.x + 50, this.y + 80 + 60 * 3, 50, 50, this.sellDirt, undefined);
        this.items.push(r);

        r = new MenuItem(this, undefined, AM.getAsset("./assets/img/gold_bit.png"), this.x + 50, this.y + 80 + 60 * 4, 50, 50, this.sellSilver, undefined);
        this.items.push(r);

        r = new MenuItem(this, undefined, AM.getAsset("./assets/img/blue_crystal_bit.png"), this.x + 50, this.y + 80 + 60 * 5, 50, 50, this.sellSilver, undefined);
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


            ctx.fillText(bitList.dirtBits + "      $" + bitList.dirtBits * dirtValue, this.x + 180, this.y + this.w / 2 - 115, 300);

            ctx.fillText(bitList.stoneBits + "      $" + bitList.stoneBits * stoneValue, this.x + 180, this.y + this.w / 2 - 115 + 60, 300);
            ctx.fillText(bitList.copperBits + "      $" + bitList.copperBits * copperValue, this.x + 180, this.y + this.w / 2 - 115 + 60*2, 300);
            ctx.fillText(bitList.silverBits + "      $" + bitList.silverBits * silverValue, this.x + 180, this.y + this.w / 2 - 115 + 60*3, 300);
            ctx.fillText(bitList.goldBits + "      $" + bitList.goldBits * goldValue, this.x + 180, this.y + this.w / 2 - 115 + 60*4, 300);
            ctx.fillText(bitList.crystalBits + "      $" + bitList.crystalBits * crystalValue, this.x + 180, this.y + this.w / 2 - 115 + 60*5, 300);


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

    sellAll() {
        info.balance += (bitList.copperBits * copperValue + bitList.crystalBits * crystalValue + bitList.dirtBits * dirtValue + bitList.goldBits * goldValue + bitList.happyBits * happyValue + bitList.silverBits * silverValue + bitList.stoneBits * stoneValue);
        bitList.reset();
        info.cargo = 0;
    }

    totalValue() {
        return bitList.copperBits * copperValue + bitList.crystalBits * crystalValue + bitList.dirtBits * dirtValue + bitList.goldBits * goldValue + bitList.happyBits * happyValue + bitList.silverBits * silverValue + bitList.stoneBits * stoneValue;
    }

    sellBlueCrystal() {

    }

    sellStone () {

    }

    sellDirt() {

    }

    sellSilver() {

    }

    exit(menuItem) {
        menuItem.menu.setTime();
    }

}