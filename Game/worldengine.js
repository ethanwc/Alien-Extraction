let tilesize = 100;
function genworld (gameEngine, worldWidth, worldHeight, tiles) {
    for (let w = 0; w < worldWidth; w++) {
        for (let h = 0; h < worldHeight; h++) {
            if (h < 10) {
                tiles.push(new Sky(gameEngine, AM.getAsset("./assets/img/stars.jpg"), w * tilesize, h * tilesize, false));
            }
            else if (h === 10) {
                let t = new Grass(gameEngine, AM.getAsset("./assets/img/grass.png"), w * tilesize, h * tilesize, true);
                if ((w > 2 && w < 13) || (w > 18 && w < 23)) t.health = 10000000;
                tiles.push(t);

            }
            else if (h < 15) {
                let r = ((Math.random() * tilesize) + 1);
                if (r < 25) {
                    tiles.push(new Dirt(gameEngine, AM.getAsset("./assets/img/dirt.png"), w * tilesize, h * tilesize, true));
                }

                else if (r < 25) {
                    tiles.push(new Dirt(gameEngine, AM.getAsset("./assets/img/tile_dirt_cracked.jpg"), w * tilesize, h * tilesize, true));
                }
                else if (r < 75) {
                    tiles.push(new Dirt(gameEngine, AM.getAsset("./assets/img/tile_dirt_plain.jpg"), w * tilesize, h * tilesize, true));

                }
                else {
                    tiles.push(new Dirt(gameEngine, AM.getAsset("./assets/img/tile_dirt_mud.jpg"), w * tilesize, h * tilesize, true));

                }
            }

            else if (h < 30) {
                randomStone(w*tilesize, h*tilesize, tiles)
            }
            else if (h < 35) {
                tiles.push(new GlassCrystal(gameEngine, AM.getAsset("./assets/img/tile_crystal2.png"), w * tilesize, h * tilesize, true));
            }
            else if (h < 38) {
                tiles.push(new Copper(gameEngine, AM.getAsset("./assets/img/tile_copper.png"), w * tilesize, h * tilesize, true));
            }

            else if (h < 40) {
                let r = ((Math.random() * tilesize) + 1);

                if (r < 40) {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone.png"), w * tilesize, h * tilesize, true));
                }
                else if (r < 80) {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_black.jpg"), w * tilesize, h * tilesize, true));
                }
                else {
                    tiles.push(new Gold(gameEngine, AM.getAsset("./assets/img/gold_ore.png"), w * tilesize, h * tilesize, true));
                }

            }
            else if (h < worldHeight) {
                let r = ((Math.random() * tilesize) + 1);

                if (r < 94) {
                    randomStone(w*tilesize, h*tilesize, tiles)
                }
                else if (r < 96) {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_ore.png"), w * tilesize, h * tilesize, true));
                }
                else if (r < 98) {
                    tiles.push(new Gold(gameEngine, AM.getAsset("./assets/img/gold_ore.png"), w * tilesize, h * tilesize, true));
                }

                else if (r < 99) {
                    tiles.push(new Crytsal(gameEngine, AM.getAsset("./assets/img/ore_crystal_blue.png"), w * tilesize, h * tilesize, true));
                }

                else {
                    tiles.push(new Crytsal(gameEngine, AM.getAsset("./assets/img/ore_crystal_large.png"), w * tilesize, h * tilesize, true));
                }
            }
        }
    }
}

function randomStone(x,y, tiles) {
    let r = ((Math.random() * tilesize) + 1);
    if (r < 25) {
        tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone.png"), x, y, true));

    }
    else if (r < 50) {
        tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_black.jpg"), x,y, true));

    }
    else if (r < 75) {
        tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/tile_stone_black.jpg"), x,y, true));

    }

    else {
        tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/tile_stone_cracked.jpg"), x,y, true));

    }
}