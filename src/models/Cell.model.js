import ImageLoader from '../loader/ImageLoader.js'

class Cell {

    constructor(type = CellType.TREE, mapController) {
        this.type = type
        this.image = ImageLoader.instance.images[type]
        this.pheromones = 0
        this.drawPheromoneCircle = false
        this.quantity = 0
        this.mapController = mapController
    }

    static evaporationRate = 0.001;
    static foodPheromone = 0.3;

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
        if (this.drawPheromoneCircle){
            const circleSize = this.pheromones * cellSize * 0.2;
            const circleX = x * cellSize + cellSize / 2;
            const circleY = y * cellSize + cellSize / 2;

            context.beginPath();
            context.arc(circleX, circleY, circleSize, 0, 2 * Math.PI);
            context.fillStyle = `rgba(0, 255, 0, ${this.pheromones})`;
            context.fill();
            context.closePath();
        } else {
            context.textAlign = "center"
            context.fillStyle = `rgba( 50, 255, 0, ${this.pheromones})`;
            context.font = "10px Arial";
            context.fillText(this.pheromones.toFixed(2),(x * cellSize) + cellSize/2 , (y * cellSize) + cellSize/2);
        }
    }

     display(canvas, x, y, cellSize) {
        const context = canvas.getContext('2d')
        this.draw_default_grass(context, x, y, cellSize)

        if (this.type != CellType.FLOOR){
            this.draw_image(context, x, y, cellSize)
        }

        if (this.type != CellType.OBSTACLE && this.type != CellType.TREE) {
            this.draw_pheromone(context, x, y, cellSize)
            this.evaporate()
        }
    }

    depositFoodPheromone() {
        if (this.type != CellType.ANTHILL && this.type != CellType.FOOD) {
            this.pheromones += Cell.foodPheromone;
        }
    }

    getFood(){
        if (this.quantity != 0 && this.type == CellType.FOOD){
            this.quantity -= 0.05
        }
        console.log(this.quantity)
        if (this.quantity <= 0  && this.type == CellType.FOOD){
            this.setType(CellType.FLOOR)
            this.mapController.placeRandomElement(CellType.FOOD, 1);
        }
    }

    setType(type){
        this.type = type
        this.image = ImageLoader.instance.images[this.type]
        this.pheromones = (type == CellType.FOOD) ? 1 : 0
        this.quantity = (type == CellType.FOOD) ? 1 : 0
    }

    evaporate() {
        if (this.type != CellType.ANTHILL && this.type != CellType.FOOD) {
            this.pheromones = Math.max(0, this.pheromones * (1 - Cell.evaporationRate));
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
