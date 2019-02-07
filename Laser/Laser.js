class Laser {
    constructor(game, x, y, endx, endy) {
        this.game = game;
        this.removeFromWorld = false;
        this.x = x;
        this.y = y;
        this.endx = endx;
        this.endy = endy;
        this.viewTime = .1;
        this.initTime = gameEngine.timer.gameTime;
    }

        update() {
            let currentTime = gameEngine.timer.gameTime;

            if ((currentTime - this.initTime) > this.viewTime) {
                this.removeFromWorld = true;
            }

            //only check once :)
            if (currentTime === gameEngine.timer.gameTime) {
                for (let i = 0; i < gameEngine.entities.length; i++) {

                    let entity = gameEngine.entities[i];

                    if (entity instanceof Tile) {

                        let x1 = this.x + camera.x, x2 = this.endx + camera.x;
                        let y1 = this.y + camera.y, y2 = this.endy + camera.y;
                        let rx = entity.x, ry = entity.y;
                        let rw = entity.w, rh = entity.h;

                        let left =   lineRect(x1,y1,x2,y2, rx,ry,rx, ry+rh);
                        let right =  lineRect(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
                        let top =    lineRect(x1,y1,x2,y2, rx,ry, rx+rw,ry);
                        let bottom = lineRect(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
                        if (left || right || top || bottom) {
                            entity.removeFromWorld = true;
                            gameEngine.addEntity(new Smoke(gameEngine, AM.getAsset("./assets/img/smoke.png"),
                                entity.x-70, entity.y-26));//custom offset to align
                        }
                    }
                }
            }
        }


        draw(ctx) {

        }
}