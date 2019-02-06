class Ship {
    constructor(game, animation, x, y) {
        this.game = game;
        this.animation = animation;
        this.removeFromWorld = false;
        this.speed = 400;
        this.x = x;
        this.y = y;
    }

    update() {
        this.x += this.game.clockTick * this.speed * direction.dx;
        this.y += this.game.clockTick * this.speed * direction.dy;



        // for (var i = 0; i < this.game.entities.length; i++) {
        //     var ent = this.game.entities[i];
        //
        //     //what the fuck is this
        //     if (ent instanceof Tile) {
        //         var l = this.collideLeft(ent), r = this.collideRight(ent), t = this.collideTop(ent),
        //             b = this.collideBottom(ent), e = this.collideEncompass(ent);
        //         // if (l || r || b || t) {
        //
        //         if ((b && (r || l)) || (t && (r || l)) || (e && (t || b)) || (e && (l || r))) {
        //             this.collide();
        //             // ent.x = -100;
        //             // ent.y = -100;
        //             if (!(ent.type === "stars" || ent.type === "sky" || ent.type === "sky2" || ent.type === "sky3")) {
        //                 // ent.removeFromWorld = true;
        //
        //             }
        //
        //         }
        //     }
        // }
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1);
    }
}


// Ufo.prototype.collide = function(entity) {
//     // entity.removeFromWorld = true;
//     // alert('collision detected');
// };
//
//
//
// Ufo.prototype.collideBottom = function(other) {
//     if (other instanceof Tile) {
//         return (((this.y + (this.animation.frameHeight * ufoscale)) > other.y) &&
//             ((this.y + (this.animation.frameHeight * ufoscale)) < (other.y + (other.animation.frameHeight * scale))));
//     }
//     else return false;
// };
//
// Ufo.prototype.collideTop = function(other) {
//     if (other instanceof Tile) {
//         return ((this.y > other.y) &&
//             (this.y < (other.y + (other.animation.frameHeight * scale))));
//     }
//
//     else return false;
// };
//
// Ufo.prototype.collideLeft = function(other) {
//     if (other instanceof Tile) {
//         return ((this.x > other.x) &&
//             (this.x < (other.x + (other.animation.frameWidth * scale))));
//     }
//
//     else return false;
// };
//
// Ufo.prototype.collideRight = function(other) {
//     if (other instanceof Tile) {
//
//         return (((this.x + (this.animation.frameWidth * ufoscale)) > other.x) &&
//             ((this.x + (this.animation.frameWidth * ufoscale)) < (other.x + (other.animation.frameWidth * scale))));
//     }
//
//     else return false;
// };
// Ufo.prototype.collideEncompass = function(other) {
//     if (other instanceof Tile) {
//         return ((this.x < other.x) && ((this.x + (this.animation.frameWidth * ufoscale)) > (other.x + (other.animation.frameWidth * scale)))) ||
//             ((this.y < other.y) && ((this.y + (this.animation.frameHeight * ufoscale)) > (other.y + (other.animation.frameHeight * scale))));
//
//     }
// };