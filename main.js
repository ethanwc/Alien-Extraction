//https://medium.com/techtrument/multithreading-javascript-46156179cf9a
//one thread for just collision detection?

//TODO:
/*
MUTLTITHREADING COLLISION DETECTION???

TODO REMOVE SPEED FROM UFO, PUT ON CAMERA
FUEL STATION
UPGRADE STATION
CAMERA
RENDERING ORDER
INFO DISPLAY (IN CAMERA)
RESOURCES FROM TEXTURES
FUEL MODEL. ECONOMY MODEL.
UFO PHYSICS spin faster bsaed on speed, reverse spin
ufo landing animation?
pause game while in upgrade menu
upgrade menu
scoring system
determine distance of each colloding entity for order of destruction, use x,y plus 1/2 w 1/2 h * scale
 */
var AM = new AssetManager();

var scale = 1/3;
var ufoscale = 3;
var u;
var mousex = 0, mousey = 0;
var gameEngine;
var ufobeam;
var screenwidth = screenwidth;

var w,h;

var cam;
// console.log(screenwidth);

var blackhole;

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
        xindex * this.frameWidth, yindex * this.frameHeight,
        this.frameWidth, this.frameHeight,
        x, y, this.frameWidth * this.scale, this.frameHeight * this.scale);
};

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
};

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};

function Laser(game) {
    // this.animation = new Animation(spritesheet, 546, 546, 1, 1, 1, true, scale);
    this.speed = 0;
    this.viewTime = .1;
    this.initTime = gameEngine.timer.gameTime;
    this.ctx = game.ctx;
//250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 0);
}

Laser.prototype = new Entity();
Laser.prototype.constructor = Laser;

Laser.prototype.update = function () {
    Entity.prototype.update.call(this);

    //Detect Laser collision with tiles
    //Reference: http://www.jeffreythompson.org/collision-detection/line-rect.php
    var uu;
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];

        if (ent instanceof Tile) {


            var x1 = u.x + 28 * ufoscale, y1 = u.y + 37 * ufoscale;
            var x2 = mousex, y2 = mousey;

            var rx = ent.x;
            var ry = ent.y;

            var rw = ent.animation.frameWidth * scale;
            var rh = ent.animation.frameHeight * scale;

            var left =   lineLine(x1,y1,x2,y2, rx,ry,rx, ry+rh);
            var right =  lineLine(x1,y1,x2,y2, rx+rw,ry, rx+rw,ry+rh);
            var top =    lineLine(x1,y1,x2,y2, rx,ry, rx+rw,ry);
            var bottom = lineLine(x1,y1,x2,y2, rx,ry+rh, rx+rw,ry+rh);

            //TODO: use tile coords and w/h to draw particle effect

            if (left || right || top || bottom) {
                if (!(ent.type === "stars" || ent.type === "sky" || ent.type === "sky2" || ent.type === "sky3")) {
                    // var explosion = new Explosion(gameEngine, AM.getAsset("./img/boom.png"));
                    var explosion = new Explosion(gameEngine, AM.getAsset("./img/smoke.png"));
                    explosion.x = ent.x;
                    explosion.y = ent.y;

                    gameEngine.addEntity(explosion);

                    ent.removeFromWorld = true;
                }

            }

        }



    }


};


// LINE/LINE
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

    // calculate the direction of the lines
    var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {




        // optionally, draw a circle where the lines meet
        // var intersectionX = x1 + (uA * (x2-x1));
        // var intersectionY = y1 + (uA * (y2-y1));
        // fill(255,0,0);
        // noStroke();
        // ellipse(intersectionX, intersectionY, 20, 20);

        return true;
    }
    return false;
}

