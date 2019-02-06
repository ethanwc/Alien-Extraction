//https://medium.com/techtrument/multithreading-javascript-46156179cf9a
//one thread for just collision detection?


/*
FUEL STATION
UPGRADE STATION
INFO DISPLAY (IN CAMERA)
FUEL MODEL. ECONOMY MODEL.
UFO PHYSICS spin faster bsaed on speed, reverse spin
ufo landing animation?
pause game while in upgrade menu
upgrade menu
scoring system
 */



var w,h;






AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    document.getElementById("gameWorld").width = screen.width * .9;
    document.getElementById("gameWorld").height = screen.height * .9;
    w = screen.availWidth;
    h = screen.availHeight;

    const gameEngine = new GameEngine();

    let tiles = [];

    tiles.push(new Smoke(gameEngine, AM.getAsset("./assets/img/smoke.png"), 1000, 0));
    tiles.push(new Boom(gameEngine, AM.getAsset("./assets/img/boom.png"), 1200, 0));
    tiles.push(new EnergyBall(gameEngine, AM.getAsset("./assets/img/energyball.png"), 100, 200));
    tiles.push(new Heart(gameEngine, AM.getAsset("./assets/img/heart.png"), 300, 0));

    tiles.push(new Blackhole(gameEngine, AM.getAsset("./assets/img/blackhole.png"), 500, 500, 1/2));
    tiles.push(new Magnet(gameEngine, AM.getAsset("./assets/img/magnet.png"), 450, 450, 2));

    tiles.push(new Grass(gameEngine, AM.getAsset("./assets/img/grass.png"), 0, 1000, 100, 100));
    tiles.push(new Dirt(gameEngine, AM.getAsset("./assets/img/dirt.png"), 0, 1100, 100, 100));

    tiles.push(new Dirt(gameEngine, AM.getAsset("./assets/img/stone.png"), 0, 1200, 100, 100));




    let ship = new Ufo(gameEngine, AM.getAsset("./assets/img/ufo.png"), 0, 0);
    let camera = new Camera(ship);
    gameEngine.init(ctx, camera);
    gameEngine.start();
    gameEngine.addEntity(ship);


    for (let i = 0; i < tiles.length; i++) {
        gameEngine.addEntity(tiles[i]);
    }




});