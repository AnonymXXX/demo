/**
 * 定义一个可移动的矩形类
 * 属性：宽度、高度、横坐标、纵坐标、横向速度、纵向速度、dom对象
 */

class Rectangle {
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }

    /**
     * 在页面上渲染矩形
     */
    render() {
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }

    /**
     * 按照矩形的速度和指定时间，移动矩形
     * @param duration
     */
    move(duration) {
        const xDis = this.xSpeed * duration;
        const yDis = this.ySpeed * duration;
        this.left = xDis + this.left;
        this.top = yDis + this.top;

        if (this.onMove) {
            this.onMove();
        }

        this.render();
    }
}
