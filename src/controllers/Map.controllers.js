import Cell from '../models/Cell.model.js'
import ImageLoader from '../loader/ImageLoader.js'
import { CellType } from '../models/Cell.model.js'

class Map {

    constructor(canvas = null) {
        this.canvas = canvas
    }

    _generateRandomMatrix(MATRIX_LENGTH = 16) {
        const map = [];

        for (let i = 0; i < MATRIX_LENGTH; i++) {
            map[i] = [];
            for (let j = 0; j < MATRIX_LENGTH; j++) {
                if (i === 0 || i === MATRIX_LENGTH - 1 || j === 0 || j === MATRIX_LENGTH - 1) {
                    map[i][j] = CellType.TREE;
                } else {
                    map[i][j] = Math.random() < 0.5 ? CellType.TREE : CellType.FLOOR;
                }
            }
        }

        const anthillX = Math.floor(MATRIX_LENGTH / 2);
        const anthillY = Math.floor(MATRIX_LENGTH / 2);

        this._placeRandomElement(MATRIX_LENGTH, map, CellType.OBSTACLE, 2);
        this._placeRandomElement(MATRIX_LENGTH, map, CellType.FOOD, 2 + Math.floor(Math.random() * 2));

        for (let l = 0; l < map.length; l++) {
            for (let m = 0; m < map[l].length; m++) {
                if (map[l][m] === CellType.FOOD) {
                    const start = [anthillX, anthillY];
                    const end = [l, m];
                    this._connectCells(map, start, end);
                    map[l][m] = CellType.FOOD
                }
            }
        }
        map[anthillX][anthillY] = CellType.ANTHILL;
        this.matrix = map;
    }

    _placeRandomElement(MATRIX_LENGTH, map, elementType, count) {
        for (let i = 0; i < count; i++) {
            let elementX, elementY;
            do {
                elementX = Math.floor(Math.random() * (MATRIX_LENGTH - 2)) + 1;
                elementY = Math.floor(Math.random() * (MATRIX_LENGTH - 2)) + 1;
            } while (map[elementX][elementY] !== CellType.FLOOR);

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
        const cellSize = this.canvas.width / this.matrix[0].length;

        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                const cellType = this.matrix[y][x];
                new Cell(cellType).display(this.canvas, x, y, cellSize)
            }
        }
    }

}

export default Map