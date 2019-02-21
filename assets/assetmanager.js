class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    }

    queueDownload(path) {
        // console.log('Queueing ' + path);
        this.downloadQueue.push(path);
    }

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    }

    downloadAll(callback) {
        let length = this.downloadQueue.length;
        for (let i = 0; i < length; i++) {
            let img = new Image();
            let self = this;

            let path = this.downloadQueue[i];
            // console.log(path);

            img.addEventListener("load", function () {
                // console.log("Loaded " + this.src);
                console.log(((i+1)/length) * 100 + "%");
                self.successCount++;
                if (self.isDone()) callback();
            });

            img.addEventListener("error", function () {
                console.error("Error loading " + this.src);
                self.errorCount++;
                if (self.isDone()) callback();
            });

            img.src = path;
            this.cache[path] = img;
        }
    }

    getAsset(path) {
        return this.cache[path];
    }
}