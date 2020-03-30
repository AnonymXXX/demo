const birdDom = document.querySelector(".bird");
const birdStyle = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyle.width);
const birdHeight = parseFloat(birdStyle.height);
const birdLeft = parseFloat(birdStyle.left);
const birdTop = parseFloat(birdStyle.top);
const gameDom = document.querySelector(".game");
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle{
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        // 加速度
        this.g = 1500;
        this.maxY = gameHeight - landHeight - this.height;
        // 翅膀的状态
        this.swingStatus = 1;
        // 用定时器控制翅膀煽动的状态
        this.timer = null;
        this.render();
    }

    // 开始煽动翅膀
    startSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus = (this.swingStatus + 1) % 3 + 1;
        }, 200);
    }

    // 停止煽动翅膀
    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`;
    }

    move(duration) {
        super.move(duration);
        // 速度加上加速器
        this.ySpeed += this.g * duration;
    }

    // 控制边界
    onMove() {
        if (this.top < 0) {
            this.top = 0;
        }else if (this.top > this.maxY) {
            this.top = this.maxY;
        }
    }

    // 向上跳
    jump() {
        this.ySpeed = -450;
    }
}