Laser.prototype.draw = function (event) {
    Entity.prototype.draw.call(this);

    var a = u.x + 28 * ufoscale, b = u.y + 37 * ufoscale;
    var x = mousex, y = mousey;

    //x:28,y:33

    var my_gradient = this.ctx.createLinearGradient(-(y - b) + b, x, y, -(x - a) + a);


    my_gradient.addColorStop(0, "#ffffff");
    // my_gradient.addColorStop(.4, "#66ff66");
    my_gradient.addColorStop(.5, "#66ff66");
    // my_gradient.addColorStop(.6, "#66ff66");
    my_gradient.addColorStop(1, "#ffffff");

    // my_gradient.stroke = "butt";
    this.ctx.fillStyle = my_gradient;


    this.ctx.beginPath();
    this.ctx.moveTo(a, b);
    this.ctx.lineTo(x, y);
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = 60;
    this.ctx.strokeStyle = my_gradient;

    this.ctx.stroke();

    // this.ctx.shadowBlur = 10;
    // this.ctx.shadowColor = "#008000";

    var currentTime = gameEngine.timer.gameTime;

    if ((currentTime - this.initTime) > this.viewTime) {
        this.removeFromWorld = true;
    }
};

//HEALTH
function Heart(game, spritesheet) {
    // function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {

    this.animation = new Animation(spritesheet, 350, 306, 6, .05, 11, true, .25);

    this.speed = 0;
    this.ctx = game.ctx;
    this.x = 0;
    this.y = 100;

    // this.x = 200;
    // this.y = 200;
    // this.x = 200;
    // this.y = 200;
//250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 250);
}

Heart.prototype = new Entity();
Heart.prototype.constructor = Heart;

Heart.prototype.update = function () {
    // this.x += this.game.clockTick * this.speed;
    // if (this.x > 1000) this.x = -230;
    Entity.prototype.update.call(this);
};

Heart.prototype.draw = function (x,y) {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};


//EXPLOSION
function Explosion(game, spritesheet) {
    // function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {

    // this.animation = new Animation(spritesheet, 56, 56, 6, .2, 6, true, 3);
    //explosion
    // this.animation = new Animation(spritesheet, 256, 256, 8, .05, 32, false, 1);

    //cloud
    this.animation = new Animation(spritesheet, 230, 161, 3, .05, 18, false, 1);

    this.speed = 0;
    this.ctx = game.ctx;
    this.x = 0;
    this.y = 0;

    // this.x = 200;
    // this.y = 200;
    // this.x = 200;
    // this.y = 200;
//250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 250);
}

Explosion.prototype = new Entity();
Explosion.prototype.constructor = Explosion;

Explosion.prototype.update = function () {
    // this.x += this.game.clockTick * this.speed;
    // if (this.x > 1000) this.x = -230;

    this.y = (this.y-cam.y);

    Entity.prototype.update.call(this);
};

Explosion.prototype.draw = function (x,y) {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};


//Blast
function Blast(game, spritesheet) {
    // function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {

    this.animation = new Animation(spritesheet, 315, 300, 4, .05, 12, false, 3);
    this.initTime = gameEngine.timer.gameTime;
    this.viewTime = .3;
    this.speed = 0;
    this.ctx = game.ctx;
    this.x = 0;
    this.y = 0;

    // this.x = 200;
    // this.y = 200;
    // this.x = 200;
    // this.y = 200;
//250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 250);
}

Blast.prototype = new Entity();
Blast.prototype.constructor = Blast;

Blast.prototype.update = function () {
    // this.x += this.game.clockTick * this.speed;
    // if (this.x > 1000) this.x = -230;



    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];

        if (ent instanceof Tile) {
            if (!(ent.type === "stars" || ent.type === "sky" || ent.type === "sky2" || ent.type === "sky3")) {


                var circle = {x: (u.x), y: (u.y), r: 700};
                var rect = {
                    x: ent.x,
                    y: ent.y,
                    w: (ent.animation.frameWidth * scale),
                    h: (ent.animation.frameHeight * scale)
                };
                if (RectCircleColliding(circle, rect)) {
                    var explosion = new Explosion(gameEngine, AM.getAsset("./img/smoke.png"));
                    explosion.x = ent.x;
                    explosion.y = ent.y;

                    gameEngine.addEntity(explosion);

                    ent.removeFromWorld = true;
                }
            }
        }
    }

    var currentTime = gameEngine.timer.gameTime;

    if ((currentTime - this.initTime) > this.viewTime) {
        this.removeFromWorld = true;
    }

    Entity.prototype.update.call(this);
};

