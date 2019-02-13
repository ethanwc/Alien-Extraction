function genworld (gameEngine, worldWidth, worldHeight, tiles) {
    let tilesize = 200;
    for (let w = 0; w < worldWidth; w++) {
        for (let h = -10; h < worldHeight - 10; h++) {
            if (h < 0) {
                tiles.push(new Sky(gameEngine, AM.getAsset("./assets/img/stars.jpg"), w * tilesize, h * tilesize, false));
            }
            else if (h === 0) {
                tiles.push(new Grass(gameEngine, AM.getAsset("./assets/img/grass.png"), w * tilesize, h * tilesize, true));
            }
            else if (h < 5) {
                tiles.push(new Dirt(gameEngine, AM.getAsset("./assets/img/dirt.png"), w * tilesize, h * tilesize, true));
            }
            else if (h < 10) {
                tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone.png"), w * tilesize, h * tilesize, true));
            }
            else if (h < 20) {
                tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_black.jpg"), w * tilesize, h * tilesize, true));
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
            else if (h < 80) {
                let r = ((Math.random() * tilesize) + 1);

                if (r < 94) {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone.png"), w * tilesize, h * tilesize, true));
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