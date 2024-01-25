import Cell from '../models/Cell.model.js'
import ImageLoader from '../loader/ImageLoader.js'
import { CellType } from '../models/Cell.model.js'

class Map {

    constructor(canvas = null, matrixLength=20) {
        this.canvas = canvas
        this.matrixLength = matrixLength
        this.cellSize = this.canvas.width / matrixLength;
    }

    _generateRandomMatrix() {
        this.matrixCell = []
        for (let i = 0; i < this.matrixLength; i++) {
            this.matrixCell[i] = [];
            for (let j = 0; j < this.matrixLength; j++) {
                if (i === 0 || i === this.matrixLength - 1 || j === 0 || j === this.matrixLength - 1) {
                    this.matrixCell[i][j] = new Cell(CellType.TREE, this);
                } else {
                    this.matrixCell[i][j] = Math.random() < 0.4 ?  new Cell(CellType.TREE, this) :  new Cell(CellType.FLOOR, this);
                }
            }
        }


        this.placeRandomElement(CellType.OBSTACLE, 2);
        this.placeRandomElement(CellType.FOOD, 3 + Math.floor(Math.random() * 2));
        this.placeRandomElement(CellType.ANTHILL, 1);

        for (let l = 0; l < this.matrixCell.length; l++) {
            for (let m = 0; m < this.matrixCell[l].length; m++) {
                if (this.matrixCell[l][m].type === CellType.FOOD) {
                    const start = [this.anthillX, this.anthillY];
                    const end = [l, m];
                    this._connectCells(start, end);
                    this.matrixCell[l][m].setType(CellType.FOOD)
                }
            }
        }
        this.matrixCell[this.anthillX][this.anthillY].setType(CellType.ANTHILL)
    }

    placeRandomElement(elementType, count) {
        for (let i = 0; i < count; i++) {
            let elementX, elementY;
            do {
                elementX = Math.floor(Math.random() * (this.matrixLength - 2)) + 1;
                elementY = Math.floor(Math.random() * (this.matrixLength - 2)) + 1;
            } while (this.matrixCell[elementX][elementY].type !== CellType.FLOOR);
            if (elementType === CellType.ANTHILL) {
                this.anthillX = elementX
                this.anthillY = elementY
            }
            this.matrixCell[elementX][elementY].setType(elementType);
        }
    }

    _connectCells(start, end) {
        let [startX, startY] = start;
        const [endX, endY] = end;

        while (startX !== endX || startY !== endY) {
             startX += (startX < endX) ? 1 : (startX > endX) ? -1 : 0;
             this.matrixCell[startX][startY].setType(CellType.FLOOR);
             startY += (startY < endY) ? 1 : (startY > endY) ? -1 : 0;
             this.matrixCell[startX][startY].setType(CellType.FLOOR);
        }
    }

    async generate() {
        await ImageLoader.instance.loadImages()
        this._generateRandomMatrix()
        await this.refresh()
    }

    async refresh() {
        for (let y = 0; y < this.matrixCell.length; y++) {
            for (let x = 0; x < this.matrixCell[y].length; x++) {
                this.matrixCell[y][x].display(this.canvas, x, y, this.cellSize)
            }
        }
    }

    updatePheromonesView(display){
        this.matrixCell.map(line => line.map(cell => cell.drawPheromoneCircle = display));
    }

}

export default Map