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
                    if (RectCircleColliding(ship.x + ship.w * .25, ship.y + ship.h * .25,
                            ship.r, entity.x, entity.y, entity.w, entity.h)) {
                        this.handleAbsorb(entity);

                    }
                    //if not, move closer
                    else {
                        this.moveBit(entity);
                    }
                }
            }
        }
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