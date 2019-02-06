let direction = {
    dx: 0,
    dy: 0
};

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 32:
            //SPACE
            break;
        case 65:
            //LEFT
            direction.dx = -1;
            break;
        case 87:
            //UP
            direction.dy = -1;
            break;
        case 68:
            //RIGHT
            direction.dx = 1;
            break;
        case 83:
            //DOWN
            direction.dy = 1;
            break;
    }
};

document.onkeyup = function(e) {
    switch (e.keyCode) {
        case 65:
            //LEFT
            direction.dx = 0;
            break;
        case 87:
            //UP
            direction.dy = 0;
            break;
        case 68:
            //RIGHT
            direction.dx = 0;
            break;
        case 83:
            //DOWN
            direction.dy = 0;
            break;
    }
};