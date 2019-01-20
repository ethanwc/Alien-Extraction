var AM = new AssetManager();

var scale = 1/8;
var ufoscale = 3;
var u;
var mousex = 0, mousey = 0;
var gameEngine;

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

};

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
    // this.ctx.fillRect(a,b,x,y);
    this.ctx.stroke();

    // this.ctx.shadowBlur = 10;
    // this.ctx.shadowColor = "#008000";

    var currentTime = gameEngine.timer.gameTime;

    if ((currentTime - this.initTime) > this.viewTime) {
        this.removeFromWorld = true;
    }
};

//TILE
function Tile(game, spritesheet) {
    this.animation = new Animation(spritesheet, 546, 546, 1, 1, 1, true, scale);
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


//Blackhole
function Blackhole(game, spritesheet) {
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
    this.animation = new Animation(spritesheet, 56, 39, 6, .02, 12, true, ufoscale);
    this.horizontalVelocity = 200;
    this.verticalVelocity = 200;
    this.verticalAcceleration = 0;
    this.horizontalAcceleration = 0;
    this.maxAcceleration = 200;
    this.maxVelocity = 600;
    this.ctx = game.ctx;
    this.x = 200;
    this.y = 200;
    Entity.call(this, game, 0, 250);
}

Ufo.prototype = new Entity();
Ufo.prototype.constructor = Ufo;

Ufo.prototype.update = function () {

    this.horizontalVelocity += this.game.clockTick * this.horizontalAcceleration;
    this.verticalVelocity += this.game.clockTick * this.verticalAcceleration;

    this.x += this.game.clockTick * this.horizontalVelocity;
    this.y += this.game.clockTick * this.verticalVelocity;

    //check if max accel or velocity exceeded


    if (Math.abs(this.verticalAcceleration) > this.maxAcceleration) {
        if (this.verticalAcceleration > 0) this.verticalAcceleration = this.maxAcceleration;
        else this.verticalAcceleration = -this.maxAcceleration;
    }

    if (Math.abs(this.horizontalAcceleration) > this.maxAcceleration) {
        if (this.horizontalAcceleration > 0) this.horizontalAcceleration = this.maxAcceleration;
        else this.horizontalAcceleration = -this.maxAcceleration;

    if (Math.abs(this.horizontalVelocity) > this.maxVelocity) {
        if (this.horizontalVelocity >0) this.horizontalVelocity = this.maxVelocity;
        else this.horizontalVelocity = -this.maxVelocity;
    }

    if (Math.abs(this.verticalVelocity) > this.maxVelocity) {
        if (this.verticalVelocity > 0) this.verticalVelocity = this.maxVelocity;
        else this.verticalVelocity = -this.maxVelocity;
    }

    //temp bounds fix
    if (this.x > 4000) this.x = -230;
    if (this. x < -230) this.x = 4000;
    if (this.y > 4000) this.y = -230;
    if (this. y < -230) this.y = 4000;
    Entity.prototype.update.call(this);

    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];

        //what the fuck is this
        if (ent instanceof Tile) {
            var l = this.collideLeft(ent), r = this.collideRight(ent), t = this.collideTop(ent),
                b = this.collideBottom(ent), e = this.collideEncompass(ent);

            if ((b && (r || l)) || (t && (r || l)) || (e && (t || b)) || (e && (l || r))) {
                this.collide(ent);
            }
        }
    }
};

Ufo.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};
Ufo.prototype.collide = function(entity) {
    entity.removeFromWorld = true;
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
}



AM.queueDownload("./img/magnet.png");
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

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");


    gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    canvas.addEventListener("click", updateCoords);

    function updateCoords(event) {
        mousex = event.clientX;
        mousey = event.clientY;
        gameEngine.addEntity(new Laser(gameEngine));
    }

    u = new Ufo(gameEngine, AM.getAsset("./img/ship2.png"));
    gameEngine.addEntity(u);
    var z = new Laser(gameEngine);
    gameEngine.addEntity(z);

    var worldWidth = 60;
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
                gameEngine.addEntity(t);
            }
            else if (y < 10) {
                var t = new Tile(gameEngine, AM.getAsset("./img/sky_3.png"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                gameEngine.addEntity(t);
            }
            else if (y < 15) {
                var t = new Tile(gameEngine, AM.getAsset("./img/sky_2.png"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
                gameEngine.addEntity(t);
            }
            else if (y < 20) {
                var t = new Tile(gameEngine, AM.getAsset("./img/sky.jpg"));
                t.speed = 0;
                t.x = (t.animation.frameWidth * scale) * x;
                t.y = (t.animation.frameHeight * scale) * y;
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

            else if (y < 100) {
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

    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                //LEFT
                // Ufo.speed = 400;
                // u.x -= 20;
                // b.x -= 20;
                u.horizontalAcceleration-=50;

                break;
            case 38:
                //UP
                // u.y-=20;
                // b.y-=20;
                u.verticalAcceleration -=50;

                break;
            case 39:
                //RIGHT
                // Ufo.speed = 400;
                // u.x += 20;
                // b.x+=20;
                u.horizontalAcceleration +=50;
                console.log('start right accel');
                break;
            case 40:
                // u.y += 10;
                // b.y+=10;
                u.verticalAcceleration +=50;
                //DOWN
                break;
        }
    };
    document.onkeyup = function(e) {
        switch (e.keyCode) {
            case 37:
                //LEFT
                // Ufo.speed = 400;
                // u.x -= 20;
                // b.x -= 20;
                u.horizontalAcceleration=0;

                break;
            case 38:
                //UP
                // u.y-=20;
                // b.y-=20;
                u.verticalAcceleration = 0;

                break;
            case 39:
                //RIGHT
                // Ufo.speed = 400;
                // u.x += 20;
                // b.x+=20;
                u.horizontalAcceleration =0;
                console.log('stop right accel');

                break;
            case 40:
                // u.y += 10;
                // b.y+=10;
                u.verticalAcceleration =0;
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

