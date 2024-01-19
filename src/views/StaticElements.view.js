class StaticElements {

    constructor(context = null, url = "", positionX = 0, positionY = 0) {
        this.ctx = context;
        this.image = new Image();
        this.image.src = url;
        this.image.onload = () => {
            this.ctx.drawImage(this.image, positionX, positionY)
        }
    }

}

export default StaticElements;