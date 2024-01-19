import ImageLoader from '../loader/ImageLoader.js'

class Cell {

    constructor(type = CellType.TREE) {
        this.type = type
        this.image = ImageLoader.instance.images[type]
    }

     display(canvas, x, y, cellSize) {
        const context = canvas.getContext('2d')
        if (this.type != CellType.FLOOR){
            const grassImg = ImageLoader.instance.images[CellType.FLOOR]
            const grassSquareSize = grassImg.img.width / grassImg.croppedValue
            const grassXPos = grassImg.img.width * grassImg.xRatio
            const grassYPos = grassImg.img.width * grassImg.yRatio
            context.drawImage( grassImg.img, grassXPos, grassYPos, grassSquareSize, grassSquareSize, x * cellSize, y * cellSize, cellSize, cellSize);
        }
        const squareSize = this.image.img.width / this.image.croppedValue
        const xPos = this.image.img.width * this.image.xRatio
        const yPos = this.image.img.width * this.image.yRatio
        context.drawImage( this.image.img, xPos, yPos, squareSize, squareSize, x * cellSize, y * cellSize, cellSize, cellSize);
    }
}

export default Cell

const CellType = {
    FOOD : "FOOD",
    FLOOR : "FLOOR",
    ANTHILL : "ANTHILL",
    OBSTACLE : "OBSTACLE",
    TREE : "TREE"
}

export { CellType }