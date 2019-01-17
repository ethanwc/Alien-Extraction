var AM = new AssetManager();

var drawscale = 1/2;

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
                 this.frameWidth,
                 this.frameHeight);
    // this.frameWidth * this.scale,
    // this.frameHeight * this.scale);
};

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
};

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};

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

// function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {

//TILE
function Tile(game, spritesheet) {
    this.animation = new Animation(spritesheet, 546, 546, 1, 1, 1, true, 1);
    this.speed = 400;
    this.ctx = game.ctx;
    //250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 250);
}

Tile.prototype = new Entity();
Tile.prototype.constructor = Tile;

Tile.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    // if (this.x > 1000) this.x = -230;
    Entity.prototype.update.call(this);
};

Tile.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};





//UFO_Beam
function Ufo_beam(game, spritesheet) {
    // function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    // this.animation = new Animation(spritesheet, 56, 39, 1, .2, 2, true, 3);
    this.animation = new Animation(spritesheet, 56, 56, 6, .2, 6, true, 3);

    this.speed = 400;
    this.ctx = game.ctx;
    //250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 330);
}

Ufo_beam.prototype = new Entity();
Ufo_beam.prototype.constructor = Ufo_beam;

Ufo_beam.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    // if (this.x >1000) this.x = -230;
    Entity.prototype.update.call(this);
};

Ufo_beam.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

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
};

Magnet.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

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
};

Blackhole.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};


// UFO
function Ufo(game, spritesheet) {
    this.animation = new Animation(spritesheet, 56, 39, 6, .02, 12, true, 1);
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

    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
            // if (ent instanceof Tile) {
                if (this.collideBottom(ent) && this.collideLeft(ent) && this.collideRight(ent)) {
                    this.collide();
                    ent.x = -100;
                    ent.y = -100;
                    // ent.removeFromWorld = true;
                }
        }
    };

    Ufo.prototype.draw = function () {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        Entity.prototype.draw.call(this);
    };
    Ufo.prototype.collide = function() {
        // this.y = 0;
        // this.x = 0;
        // b.y = 350;
        // alert('collision detected');
    };


    //doesnt account for the ufo scale size

Ufo.prototype.collideBottom = function(other) {
    if (other instanceof Tile) {
         return (((this.y + this.animation.frameHeight) > other.y) &&
        ((this.y + this.animation.frameHeight) < (other.y + other.animation.frameHeight)));
    }
    else return false;
};

Ufo.prototype.collideTop = function(other) {
    if (other instanceof Tile) {
        return ((this.y > other.y) &&
            (this.y < (other.y + other.animation.frameHeight)));
    }

    else return false;
};

Ufo.prototype.collideLeft = function(other) {
    if (other instanceof Tile) {
        return ((this.x > other.x) &&
            (this.x < (other.x + other.animation.frameWidth)));
    }

    else return false;
};

Ufo.prototype.collideRight = function(other) {
    if (other instanceof Tile) {
        return (((this.x + this.animation.frameWidth) > other.x) &&
            ((this.x + this.animation.frameWidth) < (other.x + other.animation.frameWidth)));
    }

    else return false;
};




AM.queueDownload("./img/magnet.png");
AM.queueDownload("./img/sky.jpg");
AM.queueDownload("./img/sky_2.png");
AM.queueDownload("./img/sky_3.png");
AM.queueDownload("./img/stars.jpg");
AM.queueDownload("./img/blackhole.png");
AM.queueDownload("./img/ufo2.png");
AM.queueDownload("./img/ufo_beam.png");
AM.queueDownload("./img/grass.jpg");
AM.queueDownload("./img/dirt.png");
AM.queueDownload("./img/stone.png");
AM.queueDownload("./img/stone_ore.png");
AM.queueDownload("./img/stone_black.jpg");
AM.queueDownload("./img/gold_ore.png");
AM.queueDownload("./img/ore_crystal_blue.png");
AM.queueDownload("./img/ore_crystal_large.png");




AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    // canvas.addEventListener("click", myFunction);
    // canvas.addEventListener("click", getClickPosition, false);



//start game engine

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();



    canvas.addEventListener("click", drawBeam);



function drawBeam(event) {

    var x = event.clientX;
    var y = event.clientY;

    // var my_gradient = ctx.createLinearGradient(y, -x, -y, x);

    //draw from Ufo's position

    // a is x origin
    // b is y origin
    var a = Ufo.x;
    var b = Ufo.y;

    var my_gradient = ctx.createLinearGradient(-(y-b)+b, x, y, -(x-a)+a);


    my_gradient.addColorStop(0, "#00e600");
    my_gradient.addColorStop(.4, "#66ff66");
    my_gradient.addColorStop(.5, "#b3ffb3");
    my_gradient.addColorStop(.6, "#66ff66");
    my_gradient.addColorStop(1, "#00e600");

    my_gradient.stroke = "butt";
    ctx.fillStyle = my_gradient;


    ctx.beginPath();
    ctx.moveTo(a,b);
    ctx.lineTo(x,y);
    ctx.lineCap = "round";
    ctx.lineWidth = 60;
    ctx.strokeStyle = my_gradient;
    ctx.stroke();
    // var b = 500;

    // ctx.fillRect(b,b,x-b,y-b);
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#008000";

    // fxCtx.shadowBlur = 10;
    // fxCtx.shadowColor = '#FD0100';

}
//mousemove