Blast.prototype.draw = function (x,y) {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};


Blast.prototype.collide = function(entity) {
    // entity.removeFromWorld = true;
    // alert('collision detected');
};





//UFO_Beam
function Ufo_beam(game, spritesheet) {
    // function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    // this.animation = new Animation(spritesheet, 56, 39, 1, .2, 2, true, 3);
    this.animation = new Animation(spritesheet, 56, 56, 6, .2, 2, true, 3);
    this.speed = 0;
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


//Blackhole
function Blackhole(game, spritesheet) {
    this.animation = new Animation(spritesheet, 512, 512, 6, .1, 36, true, .25);
    // this.speed = 350;
    this.ctx = game.ctx;
    //250 is height that it is displayed at (y)
    Entity.call(this, game, 0, 170);
}

Blackhole.prototype = new Entity();
Blackhole.prototype.constructor = Blackhole;

Blackhole.prototype.update = function () {
    // this.x += this.game.clockTick * this.speed;
    // if (this.x >1000) this.x = -230;
    Entity.prototype.update.call(this);
};

Blackhole.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};


// UFO
function Ufo(game, spritesheet) {
    this.animation = new Animation(spritesheet, 56, 39, 6, .02, 11, true, ufoscale);
    this.ctx = game.ctx;
    this.x = 200;
    this.y = 200;
    Entity.call(this, game, 0, 250);
}

Ufo.prototype = new Entity();
Ufo.prototype.constructor = Ufo;

Ufo.prototype.update = function () {




    //temp bounds fix
    // if (this.x > 4000) this.x = -230;
    // if (this. x < -230) this.x = 4000;
    // if (this.y > 4000) this.y = -230;
    // if (this. y < -230) this.y = 4000;
    Entity.prototype.update.call(this);
    //b


    // u.horizontalAcceleration = 0;
    // u.verticalAcceleration = 0;


    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];

        //what the fuck is this
        if (ent instanceof Tile) {
            var l = this.collideLeft(ent), r = this.collideRight(ent), t = this.collideTop(ent),
                b = this.collideBottom(ent), e = this.collideEncompass(ent);
            // if (l || r || b || t) {

            if ((b && (r || l)) || (t && (r || l)) || (e && (t || b)) || (e && (l || r))) {
                this.collide();
                // ent.x = -100;
                // ent.y = -100;
                if (!(ent.type === "stars" || ent.type === "sky" || ent.type === "sky2" || ent.type === "sky3")) {
                    // ent.removeFromWorld = true;

                }

            }
        }
    }
};

Ufo.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};
Ufo.prototype.collide = function(entity) {
    // entity.removeFromWorld = true;
    // alert('collision detected');
};



Ufo.prototype.collideBottom = function(other) {
    if (other instanceof Tile) {
        return (((this.y + (this.animation.frameHeight * ufoscale)) > other.y) &&
            ((this.y + (this.animation.frameHeight * ufoscale)) < (other.y + (other.animation.frameHeight * scale))));
    }
    else return false;
};

Ufo.prototype.collideTop = function(other) {
    if (other instanceof Tile) {
        return ((this.y > other.y) &&
            (this.y < (other.y + (other.animation.frameHeight * scale))));
    }

    else return false;
};

Ufo.prototype.collideLeft = function(other) {
    if (other instanceof Tile) {
        return ((this.x > other.x) &&
            (this.x < (other.x + (other.animation.frameWidth * scale))));
    }

    else return false;
};

