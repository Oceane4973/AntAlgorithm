
class ImageData {
    constructor(src, croppedValue, xRatio = 0, yRatio = 0) {
        this.src = src
        this.croppedValue = croppedValue
        this.xRatio = xRatio
        this.yRatio = yRatio
        this.img = null
    }

    async initialize() {
        this.img = await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => { resolve(img); };
            img.onerror = reject;
            img.src = this.src;
        });
    }
}


export { ImageData }
