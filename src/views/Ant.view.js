import ImageLoader from "../loader/ImageLoader.js";

class Ant{
    constructor(canvas = null, cellSize = 0) {
        this.image = ImageLoader.instance.images["ANT"];
        this.canvas = canvas;
        this.cellSize = cellSize;
    }

    display(x, y){
        const { img, croppedValue, xRatio, yRatio, sizeRatio } = this.image;
        const squareSize = img.width / croppedValue;
        const [xPos, yPos, size] = [img.width * xRatio, img.width * yRatio, this.cellSize * sizeRatio];

        this.canvas.getContext('2d').drawImage(img, xPos, yPos, squareSize, squareSize, y, x, size, size);
    };
}

export default Ant;
