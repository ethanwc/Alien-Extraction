let gameEngine = undefined;
let worldWidth = 50;
let worldHeight = 100;
let ship = undefined;
let camera = undefined;
let status = undefined;
let health = undefined;
let screenScale = .7;
let width = undefined;
let height = undefined;

function startGame()  {



    menu_start.play();
    let startImg = document.getElementById('startImg');
    startImg.parentNode.removeChild(startImg);

    let canvas = undefined;


    AM.downloadAll(function () {
        canvas = document.getElementById("gameWorld");
        canvas.style.display='block';
        let ctx = canvas.getContext("2d");

        width = screen.width * screenScale;
        height = screen.height * screenScale;

        document.getElementById("gameWorld").width = width;
        document.getElementById("gameWorld").height = height;

        // document.getElementById("menu").height = screen.width * screenScale;
        // document.getElementById("menu").height = screen.height * screenScale;

        // document.getElementById("menu").height = screen.width * screenScale;
        // document.getElementById("menu").height = screen.height * screenScale;




        gameEngine = new GameEngine();

        let assets = [];
        let tiles = [];

        assets.push(new Blackhole(gameEngine, AM.getAsset("./assets/img/blackhole.png"), 500, 0, 1 / 2));
        assets.push(new Magnet(gameEngine, AM.getAsset("./assets/img/magnet.png"), 300, 0, 2));


        ship = new AlienShip(gameEngine, AM.getAsset("./assets/img/ship_fly.png"), 600, -600);


        camera = new Camera(ship);
        gameEngine.init(ctx, camera);
        gameEngine.start();
        gameEngine.addEntity(camera);

        // status = new Status(ship);


        genworld(gameEngine, worldWidth, worldHeight, tiles);


        for (let i = 0; i < tiles.length; i++) {
            gameEngine.addEntity(tiles[i]);
        }

        for (let i = 0; i < assets.length; i++) {
            gameEngine.addEntity(assets[i]);
        }

        gameEngine.addEntity(ship);



        let sw = screen.width * screenScale;
        let sh = screen.height * screenScale;
        let windowoffset = 25;
        let iw = 400;
        let ih = 70;
        let pw = 330;
        let ph = 100;
        let x = sw - iw - windowoffset;
        let y = windowoffset;

        let img = new Icon(gameEngine, AM.getAsset("./assets/img/status_health_table.png"), x, y, iw, ih);
        health = new Health(ship, 100, img.x + 6, img.y - 32, pw, ph);

        gameEngine.addEntity(img);
        gameEngine.addEntity(health);

        y = windowoffset + ph;

        let img2 = new Icon(gameEngine, AM.getAsset("./assets/img/status_energy_table.png"), x, y, iw, ih);
        let fuel = new Fuel(ship, 100, img2.x + 6, img2.y - 32, pw, ph);

        gameEngine.addEntity(img2);
        gameEngine.addEntity(fuel);

    });
}