//     // gameEngine.addEntity(new Magnet(gameEngine, AM.getAsset("./img/magnet.png")));
//     // gameEngine.addEntity(new Blackhole(gameEngine, AM.getAsset("./img/blackhole.png")));
//     gameEngine.addEntity(new Ufo(gameEngine, AM.getAsset("./img/ufo.png")));

    var b = new Ufo_beam(gameEngine, AM.getAsset("./img/ufo_beam.png"));
    var u = new Ufo(gameEngine, AM.getAsset("./img/ufo2.png"));
    // var n1 = new Tile(gameEngine, AM.getAsset("./img/grass.jpg"));

    var worldWidth = 60;
    var worldHeight = 100;


    //Generate World
    //TODO: Randomize spawning for 'ground' layers.

    var x, y;

    for (x = 0; x < worldWidth; x++) {
        for (y = 0; y < worldHeight; y++) {
            if (y > 3) {
                var t = new Tile(gameEngine, AM.getAsset("./img/stars.jpg"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * drawscale) * x;
                t.y = (t.animation.frameHeight * drawscale) * y;
                gameEngine.addEntity(t);
            }
            // else if (y < 10) {
            //     var t = new Tile(gameEngine, AM.getAsset("./img/sky_3.png"));
            //     t.speed = 0;
            //     t.x = (t.animation.frameWidth * scale) * x;
            //     t.y = (t.animation.frameHeight * scale) * y;
            //     gameEngine.addEntity(t);
            // }
            // else if (y < 15) {
            //     var t = new Tile(gameEngine, AM.getAsset("./img/sky_2.png"));
            //     t.speed = 0;
            //     t.x = (t.animation.frameWidth * scale) * x;
            //     t.y = (t.animation.frameHeight * scale) * y;
            //     gameEngine.addEntity(t);
            // }
            // else if (y < 20) {
            //     var t = new Tile(gameEngine, AM.getAsset("./img/sky.jpg"));
            //     t.speed = 0;
            //     t.x = (t.animation.frameWidth * scale) * x;
            //     t.y = (t.animation.frameHeight * scale) * y;
            //     gameEngine.addEntity(t);
            // }
            // else if (y === 20) {
            //     var t = new Tile(gameEngine, AM.getAsset("./img/grass.jpg"));
            //     t.speed = 0;
            //     t.x = (t.animation.frameWidth * scale) * x;
            //     t.y = (t.animation.frameHeight * scale) * y;
            //     gameEngine.addEntity(t);
            // }
            // else if (y < 30) {
            //     var t = new Tile(gameEngine, AM.getAsset("./img/dirt.png"));
            //     t.speed = 0;
            //     t.x = (t.animation.frameWidth * scale) * x;
            //     t.y = (t.animation.frameHeight * scale) * y;
            //     gameEngine.addEntity(t);
            // }
            // else if (y < 35) {
            //     var t;
            //
            //     t = new Tile(gameEngine, AM.getAsset("./img/stone_black.jpg"));
            //     t.speed = 0;
            //     t.x = (t.animation.frameWidth * scale) * x;
            //     t.y = (t.animation.frameHeight * scale) * y;
            //     gameEngine.addEntity(t);
            // }
            //
            // else if (y < 45) {
            //     var t = new Tile(gameEngine, AM.getAsset("./img/stone.png"));
            //     t.speed = 0;
            //     t.x = (t.animation.frameWidth * scale) * x;
            //     t.y = (t.animation.frameHeight * scale) * y;
            //     gameEngine.addEntity(t);
            // }
            //
            // else if (y < 80) {
            //     var t;
            //
            //     var r = ((Math.random() * 100) + 1);
            //
            //     if (r < 94) {
            //         t = new Tile(gameEngine, AM.getAsset("./img/stone.png"));
            //     }
            //     else if (r < 97) {
            //         t = new Tile(gameEngine, AM.getAsset("./img/stone_ore.png"));
            //     }
            //     else {
            //         t = new Tile(gameEngine, AM.getAsset("./img/gold_ore.png"));
            //     }
            //
            //     t.speed = 0;
            //     t.x = (t.animation.frameWidth * scale) * x;
            //     t.y = (t.animation.frameHeight * scale) * y;
            //     gameEngine.addEntity(t);
            // }
            //
            // else if (y < 100) {
            //     var t;
            //
            //     var r = ((Math.random() * 100) + 1);
            //
            //     if (r < 94) {
            //         t = new Tile(gameEngine, AM.getAsset("./img/stone.png"));
            //     }
            //     else if (r < 96) {
            //         t = new Tile(gameEngine, AM.getAsset("./img/stone_ore.png"));
            //     }
            //     else if (r < 98) {
            //         t = new Tile(gameEngine, AM.getAsset("./img/gold_ore.png"));
            //     }
            //
            //     else if (r < 99) {
            //         t = new Tile(gameEngine, AM.getAsset("./img/ore_crystal_blue.png"));
            //     }
            //
            //     else {
            //         t = new Tile(gameEngine, AM.getAsset("./img/ore_crystal_large.png"));
            //     }
            //
            //     t.speed = 0;
            //     t.x = (t.animation.frameWidth * scale) * x;
            //     t.y = (t.animation.frameHeight * scale) * y;
            //     gameEngine.addEntity(t);
            // }
        }
    }

    gameEngine.addEntity(u);
    gameEngine.addEntity(b);


    u.speed = 0;
    b.speed = 0;


    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                //LEFT
                // Ufo.speed = 400;
                u.x -= 20;
                b.x -= 20;

                break;
            case 38:
                //UP
                u.y-=20;
                b.y-=20;

                break;
            case 39:
                //RIGHT
                // Ufo.speed = 400;
                u.x += 20;
                b.x+=20;
                break;
            case 40:
                u.y += 10;
                b.y+=10;
                //DOWN
                break;
        }
    };

    console.log("All Done!");
});