Ufo.prototype.collideRight = function(other) {
    if (other instanceof Tile) {

        return (((this.x + (this.animation.frameWidth * ufoscale)) > other.x) &&
            ((this.x + (this.animation.frameWidth * ufoscale)) < (other.x + (other.animation.frameWidth * scale))));
    }

    else return false;
};
Ufo.prototype.collideEncompass = function(other) {
    if (other instanceof Tile) {
        return ((this.x < other.x) && ((this.x + (this.animation.frameWidth * ufoscale)) > (other.x + (other.animation.frameWidth * scale)))) ||
            ((this.y < other.y) && ((this.y + (this.animation.frameHeight * ufoscale)) > (other.y + (other.animation.frameHeight * scale))));

    }
};


//TILE
function Tile(game, spritesheet) {
    this.animation = new Animation(spritesheet, 546, 546, 1, 1, 1, true, scale);
    this.speed = 400;
    this.ctx = game.ctx;
    this.health = 100;
    this.type = "unset";
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

// CAMERA
function Camera(game) {
    this.ctx = game.ctx;

    this.width = .5 * w;
    this.height = .7 * h;
    this.x = (w- this.width)/2;
    this.y = (h-this.height)/2;
    this.viewTime = .01;
    this.zoom = 1; //default zoom ratio

    // alert(this.x);

    document.getElementById("gameWorld").width = this.width;
    document.getElementById("gameWorld").height = this.height;

    this.horizontalVelocity = 0;
    this.verticalVelocity = 0;
    this.verticalAcceleration = 0;
    this.horizontalAcceleration = 0;
    this.maxAcceleration = 1500;
    this.maxVelocity = 1000;

    Entity.call(this, game, 0, 170);
}

Camera.prototype = new Entity();
Camera.prototype.constructor = Camera;
Camera.prototype.update = function () {


    // this.x = u.x - u.animation.frameWidth;
    // this.y = u.y;

    u.x = this.x + this.width/2;
    u.y = this.y + this.height/2;


    ufobeam.x = u.x - 4;
    ufobeam.y = u.y + 86;

    if (this.x > 16000) this.x = 0;





    this.horizontalVelocity += this.game.clockTick * this.horizontalAcceleration;
    this.verticalVelocity += this.game.clockTick * this.verticalAcceleration;

    this.x += this.game.clockTick * this.horizontalVelocity;
    this.y += this.game.clockTick * this.verticalVelocity;

    //a


    //check if max accel or velocity exceeded


    if (Math.abs(this.verticalAcceleration) > this.maxAcceleration) {
        if (this.verticalAcceleration > 0) this.verticalAcceleration = this.maxAcceleration;
        else this.verticalAcceleration = -this.maxAcceleration;
    }

    if (Math.abs(this.horizontalAcceleration) > this.maxAcceleration) {
        if (this.horizontalAcceleration > 0) this.horizontalAcceleration = this.maxAcceleration;
        else this.horizontalAcceleration = -this.maxAcceleration;
    }

    if (Math.abs(this.horizontalVelocity) > this.maxVelocity) {
        if (this.horizontalVelocity >0) this.horizontalVelocity = this.maxVelocity;
        else this.horizontalVelocity = -this.maxVelocity;
    }

    if (Math.abs(this.verticalVelocity) > this.maxVelocity) {
        if (this.verticalVelocity > 0) this.verticalVelocity = this.maxVelocity;
        else this.verticalVelocity = -this.maxVelocity;
    }


    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];

        //     ent.x = (ent.x - this.x);
        //     ent.y = (ent.y - this.y);
        // }
        // if (ent instanceof Explosion) {
        // }
        // else if (ent instanceof Blackhole) {

        // }
        // else {

            ent.x = (ent.x - this.x);
            ent.y = (ent.y - this.y);
        // }

        // ent.x = (ent.x - this.x);
        // ent.y = (ent.y - this.y);

        //
        // if (ent instanceof Tile)
        //     if (((this.x - ent.x) > 0)
        //         && ((this.y - ent.y) > 0)
        //         && ((this.x + this.width - ent.x) > 0)
        //         && ((this.y + this.height - ent.y) > 0)) {
        //         ent.x = (ent.x - this.x);
        //         ent.y = (ent.y - this.y);
        //     }
    }

};


