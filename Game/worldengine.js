function genworld (gameEngine, worldWidth, worldHeight, tiles) {
    for (let w = 0; w < worldWidth; w++) {
        for (let h = 0; h < worldHeight; h++) {
            if (h === 0) {
                tiles.push(new Grass(gameEngine, AM.getAsset("./assets/img/grass.png"), w*100, h*100));
            }
            else if (h < 5) {
                tiles.push(new Dirt(gameEngine, AM.getAsset("./assets/img/dirt.png"), w*100, h*100));
            }
            else if (h < 10) {
                tiles.push(new Stone(gameEngine, AM.getAsset("./assets/img/stone.png"), w*100, h*100));

            }
        }
    }
}