import Cell from '../models/Cell.model.js';

class Canvas {
    constructor(id, width, height) {
        this.canvas = document.getElementById(id)
        this.canvas.width = width
        this.canvas.height = height

        this.context = this.canvas.getContext("2d")
    }

    generateMatrixBackground(){
        //this.matrix = [] // Matrix with different cells
        this.matrix = Array.from({ length: 12 }, () => Array(12).fill(new Cell()))
    }

    generateBackground(){
        const cellSize = this.canvas.width / this.matrix[0].length;

        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                this.matrix[y][x].display(this.canvas, x, y, cellSize);
            }
        }
    }
}

export default Canvas