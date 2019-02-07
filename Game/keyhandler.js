let direction = {
    dx: 0,
    dy: 0
};

let mouse = {
    x:0,
    y:0
};

document.onmousedown = function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    console.log(mouse.x, mouse.y);

    gameEngine.addEntity(new Missile(gameEngine));

};

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 32:
            //SPACE
            break;
        case 65:
            //LEFT
            direction.dx = -1;
            ship.ha -= 30;
            break;
        case 87:
            //UP
            direction.dy = -1;
            ship.va -= 30;
            break;
        case 68:
            //RIGHT
            direction.dx = 1;
            ship.ha += 30;
            break;
        case 83:
            //DOWN
            direction.dy = 1;
            ship.va += 30;
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