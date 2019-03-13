class MusicMenu {
    constructor(img, x, y, w, h, textx, texty) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.textx = textx;
        this.texty = texty;
        this.lastClick = 0;
        this.coolDown = .2;
        this.isUnlocked = false;
        this.pauseMusic = musicPause;
        this.isDrawing = false;
        this.level = 0;
        this.isUnlocked = false;
    }
    update() {
        if (this.checkSelected())
            this.handleClick();


    }

    draw (ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    }

    checkSelected() {
        return (mouse.x > this.x && mouse.x < this.x + this.w &&
            mouse.y > this.y && mouse.y < this.y + this.h);
    }

    handleClick() {
        this.pauseMusic = !this.pauseMusic;
        //toggle draw
        //draw the texts
        if (mouse.isPressed) {
            if ((gameEngine.timer.gameTime - this.lastClick) > this.coolDown) {
                    if (this.pauseMusic) music.pause();
                    else music.play();
                    this.pauseMusic = musicPause;

                this.lastClick = gameEngine.timer.gameTime;
            }
        }
    }
}