var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {

};

// UFO
function Ufo(game, spritesheet) {
    this.animation = new Animation(spritesheet, 56, 39, 6, .02, 12, true, 3);
    this.speed = 350;
    this.ctx = game.ctx;
    //250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 250);
}

Ufo.prototype = new Entity();
Ufo.prototype.constructor = Ufo;

Ufo.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x >1000) this.x = -230;
    Entity.prototype.update.call(this);
}

Ufo.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

//UFO_Beam
function Ufo_beam(game, spritesheet) {
    // function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.animation = new Animation(spritesheet, 56, 39, 6, .2, 6, true, 3);
    this.speed = 350;
    this.ctx = game.ctx;
    //250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 340);
}

Ufo_beam.prototype = new Entity();
Ufo_beam.prototype.constructor = Ufo_beam;

Ufo_beam.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x >1000) this.x = -230;
    Entity.prototype.update.call(this);
}

Ufo_beam.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

//Magnet
function Magnet(game, spritesheet) {
    // function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.animation = new Animation(spritesheet, 56, 102, 4, .2, 8, true, 1);
    this.speed = 350;
    this.ctx = game.ctx;
    //250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 170);
}

Magnet.prototype = new Entity();
Magnet.prototype.constructor = Magnet;

Magnet.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x >1000) this.x = -230;
    Entity.prototype.update.call(this);
}

Magnet.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

//Blackhole

function Blackhole(game, spritesheet) {
    // function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.animation = new Animation(spritesheet, 512, 512, 6, .1, 36, true, 1);
    this.speed = 350;
    this.ctx = game.ctx;
    //250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 170);
}

Blackhole.prototype = new Entity();
Blackhole.prototype.constructor = Blackhole;

Blackhole.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x >1000) this.x = -230;
    Entity.prototype.update.call(this);
}

Blackhole.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}




AM.queueDownload("./img/magnet.png");
AM.queueDownload("./img/blackhole.png");
AM.queueDownload("./img/ufo.png");
AM.queueDownload("./img/ufo_beam.png");
AM.queueDownload("./img/background_space.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background_space.png")));
    gameEngine.addEntity(new Magnet(gameEngine, AM.getAsset("./img/magnet.png")));
    gameEngine.addEntity(new Blackhole(gameEngine, AM.getAsset("./img/blackhole.png")));
    gameEngine.addEntity(new Ufo(gameEngine, AM.getAsset("./img/ufo.png")));
    gameEngine.addEntity(new Ufo_beam(gameEngine, AM.getAsset("./img/ufo_beam.png")));



    console.log("All Done!");
});