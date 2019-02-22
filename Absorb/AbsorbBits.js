class AbsorbBits {
    constructor() {
        this.speed = 20;
    }

    update() {
        if (ship.isAbsorbing) {

            for (let i = 0; i < gameEngine.entities.length; i++) {

                let entity = gameEngine.entities[i];

                if (entity instanceof Bits) {
                    //if a bit is ready to be absorbed
                    if (RectCircleColliding(ship.x + ship.w * .25 * shipscale, ship.y + ship.h * .25 * shipscale,
                            ship.r * shipscale, entity.x, entity.y, entity.w, entity.h)) {
                        this.handleAbsorb(entity);

                    }
                    //if not, move closer
                    else {
                        this.moveBit(entity);
                    }
                }
            }
        }
        //ship isn't absorbing, bits fall with gravity
        // else {
        //     for (let i = 0; i < gameEngine.entities.length; i++) {
        //
        //         let bit = gameEngine.entities[i];
        //
        //         if (bit instanceof Bits) {
        //             for (let j = 0; j < gameEngine.entities.length; j++) {
        //
        //                 let tile = gameEngine.entities[j];
        //                 if (!(tile instanceof Bits)) {
        //                         // let res = rectintersect(bit.x, bit.y, bit.w, bit.h, tile.x, tile.y, tile.w, tile.h);
        //                     if (bit.xOffset !== undefined) {
        //                         if (bit.x + 70 === tile.x) {
        //                             console.log("Yes");
        //                             if (rectintersect(bit.x, bit.y, bit.w, bit.h, tile.x, tile.y, tile.w, tile.h)) {
        //
        //                             }
        //                             else {
        //                                 bit.y += .0025;
        //
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }

    handleAbsorb(bit) {
        if (info.cargo < info.cargoCapacity) {

            bit.onAbsorb();
            info.cargo++;
            bit.removeFromWorld = true;

            let pop = document.createElement("audio");
            pop.src = "./assets/sound/pop.mp3";
            pop.play();

        }
        //cargo is full, disable absorption
        else {
            ship.toggleAbsorb();
            full.play();
        }
    }

    moveBit(bit) {
        if (ship.x > bit.x) bit.x+= this.speed;
        if (ship.x < bit.x) bit.x-= this.speed;

        if (ship.y > bit.y) bit.y+= this.speed;
        if (ship.y < bit.y) bit.y-= this.speed;
    }

    draw(ctx) {

    }

}