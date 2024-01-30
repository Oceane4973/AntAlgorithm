import ImageLoader from "../loader/ImageLoader.js";
import { CellType } from '../models/Cell.model.js';

class Cell{

    constructor(type = CellType.TREE) {
        this.image = ImageLoader.instance.images[type]
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

    draw_pheromone(context, x, y, cellSize, pheromones){
        if (this.drawPheromoneCircle){
            const circleSize = pheromones * cellSize * 0.2;
            const circleX = x * cellSize + cellSize / 2;
            const circleY = y * cellSize + cellSize / 2;

            context.beginPath();
            context.arc(circleX, circleY, circleSize, 0, 2 * Math.PI);
            context.fillStyle = `rgba(0, 255, 0, ${pheromones})`;
            context.fill();
            context.closePath();
        } else {
            context.textAlign = "center"
            context.fillStyle = `rgba( 50, 255, 0, ${pheromones})`;
            context.font = "10px Arial";
            context.fillText(pheromones.toFixed(2),(x * cellSize) + cellSize/2 , (y * cellSize) + cellSize/2);
        }
    }

    update_type(type){
        this.image = ImageLoader.instance.images[type]
    }
}

export default Cell;
