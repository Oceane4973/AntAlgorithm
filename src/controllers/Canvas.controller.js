import Cell from '../models/Cell.model.js'
import Ground from "../views/Ground.view.js";

class Canvas {
    constructor(id, width, height) {
        this.canvas = document.getElementById(id)
        this.canvas.width = width
        this.canvas.height = height

        this.context = this.canvas.getContext("2d")
    }

    generateMatrixBackground(){
        //this.matrix = [] // Matrix with different cells
        // this.matrix = Array.from({ length: 12 }, () => Array(12).fill(new Cell()))
        this.matrix = Array.from({ length: 64 }, () => Array(64).fill(new Ground()))
    }

    generateBackground(){
        const cellSize = 16;

        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                this.matrix[y][x].display(this.canvas, x, y, cellSize)
            }
        }
        this.matrix[30][17] = new Cell();
        this.matrix[30][17].display(this.canvas, 17, 30, cellSize);
    }
}

export default Canvas