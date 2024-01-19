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
        const map = [];

        for (let i = 0; i < this.matrixLength; i++) {
            map[i] = [];
            for (let j = 0; j < this.matrixLength; j++) {
                if (i === 0 || i === this.matrixLength - 1 || j === 0 || j === this.matrixLength - 1) {
                    map[i][j] = CellType.TREE;
                } else {
                    map[i][j] = Math.random() < 0.4 ? CellType.TREE : CellType.FLOOR;
                }
            }
        }

        this._placeRandomElement(map, CellType.OBSTACLE, 2);
        this._placeRandomElement(map, CellType.FOOD, 2 + Math.floor(Math.random() * 2));
        this._placeRandomElement(map, CellType.ANTHILL, 1);

        for (let l = 0; l < map.length; l++) {
            for (let m = 0; m < map[l].length; m++) {
                if (map[l][m] === CellType.FOOD) {
                    const start = [this.anthillX, this.anthillY];
                    const end = [l, m];
                    this._connectCells(map, start, end);
                    map[l][m] = CellType.FOOD
                }
            }
        }
        map[this.anthillX][this.anthillY] = CellType.ANTHILL;
        this.matrix = map;
    }

    _placeRandomElement( map, elementType, count) {
        for (let i = 0; i < count; i++) {
            let elementX, elementY;
            do {
                elementX = Math.floor(Math.random() * (this.matrixLength - 2)) + 1;
                elementY = Math.floor(Math.random() * (this.matrixLength - 2)) + 1;
            } while (map[elementX][elementY] !== CellType.FLOOR);
            if (elementType === CellType.ANTHILL) {
                this.anthillX = elementX
                this.anthillY = elementY
            }
            map[elementX][elementY] = elementType;
        }
    }

    _connectCells(map, start, end) {
        let [startX, startY] = start;
        const [endX, endY] = end;

        while (startX !== endX || startY !== endY) {
            startX += (startX < endX) ? 1 : (startX > endX) ? -1 : 0;
            map[startX][startY] = CellType.FLOOR;
            startY += (startY < endY) ? 1 : (startY > endY) ? -1 : 0;
            map[startX][startY] = CellType.FLOOR;
        }
    }

    async generate() {
        await ImageLoader.instance.loadImages()
        this._generateRandomMatrix()
        await this.refresh()
    }

    async refresh() {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                const cellType = this.matrix[y][x];
                new Cell(cellType).display(this.canvas, x, y, this.cellSize)
            }
        }
    }

}

export default Map