class FuelMenu extends Menu {
    constructor(x, w) {
        super(AM.getAsset("./assets/img/menu_background.png"), x, w, width/2 - 940/2, height/2 - 1010/2, 940, 1010);
        this.w = 940/2;
        this.h = 1010;
        this.x = width/2 - this.w/2;
        this.y = height/2 - this.h/2;
        this.img = undefined;
        this.items = [];
        this.text = [];
        this.createMenuItems();

    }

    update() {
        if (!godMenu)
            super.update();
    }

    draw(ctx) {
        if (!godMenu)
        if (this.isEnabled) {
            this.drawMenu(ctx);
        }
    }

    createMenuItems() {
        let x = this.x + 15;
        let height = 140;
        let width = (this.w - 20);
        for (let i = 0; i < 20; i++) this.text.push("test123");

        let fill = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x, this.y + height - 30, width, height, this.quarterRefuel, "25% Refill");
        this.items.push(fill);
        fill = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x, (this.y + height * 2 - 30), width, height, this.halfRefuel, "50% Refill");
        this.items.push(fill);
        fill = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x, (this.y + height * 3 - 30), width, height, this.threeQuarterRefuel, "75% Refill");
        this.items.push(fill);
        fill = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x, (this.y + height * 4 - 30), width, height, this.fullRefuel, "Full Refill");
        this.items.push(fill);
        let health = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_table1.png"), x, (this.y + height * 5 - 30), width, height, this.healthRepair, "Repair Ship");
        this.items.push(health);
        let exit = new MenuItem(this, undefined, AM.getAsset("./assets/img/menu_exit.png"), this.x + width - 100 + 40, this.y + 40, 100/2, 100/2, this.exit);
        this.items.push(exit);


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
                ctx.fillText(menuItem.text, menuItem.x + menuItem.w/4 - 20 , menuItem.y + menuItem.h/2 + 15, menuItem.w);
            }
        }
    }

    refuel() {
        fuel.fuelLevel = 50;
    }

    quarterRefuel() {
        let amount = fuel.fuelCapacity * .25;
        let cost = (amount * fuelCost) | 0;
        if (info.balance >= cost) {
            fuel.addFuel(amount);
            info.balance -= cost;
            playMoney();
        } else playError();
    }

    halfRefuel() {
        let amount = fuel.fuelCapacity * .5;
        let cost = (amount * fuelCost) | 0;
        if (info.balance >= cost) {
            fuel.addFuel(amount);
            info.balance -= cost;
            playMoney();
        } else playError();
    }

    threeQuarterRefuel() {
        let amount = fuel.fuelCapacity * .75;
        let cost = (amount * fuelCost) | 0;
        if (info.balance >= cost) {
            fuel.addFuel(amount);
            info.balance -= cost;
            playMoney();
        } else playError();
    }

    fullRefuel() {
        let amount = fuel.fuelCapacity * 1;
        let cost = (amount * fuelCost) | 0;
        if (info.balance >= cost) {
            fuel.addFuel(amount);
            info.balance -= cost;
            playMoney();
        } else playError();
    }

    healthRepair() {
        let amount = health.maxHealth - health.health;
        let cost = amount;
        if (info.balance >= cost) {
            health.addHealth(amount);
            info.balance -= cost;
            playMoney();
            alarm.pause();
        } else playError();
    }

    exit(menuItem) {
        menuItem.menu.setTime();
    }
}