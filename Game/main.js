let gameEngine = undefined;
let worldWidth = 55;
let worldHeight = 150;
let ship = undefined;
let camera = undefined;
let status = undefined;
let health = undefined;
let fuel = undefined;
let screenScale = .9;
let width = undefined;
let height = undefined;
let info;
let canvas = undefined;
let selectionPrice = 0;
let explosionRadius = 300;
let laserDamage = 100;
let basePrice = 1000;
let explosionLevel = 0;
let damageLevel = 0;
let speedLevel = 0;
let hangarLevel = 0;
let healthLevel = 0;
let fuelLevel = 0;
let absorbLevel = 0;
let fuelDrainRate = 1;
let healthDamageMultiplier = 1;
let fuelCost = 1;
let happyValue = 1000;
let dirtValue = 1;
let stoneValue = 4;
let copperValue = 20;
let silverValue = 35;
let goldValue = 100;
let crystalValue = 200;
let inMenu = false;
let xcap = tilesize * worldWidth;
let ycap = tilesize * worldHeight;
let bitList;
let argLoaded = 0;
let shipscale = .5;


function temp() {
    alert('works');
}

function startGame()  {



    menu_start.play();
    let startImg = document.getElementById('startImg');
    startImg.parentNode.removeChild(startImg);


    AM.downloadAll(function () {
        canvas = document.getElementById("gameWorld");
        canvas.style.display='block';

        // document.documentElement.style.overflow = 'hidden';  // firefox, chrome

        let ctx = canvas.getContext("2d");

        width = screen.width * screenScale;
        height = screen.height * screenScale;

        document.getElementById("gameWorld").width = width;
        document.getElementById("gameWorld").height = height;
        //
        // document.getElementById("menu").width = width;
        // document.getElementById("menu").height = height;

        // document.getElementById("menu").height = screen.width * screenScale;
        // document.getElementById("menu").height = screen.height * screenScale;




        gameEngine = new GameEngine();

        let assets = [];
        let tiles = [];

        // assets.push(new Blackhole(gameEngine, AM.getAsset("./assets/img/blackhole.png"), 500, 0, 1 / 2));
        // assets.push(new Magnet(gameEngine, AM.getAsset("./assets/img/magnet.png"), 300, 0, 2));


        ship = new AlienShip(gameEngine, AM.getAsset("./assets/img/ship_fly.png"), 0, 0);


        camera = new Camera(ship);
        gameEngine.init(ctx, camera);
        gameEngine.start();
        gameEngine.addEntity(camera);

        // status = new Hud(ship);


        genworld(gameEngine, worldWidth, worldHeight, tiles);


        for (let i = 0; i < tiles.length; i++) {
            gameEngine.addEntity(tiles[i]);
        }

        for (let i = 0; i < assets.length; i++) {
            gameEngine.addEntity(assets[i]);
        }
        let f = new FuelStore(AM.getAsset("./assets/img/store_fuel.png"), 400, -764 + 10 * tilesize, 840, 764);
        let g = new UpgradeStore(AM.getAsset("./assets/img/store_upgrade.png"), 2800, -1169/2 + 10 * tilesize, 1255, 1169);
        let h = new MineralStore(AM.getAsset("./assets/img/store_minerals.png"), 1300, -642/2 + 10 * tilesize, 1309, 642);

        gameEngine.addEntity(f);
        gameEngine.addEntity(g);
        gameEngine.addEntity(h);


        gameEngine.addEntity(ship);



        let sw = screen.width * screenScale;
        let sh = screen.height * screenScale;
        let windowoffset = 25;
        let iw = 400;
        let ih = 70;
        let pw = 330;
        let ph = 100;
        let x = sw - iw - windowoffset;
        let y = windowoffset + ph/2;

        let img = new Icon(gameEngine, AM.getAsset("./assets/img/status_health_table.png"), x, y, iw, ih);
        health = new Health(ship, 100, img.x + 6, img.y - 32, pw, ph);

        gameEngine.addEntity(img);
        gameEngine.addEntity(health);

        y = windowoffset +  3 * ph/2;

        let img2 = new Icon(gameEngine, AM.getAsset("./assets/img/status_energy_table.png"), x, y, iw, ih);
        fuel = new Fuel(ship, 70, img2.x + 6, img2.y - 32, pw, ph);


        gameEngine.addEntity(img2);
        gameEngine.addEntity(fuel);

        info = new Model(sw - iw - windowoffset);

        let abc = new InfoMenu(AM.getAsset("./assets/img/icon_info.png"),sw - iw - windowoffset - 210/4 - 40, 40, 210/4, 210/4, img2.x + 6, img2.y + ph + 20);

        gameEngine.addEntity(abc);

        gameEngine.addEntity(info);



        let absorb = new AbsorbBits();
        gameEngine.addEntity(absorb);

        let mm = new FuelMenu(f.x, f.w + 550);
        gameEngine.addEntity(mm);

        let m = new UpgradeMenu(g.x, g.w);
        gameEngine.addEntity(m);

        let rrr = new MineralMenu(h.x, h.w);
        gameEngine.addEntity(rrr);

        bitList = new BitList();

    });
}