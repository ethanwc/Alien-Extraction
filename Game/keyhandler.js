let direction = {
    dx: 0,
    dy: 0
};

let mouse = {
    x:0,
    y:0
};

document.onmousedown = function(e) {
    mouse.x = e.clientX - .15 * screen.width;
    mouse.y = e.clientY;

    if (!ship.landingGear)
    switch (e.which) {
        case 1:
            gameEngine.addEntity(new Beam(gameEngine, ship.x + ship.w/3 + 55 - camera.x, ship.y + ship.h - 20 - camera.y));
            gameEngine.addEntity(new Beam(gameEngine, ship.x + 2 * ship.w/3 - 55 - camera.x, ship.y + ship.h - 20 - camera.y));
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