window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

class GameEngine {
    constructor() {
        this.entities = [];
        this.tiles = [];
        this.ctx = null;
        this.ship = null;
    }

    init(ctx, camera) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.camera = camera;
        this.camera.w = this.surfaceWidth;
        this.camera.h = this.surfaceHeight;
        this.timer = new Timer();
        console.log("Game Initialized");
    }

    start() {
        console.log("starting game");
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    }

    addTile(tile) {
        console.log("added tile");
        this.tiles.push(tile);
    }

    addEntity(entity) {
        console.log("added entity");
        this.entities.push(entity);
    }

    update() {

        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            if (typeof entity.update === "undefined") console.log("error: ", entity);
            if (entity.removeFromWorld) this.entities.splice(i, 1);
            else entity.update();

        }
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
        this.ctx.save();
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
        this.ctx.restore();
    }
}

class Timer {
    constructor() {
        this.gameTime = 0;
        this.maxStep = 0.5;
        this.wallLastTimestamp = 0;
    }

    tick() {
        let wallCurrent = Date.now();
        let wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
        this.wallLastTimestamp = wallCurrent;

        let gameDelta = Math.min(wallDelta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    }
}