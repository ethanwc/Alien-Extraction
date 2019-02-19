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
        this.entityDistance = 10000000;
        this.entityToHurt = undefined;
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

                    if (entity instanceof Tile && entity.foreground) {

                        let x1 = this.x + camera.x, x2 = this.endx + camera.x;
                        let y1 = this.y + camera.y, y2 = this.endy + camera.y;
                        let rx = entity.x, ry = entity.y;
                        let rw = entity.w, rh = entity.h;

                        let left =   lineRect(x1,y1,x2,y2, rx,ry,rx, ry+rh);
                        let right =  lineRect(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
                        let top =    lineRect(x1,y1,x2,y2, rx,ry, rx+rw,ry);
                        let bottom = lineRect(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);
                        if (left || right || top || bottom) {
                            let distance = this.checkDistance(this.x + camera.x, this.y + camera.y, entity.x, entity.y);
                            if (distance < this.entityDistance) {
                                this.entityDistance = distance;
                                this.entityToHurt = entity;
                            }
                        }
                    }
                }
                if (this.entityToHurt !== undefined) {
                    this.entityToHurt.hitByLaser();
                    this.entityToHurt.removeFromWorld = true;
                }
            }
        }


        draw(ctx) {

        }

    checkDistance(ax, ay, bx, by) {
        let difX = ax - bx;
        let difY = ay - by;
        return Math.sqrt(difX * difX + difY * difY);
    }
}