const gameWidth = gameDom.clientWidth;

/**
 * 生成一个柱子
 */
class Pipe extends Rectangle{
    constructor(height, top, speed, dom) {
        super(52, height, gameWidth, top, speed, 0, dom);
    }
    onMove() {
        // 移除超出视野的柱子对
        if (this.left < -this.width) {
            this.dom.remove();
        }
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 确定一对柱子对的随机位置
 */
class PipePare {
    constructor(speed) {
        this.spaceHeight = 150; //空隙高度
        this.minHeight = 80; //最小高度
        this.maxHeight = landTop - this.minHeight - this.spaceHeight;
        const upHeight = getRandom(this.minHeight, this.maxHeight);
        const upDom = document.createElement("div");
        upDom.className = "pipe up";
        this.upPipe = new Pipe(upHeight, 0, speed, upDom); //上水管

        const downHeight = landTop - upHeight - this.spaceHeight;
        const downTop = landTop - downHeight;
        const downDom = document.createElement("div");
        downDom.className = "pipe down";
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom); //下水管

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }

    get useless() {
        return this.upPipe.left < -this.upPipe.width;
    }

    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

/**
 * 一定时间内生成多组柱子对
 */
class PipePareProducer {
    constructor(speed) {
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
        this.tick = 2000;
    }

    startProduce() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePare(this.speed));
            // 移除数组中没用的柱子对
            for (let i = 0; i < this.pairs.length; i ++) {
                let pair = this.pairs[i];
                if (pair.useless) {
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, this.tick)
    }

    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

