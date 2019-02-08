let gameEngine = undefined;
let worldWidth = 100;
let worldHeight = 150;
let ship = undefined;
let camera = undefined;

function startGame()  {
    let startImg = document.getElementById('startImg');
    startImg.parentNode.removeChild(startImg);
    AM.downloadAll(function () {
        let canvas = document.getElementById("gameWorld");
        let ctx = canvas.getContext("2d");

        document.getElementById("gameWorld").width = screen.width * .7;
        document.getElementById("gameWorld").height = screen.height * .7;


        gameEngine = new GameEngine();

        let assets = [];
        let tiles = [];

        // assets.push(new Boom(gameEngine, AM.getAsset("./assets/img/boom.png"), 1200, 0));
        assets.push(new EnergyBall(gameEngine, AM.getAsset("./assets/img/energyball.png"), 100, 200));
        assets.push(new Heart(gameEngine, AM.getAsset("./assets/img/heart.png"), 300, 0));

        assets.push(new Blackhole(gameEngine, AM.getAsset("./assets/img/blackhole.png"), 500, 500, 1 / 2));
        assets.push(new Magnet(gameEngine, AM.getAsset("./assets/img/magnet.png"), 450, 450, 2));

        // assets.push(new Missile(gameEngine, AM.getAsset("./assets/img/missile.png")));


        ship = new AlienShip(gameEngine, AM.getAsset("./assets/img/ship_fly.png"), 600, -600);


        camera = new Camera(ship);
        gameEngine.init(ctx, camera);
        gameEngine.start();
        gameEngine.addEntity(camera);


        genworld(gameEngine, worldWidth, worldHeight, tiles);


        for (let i = 0; i < tiles.length; i++) {
            gameEngine.addEntity(tiles[i]);
        }

        for (let i = 0; i < assets.length; i++) {
            gameEngine.addEntity(assets[i]);
        }

        gameEngine.addEntity(ship);

    });
}