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

// function Background(game, spritesheet) {
//     this.x = 0;
//     this.y = 0;
//     this.spritesheet = spritesheet;
//     this.game = game;
//     this.ctx = game.ctx;
// };

// Background.prototype.draw = function () {
//     this.ctx.drawImage(this.spritesheet,
//                    this.x, this.y);
// };

// Background.prototype.update = function () {

// };

// UFO
function Ufo(game, spritesheet) {
    this.animation = new Animation(spritesheet, 56, 39, 6, .02, 12, true, 3);
    this.speed = 400;
    this.ctx = game.ctx;
    //250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 250);
}

Ufo.prototype = new Entity();
Ufo.prototype.constructor = Ufo;

Ufo.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 1000) this.x = -230;
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

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    // canvas.addEventListener("click", myFunction);
    // canvas.addEventListener("click", getClickPosition, false);



    var gameEngine = new GameEngine();
    gameEngine.init(ctx);

    var u = new Ufo(gameEngine, AM.getAsset("./img/ufo.png"));

    gameEngine.addEntity(u);

    gameEngine.start();

    Ufo.prototype.x = 200;

    // canvas.addEventListener("mousemove", updateDisplay, false);

// function printMousePos(event) {

//     var x = event.clientX;
//     var y = event.clientY;
//        // var my_gradient = ctx.createLinearGradient(y, -x, -y, x);


//            var a = 222;

//               var my_gradient = ctx.createLinearGradient(-(y-a)+a, x, y, -(x-a)+a);


//     // var my_gradient = ctx.createLinearGradient(400, 0, 0, 400);
//     my_gradient.addColorStop(0, "#00e600");
//     my_gradient.addColorStop(.4, "#66ff66");
//     my_gradient.addColorStop(.5, "#b3ffb3");
//     my_gradient.addColorStop(.6, "#66ff66");
//     my_gradient.addColorStop(1, "#00e600");

//     my_gradient.stroke = "butt";
//     ctx.fillStyle = my_gradient;


//     ctx.beginPath();
//     ctx.moveTo(a,a);
//     ctx.lineTo(x,y);
//     ctx.lineCap = "round";
//     ctx.lineWidth = 60;
//     ctx.strokeStyle = my_gradient;
//     ctx.stroke();
//     // var b = 500;

//     // ctx.fillRect(b,b,x-b,y-b);
//     ctx.shadowBlur = 10;
//     ctx.shadowColor = "#008000";

//     // fxCtx.shadowBlur = 10;
//     // fxCtx.shadowColor = '#FD0100';

// }
// //mousemove
// canvas.addEventListener("mousemove", printMousePos);
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
        //LEFT
       Ufo.speed = 0;
            break;
        case 38:
        //UP
            break;
        case 39:
        //RIGHT
        Ufo.speed = 400;
            break;
        case 40:
        //DOWN
            break;
    }
};






//     // gameEngine.addEntity(new Magnet(gameEngine, AM.getAsset("./img/magnet.png")));
//     // gameEngine.addEntity(new Blackhole(gameEngine, AM.getAsset("./img/blackhole.png")));
//     // gameEngine.addEntity(new Ufo(gameEngine, AM.getAsset("./img/ufo.png")));
//     // gameEngine.addEntity(new Ufo_beam(gameEngine, AM.getAsset("./img/ufo_beam.png")));





//     console.log("All Done!");
});

