let direction = {
    dx: 0,
    dy: 0
};

let mouse = {
    x:0,
    y:0
};


document.onmousedown = function(e) {
    mouse.x = event.clientX - gameEngine.ctx.canvas.getBoundingClientRect().left;
    mouse.y = event.clientY - gameEngine.ctx.canvas.getBoundingClientRect().top;
    // mouse.x = e.clientX - .15 * screen.width;
    // mouse.y = e.clientY - .15 * screen.height;

    if (!ship.landingGear)
    switch (e.which) {
        case 1:

            console.log(screen.width * .9 - camera.x, 100 - camera.y);
            gameEngine.addEntity(new Beam(gameEngine, ship.x + (ship.w/3 + 55) * ship.animation.scaleBy - camera.x, ship.y + ship.h * ship.animation.scaleBy - 20 - camera.y));
            gameEngine.addEntity(new Beam(gameEngine, ship.x + (ship.w/3 + 120) * ship.animation.scaleBy - camera.x, ship.y + ship.h * ship.animation.scaleBy - 20 - camera.y));
            // beam_noise.play();

            let laser_beam_fire = document.createElement("audio");
            laser_beam_fire.src = "./assets/sound/laser4.mp3";
            laser_beam_fire.play();

            // myAudio.pause();
            break;
        case 3:
            ship.shoot();
            break;
    }
};

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 90:
            //Z
            ship.toggleLanding();
            break;
        case 32:
            //SPACE
            gameEngine.addEntity(new EnergyBall(gameEngine, AM.getAsset("./assets/img/energyball.png"), ship.x - 15 , ship.y ));
            let burst = document.createElement("audio");
            burst.src = "./assets/sound/burst1.wav";
            burst.play();
            break;
        case 65:
            //LEFT
            direction.dx = -1;
            ship.ha -= 50;
            break;
        case 87:
            //UP
            direction.dy = -1;
            ship.va -= 50;
            break;
        case 68:
            //RIGHT
            direction.dx = 1;
            ship.ha += 50;
            break;
        case 83:
            //DOWN
            direction.dy = 1;
            ship.va += 50;
            break;
    }
};

document.onkeyup = function(e) {
    switch (e.keyCode) {
        case 65:
            //LEFT
            direction.dx = 0;
            ship.ha = 0;
            break;
        case 87:
            //UP
            direction.dy = 0;
            ship.va = 0;
            break;
        case 68:
            //RIGHT
            direction.dx = 0;
            ship.ha = 0;
            break;
        case 83:
            //DOWN
            direction.dy = 0;
            ship.va = 0;
            break;
    }
};