Camera.prototype.draw = function () {
    Entity.prototype.draw.call(this);



    this.ctx.rect(this.x, this.y, this.x + this.width, this.y + this.height);

    // this.ctx.stroke();

    // this.ctx.shadowBlur = 10;
    // this.ctx.shadowColor = "#008000";
    //





    // this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    // Entity.prototype.draw.call(this);
    //
};

AM.queueDownload("./img/energyblast.png");
AM.queueDownload("./img/heart.png");

AM.queueDownload("./img/magnet.png");
AM.queueDownload("./img/smoke.png");
AM.queueDownload("./img/sky.jpg");
AM.queueDownload("./img/sky_2.png");
AM.queueDownload("./img/sky_3.png");
AM.queueDownload("./img/stars.jpg");
AM.queueDownload("./img/blackhole.png");
AM.queueDownload("./img/ship2.png");
AM.queueDownload("./img/ufo_beam.png");
AM.queueDownload("./img/grass.jpg");
AM.queueDownload("./img/dirt.png");
AM.queueDownload("./img/stone.png");
AM.queueDownload("./img/stone_ore.png");
AM.queueDownload("./img/stone_black.jpg");
AM.queueDownload("./img/gold_ore.png");
AM.queueDownload("./img/ore_crystal_blue.png");
AM.queueDownload("./img/ore_crystal_large.png");
AM.queueDownload("./sound/laser.mp3");
AM.queueDownload("./img/boom.png");


AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    document.getElementById("gameWorld").width = screen.width * .9;
    document.getElementById("gameWorld").height = screen.height * .9;
    w = screen.availWidth;
    h = screen.availHeight;
    gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    // alert(screen.width);
    // alert(w);
    //
    // alert(screen.height);
    // alert(screen.availHeight);

    canvas.addEventListener("click", updateCoords);

    function updateCoords(event) {
        mousex = event.clientX - ctx.canvas.getBoundingClientRect().left;
        mousey = event.clientY - ctx.canvas.getBoundingClientRect().top;
        // mousex = event.clientX;
        // mousey = event.clientY;
        gameEngine.addEntity(new Laser(gameEngine));
    }

    // var r = new Explosion(gameEngine, AM.getAsset("./img/boom.png"));
    // gameEngine.addEntity(r);

    u = new Ufo(gameEngine, AM.getAsset("./img/ship2.png"));
    var z = new Laser(gameEngine);

    ufobeam = new Ufo_beam(gameEngine, AM.getAsset("./img/ufo_beam.png"));


    blackhole = new Blackhole(gameEngine, AM.getAsset("./img/blackhole.png"));









    var worldWidth = 100;
    var worldHeight = 200;


    //Generate World
    var x, y;

    for (x = 0; x < worldWidth; x++) {
        for (y = 0; y < worldHeight; y++) {
            if (y < 5) {
                var t = new Tile(gameEngine, AM.getAsset("./img/stars.jpg"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                t.type = "stars";
                gameEngine.addEntity(t);
            }
            else if (y < 10) {
                var t = new Tile(gameEngine, AM.getAsset("./img/sky_3.png"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                t.type = "sky3";
                gameEngine.addEntity(t);
            }
            else if (y < 15) {
                var t = new Tile(gameEngine, AM.getAsset("./img/sky_2.png"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                t.type = "sky2";
                gameEngine.addEntity(t);
            }
            else if (y < 20) {
                var t = new Tile(gameEngine, AM.getAsset("./img/sky.jpg"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                t.type = "sky";
                gameEngine.addEntity(t);
            }
            else if (y === 20) {
                var t = new Tile(gameEngine, AM.getAsset("./img/grass.jpg"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                gameEngine.addEntity(t);
            }
            else if (y < 30) {
                var t = new Tile(gameEngine, AM.getAsset("./img/dirt.png"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                gameEngine.addEntity(t);
            }
            else if (y < 35) {
                var t;

                t = new Tile(gameEngine, AM.getAsset("./img/stone_black.jpg"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                gameEngine.addEntity(t);
            }

            else if (y < 45) {
                var t = new Tile(gameEngine, AM.getAsset("./img/stone.png"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                gameEngine.addEntity(t);
            }

            else if (y < 80) {
                var t;

                var r = ((Math.random() * 100) + 1);

                if (r < 94) {
                    t = new Tile(gameEngine, AM.getAsset("./img/stone.png"));
                }
                else if (r < 97) {
                    t = new Tile(gameEngine, AM.getAsset("./img/stone_ore.png"));
                }
                else {
                    t = new Tile(gameEngine, AM.getAsset("./img/gold_ore.png"));
                }

                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                gameEngine.addEntity(t);
            }

            else  {
                var t;

                var r = ((Math.random() * 100) + 1);

                if (r < 94) {
                    t = new Tile(gameEngine, AM.getAsset("./img/stone.png"));
                }
                else if (r < 96) {
                    t = new Tile(gameEngine, AM.getAsset("./img/stone_ore.png"));
                }
                else if (r < 98) {
                    t = new Tile(gameEngine, AM.getAsset("./img/gold_ore.png"));
                }

                else if (r < 99) {
                    t = new Tile(gameEngine, AM.getAsset("./img/ore_crystal_blue.png"));
                }

                else {
                    t = new Tile(gameEngine, AM.getAsset("./img/ore_crystal_large.png"));
                }

                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                gameEngine.addEntity(t);
            }
        }
    }

    gameEngine.addEntity(u);

    gameEngine.addEntity(z);

    gameEngine.addEntity(ufobeam);

    cam = new Camera(gameEngine);

    gameEngine.addEntity(new Heart(gameEngine, AM.getAsset("./img/heart.png")));
    // gameEngine.addEntity(blackhole);

    gameEngine.addEntity(cam);


    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 32:
                //SPACE

                var blast = new Blast(gameEngine,  AM.getAsset("./img/energyblast.png"));
                blast.x = u.x - blast.animation.frameWidth - u.animation.frameWidth;
                blast.y = u.y-blast.animation.frameHeight - u.animation.frameHeight;
                gameEngine.addEntity(blast);


                break;
            case 65:
                //LEFT
                // Ufo.speed = 400;
                // u.x -= 20;
                // b.x -= 20;
                cam.horizontalAcceleration-=50;

                break;
            case 87:
                //UP
                // u.y-=20;
                // b.y-=20;
                cam.verticalAcceleration -=50;

                break;
            case 68:
                //RIGHT
                // Ufo.speed = 400;
                // u.x += 20;
                // b.x+=20;
                cam.horizontalAcceleration +=50;
                console.log('start right accel');
                break;
            case 83:
                // u.y += 10;
                // b.y+=10;
                cam.verticalAcceleration +=50;
                //DOWN
                break;
        }
    };
    document.onkeyup = function(e) {
        switch (e.keyCode) {
            case 65:
                //LEFT
                // Ufo.speed = 400;
                // u.x -= 20;
                // b.x -= 20;
                cam.horizontalAcceleration=0;

                break;
            case 87:
                //UP
                // u.y-=20;
                // b.y-=20;
                cam.verticalAcceleration = 0;

                break;
            case 68:
                //RIGHT
                // Ufo.speed = 400;
                // u.x += 20;
                // b.x+=20;
                cam.horizontalAcceleration =0;
                console.log('stop right accel');

                break;
            case 83:
                // u.y += 10;
                // b.y+=10;
                cam.verticalAcceleration =0;
                //DOWN
                break;
        }
    };
});



function distance(a, b) {
    var difX = a.x - b.x;
    var difY = a.y - b.y;
    return Math.sqrt(difX * difX + difY * difY);
}

//https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle


// return true if the rectangle and circle are colliding
function RectCircleColliding(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; }
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}