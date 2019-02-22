let tilesize = 100;
function genworld (gameEngine, worldWidth, worldHeight, tiles) {
    for (let w = 0; w < worldWidth; w++) {
        for (let h = 0; h < worldHeight; h++) {
            if (h < 10) {
                tiles.push(new Sky(gameEngine, AM.getAsset("./assets/img/stars.jpg"), w * tilesize, h * tilesize, false));
            }
            else if (h === 10) {
                let t = new Grass(gameEngine, AM.getAsset("./assets/img/grass.png"), w * tilesize, h * tilesize, true);
                if ((w > 4 && w < 19) || (w > 27 && w < 34)) t.health = 10000000;
                tiles.push(t);

            }

            else if (h < 15) {
                let r = ((Math.random() * tilesize) + 1);
                if (r < 90) randomDirt(w*tilesize, h*tilesize, tiles);
                else tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_ore.png"), w * tilesize, h * tilesize, true));
            }

            else if (h < 25) {
                let r = ((Math.random() * tilesize) + 1);
                if (r < 60) randomDirt(w*tilesize, h*tilesize, tiles);
                else if (r < 90) randomStone(w*tilesize, h*tilesize, tiles)
                else if (r < 96) tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_ore.png"), w * tilesize, h * tilesize, true));
                else tiles.push(new Copper(gameEngine, AM.getAsset("./assets/img/tile_copper.png"), w * tilesize, h * tilesize, true));
            }

            else if (h < 35) {
                let r = ((Math.random() * tilesize) + 1);
                if (r < 40) randomDirt(w*tilesize, h*tilesize, tiles);
                else if (r < 85) randomStone(w*tilesize, h*tilesize, tiles)
                else if (r < 95) tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_ore.png"), w * tilesize, h * tilesize, true));
                else tiles.push(new Copper(gameEngine, AM.getAsset("./assets/img/tile_copper.png"), w * tilesize, h * tilesize, true));
            }

            else if (h < 40) {
                let r = ((Math.random() * tilesize) + 1);
                if (r < 10) randomDirt(w*tilesize, h*tilesize, tiles);
                else if (r < 65) randomStone(w*tilesize, h*tilesize, tiles);
                else if (r < 85) tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_ore.png"), w * tilesize, h * tilesize, true));
                else if (r < 95) tiles.push(new Copper(gameEngine, AM.getAsset("./assets/img/tile_copper.png"), w * tilesize, h * tilesize, true));
                else tiles.push(new Gold(gameEngine, AM.getAsset("./assets/img/gold_ore.png"), w * tilesize, h * tilesize, true));

            }

            else if (h < 50) {
                let r = ((Math.random() * tilesize) + 1);
                if (r < 65) randomStone(w*tilesize, h*tilesize, tiles);
                else if (r < 80) tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_ore.png"), w * tilesize, h * tilesize, true));
                else if (r < 95) tiles.push(new Copper(gameEngine, AM.getAsset("./assets/img/tile_copper.png"), w * tilesize, h * tilesize, true));
                else tiles.push(new Gold(gameEngine, AM.getAsset("./assets/img/gold_ore.png"), w * tilesize, h * tilesize, true));
            }

            else if (h < 60) {
                let r = ((Math.random() * tilesize) + 1);
                if (r < 65) randomStone(w*tilesize, h*tilesize, tiles);
                else if (r < 80) tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_ore.png"), w * tilesize, h * tilesize, true));
                else if (r < 95) tiles.push(new Copper(gameEngine, AM.getAsset("./assets/img/tile_copper.png"), w * tilesize, h * tilesize, true));
                else if (r < 96) tiles.push(new Gold(gameEngine, AM.getAsset("./assets/img/gold_ore.png"), w * tilesize, h * tilesize, true));
                else if (r < 98) tiles.push(new GlassCrystal(gameEngine, AM.getAsset("./assets/img/tile_crystal2.png"), w * tilesize, h * tilesize, true));
                else tiles.push(new Crytsal(gameEngine, AM.getAsset("./assets/img/ore_crystal_large.png"), w * tilesize, h * tilesize, true));

            }

            else if (h < 80) {
                let r = ((Math.random() * tilesize) + 1);
                if (r < 60) randomStone(w*tilesize, h*tilesize, tiles);
                else if (r < 75) tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_ore.png"), w * tilesize, h * tilesize, true));
                else if (r < 85) tiles.push(new Copper(gameEngine, AM.getAsset("./assets/img/tile_copper.png"), w * tilesize, h * tilesize, true));
                else if (r < 90) tiles.push(new Gold(gameEngine, AM.getAsset("./assets/img/gold_ore.png"), w * tilesize, h * tilesize, true));
                else if (r < 95) tiles.push(new GlassCrystal(gameEngine, AM.getAsset("./assets/img/tile_crystal2.png"), w * tilesize, h * tilesize, true));
                else tiles.push(new Crytsal(gameEngine, AM.getAsset("./assets/img/ore_crystal_large.png"), w * tilesize, h * tilesize, true));
            }

            else {
                let r = ((Math.random() * tilesize) + 1);
                if (r < 50) randomStone(w*tilesize, h*tilesize, tiles);
                else if (r < 60) tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_ore.png"), w * tilesize, h * tilesize, true));
                else if (r < 70) tiles.push(new Copper(gameEngine, AM.getAsset("./assets/img/tile_copper.png"), w * tilesize, h * tilesize, true));
                else if (r < 80) tiles.push(new Gold(gameEngine, AM.getAsset("./assets/img/gold_ore.png"), w * tilesize, h * tilesize, true));
                else if (r < 90) tiles.push(new GlassCrystal(gameEngine, AM.getAsset("./assets/img/tile_crystal2.png"), w * tilesize, h * tilesize, true));
                else tiles.push(new Crytsal(gameEngine, AM.getAsset("./assets/img/ore_crystal_large.png"), w * tilesize, h * tilesize, true));
            }
        }
    }
}


function randomDirt(x,y, tiles) {
    let r = ((Math.random() * tilesize) + 1);
    let img;
    if (r < 25) img = "./assets/img/dirt.png";
    else if (r < 50) img = "./assets/img/tile_dirt_cracked.jpg";
    else if (r < 75) img = "./assets/img/tile_dirt_plain.jpg";
    else img = "./assets/img/tile_dirt_mud.jpg";
    tiles.push(new Stone(gameEngine, AM.getAsset(img), x,y, true));
}

function randomStone(x,y, tiles) {
    let r = ((Math.random() * tilesize) + 1);
    let img;
    if (r < 25) img = "./assets/img/tile_stone_cracked.jpg";
    else if (r < 50) img = "./assets/img/stone.png";
    else if (r < 75) img = "./assets/img/tile_dirt_mud.jpg";
    else img = "./assets/img/stone_black.jpg";
    tiles.push(new Stone(gameEngine, AM.getAsset(img), x,y, true));
}