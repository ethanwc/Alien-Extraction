
//https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
// return true if the rectangle and circle are colliding
/**
 * @return {boolean}
 */
function RectCircleColliding(cx, cy, cr, rx, ry, rw, rh){
    let DeltaX = cx - Math.max(rx, Math.min(cx, rx + rw));
    let DeltaY = cy - Math.max(ry, Math.min(cy, ry + rh));
    return (DeltaX * DeltaX + DeltaY * DeltaY) < (cr * cr);
}

// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

function rectintersect(ax, ay, aw, ah, bx, by, bw, bh) {
    return (ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by);
}

function distance(a, b) {
    var difX = a.x - b.x;
    var difY = a.y - b.y;
    return Math.sqrt(difX * difX + difY * difY);
}


// LINE/RECT
function lineRect(x1, y1, x2, y2, x3, y3, x4, y4) {

    // calculate the direction of the lines
    var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));


    //todo:
    //change to
    //return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
}