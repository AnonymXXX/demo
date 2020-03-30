// 游戏暂停之后再开启，柱子生成存在定时器bug

class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        // 柱子对生成器
        this.pipeProducer = new PipePareProducer(-100);
        this.timer = null;
        this.tick = 16; //移动时间间隔，单位：毫秒
        this.gameOver = false;
    }

    start() {
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            window.location.reload();
        }
        this.pipeProducer.startProduce();
        this.bird.startSwing();
        this.timer = setInterval(() => {
            const duration = this.tick / 1000;
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.pipeProducer.pairs.forEach(pair => {
                pair.move(duration);
            })
            if (this.isGameOver()) {
                this.stop();
                this.gameOver = true;
            }
        }, this.tick);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
    }

    regEvent() {
        window.onkeydown = e => {
            if (e.key === "Enter") {
                if (this.timer) {
                    this.stop();
                }else {
                    this.start();
                }
            }else if (e.key === " ") {
                this.bird.jump();
            }
        }
    }

    /**
     * 判断两个矩形是否碰撞
     */
    isHit(rec1, rec2) {
        // 横向：两个矩形的中心点的横向距离，是否小于两个矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于两个矩形高度之和的一半
        const centerX1 = rec1.left + rec1.width / 2;
        const centerY1 = rec1.top + rec1.height / 2;
        const centerX2 = rec2.left + rec2.width / 2;
        const centerY2 = rec2.top + rec2.height / 2;
        const disX = Math.abs(centerX1 - centerX2); //中心点横向距离
        const disY = Math.abs(centerY1 - centerY2); //中心点纵向距离
        if (disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2) {
            return true;
        }
        return false;
    }

    isGameOver() {
        if (this.bird.top === this.bird.maxY) {
            // bird碰到了land
            return true;
        }
        for (let i = 0; i < this.pipeProducer.pairs.length; i ++) {
            const pair = this.pipeProducer.pairs[i];
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
    }
}

var g = new Game();
g.regEvent();