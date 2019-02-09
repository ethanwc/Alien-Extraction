function genworld (gameEngine, worldWidth, worldHeight, tiles) {
    for (let w = 0; w < worldWidth; w++) {
        for (let h = -10; h < worldHeight - 10; h++) {
            if (h < 0) {
                tiles.push(new Sky(gameEngine, AM.getAsset("./assets/img/stars.jpg"), w * 100, h * 100, false));
            }
            else if (h === 0) {
                tiles.push(new Grass(gameEngine, AM.getAsset("./assets/img/grass.png"), w * 100, h * 100, true));
            }
            else if (h < 5) {
                tiles.push(new Dirt(gameEngine, AM.getAsset("./assets/img/dirt.png"), w * 100, h * 100, true));
            }
            else if (h < 10) {
                tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone.png"), w * 100, h * 100, true));
            }
            else if (h < 20) {
                tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_black.jpg"), w * 100, h * 100, true));
            }
            else if (h < 40) {
                let r = ((Math.random() * 100) + 1);

                if (r < 40) {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone.png"), w * 100, h * 100, true));
                }
                else if (r < 80) {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_black.jpg"), w * 100, h * 100, true));
                }
                else {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/gold_ore.png"), w * 100, h * 100, true));
                }

            }
            else if (h < 80) {
                let r = ((Math.random() * 100) + 1);

                if (r < 94) {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone.png"), w * 100, h * 100, true));
                }
                else if (r < 96) {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone_ore.png"), w * 100, h * 100, true));
                }
                else if (r < 98) {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/gold_ore.png"), w * 100, h * 100, true));
                }

                else if (r < 99) {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/ore_crystal_blue.png"), w * 100, h * 100, true));
                }

                else {
                    tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/ore_crystal_large.png"), w * 100, h * 100, true));
                }
            }
        }
    }
}