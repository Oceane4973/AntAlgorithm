import ImageLoader from '../loader/ImageLoader.js'

class Cell {

    constructor(type = CellType.TREE) {
        this.type = type
        this.image = ImageLoader.instance.images[type]
        this.pheromones = (type == CellType.ANTHILL || type == CellType.FOOD) ? 1 : 0
    }

    draw_default_grass(context, x, y, cellSize){
         const grassImg = ImageLoader.instance.images[CellType.FLOOR]
         const grassSquareSize = grassImg.img.width / grassImg.croppedValue
         const grassXPos = grassImg.img.width * grassImg.xRatio
         const grassYPos = grassImg.img.width * grassImg.yRatio
         context.drawImage( grassImg.img, grassXPos, grassYPos, grassSquareSize, grassSquareSize, x * cellSize, y * cellSize, cellSize, cellSize);
    }

    draw_image(context, x, y, cellSize){
        const squareSize = this.image.img.width / this.image.croppedValue
        const xPos = this.image.img.width * this.image.xRatio
        const yPos = this.image.img.width * this.image.yRatio
        const objectSize = cellSize * this.image.sizeRatio
        context.drawImage( this.image.img, xPos, yPos, squareSize, squareSize, (x * cellSize) , (y * cellSize), objectSize, objectSize);
    }

    draw_pheromone(context, x, y, cellSize){
        context.textAlign = "center"
        context.fillStyle = `rgb( ${255 - 255 * this.pheromones}, ${255 * this.pheromones},  ${255 * this.pheromones})`;
        context.font = "10px Arial";
        context.fillText(this.pheromones.toString() ,(x * cellSize) + cellSize/2 , (y * cellSize) + cellSize/2);
    }

     display(canvas, x, y, cellSize) {
        const context = canvas.getContext('2d')
        this.draw_default_grass(context, x, y, cellSize)

        if (this.type != CellType.FLOOR){
            this.draw_image(context, x, y, cellSize)
        }

        if (this.type != CellType.OBSTACLE && this.type != CellType.TREE) {
            this.draw_pheromone(context, x, y, cellSize)
        }
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
