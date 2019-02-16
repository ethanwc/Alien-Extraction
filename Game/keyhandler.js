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

    switch (e.which) {
        case 1:
            ship.shootLaser();
            break;
        case 3:
            ship.shootMissile();
            break;
    }
};

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 88:
            //X
            ship.toggleAbsorb();
            break;
        case 90:
            //Z
            ship.toggleLanding();
            break;
        case 32:
            //SPACE
            ship.burst();
            break;
        case 65:
            //LEFT
            direction.dx = -1;
            ship.ha -= 70;
            break;
        case 87:
            //UP
            direction.dy = -1;
            ship.va -= 70;
            break;
        case 68:
            //RIGHT
            direction.dx = 1;
            ship.ha += 70;
            break;
        case 83:
            //DOWN
            direction.dy = 1;
            ship.va += 70;
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