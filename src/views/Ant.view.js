import ImageLoader from "../loader/ImageLoader.js";

class Ant{
    constructor(canvas = null, cellSize = 0) {
        this.image = ImageLoader.instance.images["ANT"];
        this.canvas = canvas;
        this.cellSize = cellSize;
    }

    display(x, y, angle){
        const { img, croppedValue, xRatio, yRatio, sizeRatio } = this.image;
        const squareSize = img.width / croppedValue;
        const [xPos, yPos, size] = [img.width * xRatio, img.width * yRatio, this.cellSize * sizeRatio];

        const ctx = this.canvas.getContext('2d');
            ctx.save();
            ctx.translate(y + size/2,  x+ size/2);
            ctx.rotate(angle*Math.PI/180);
            ctx.drawImage(img, xPos, yPos, squareSize, squareSize, -size/2, -size/2, size, size);
            ctx.restore();
    };
}

export default Ant;
