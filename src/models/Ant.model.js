import ImageLoader from '../loader/ImageLoader.js'
import { CellType } from '../models/Cell.model.js'

class Ant {
  static type = "ANT"

  constructor(canvas, map, time = 1) {
    this.canvas = canvas
    this.map = map;
    this.image = ImageLoader.instance.images[Ant.type]
    this.visited = [];
    for (let i = 0; i < this.map.matrixLength; i++) {
        this.visited[i] = [];
        for (let j = 0; j < this.map.matrixLength; j++) {
            this.visited[i][j] = false;
        }
    }

    this.context = this.canvas.getContext('2d')
    this.cellSize = this.map.cellSize

    this.xCell = this.map.anthillX
    this.yCell = this.map.anthillY

    this.xAnt = this.xCell * this.cellSize
    this.yAnt = this.yCell * this.cellSize

    this.visited[this.xCell][this.yCell] = true

    this.time = time
    this.move = this.cellSize / this.time
    this.movementTime = 0
     this.nextCell = this.getAdjacentCells()
  }

  _move() {
    if (this.movementTime == this.time) {
      this.nextCell = this.getAdjacentCells()
      this.movementTime = 0
    } else {
        this.xCell = this.nextCell.x
        this.yCell = this.nextCell.y

        this.visited[this.xCell][this.yCell] = true

        this.xAnt = this.xCell * this.cellSize
        this.yAnt = this.yCell * this.cellSize

        this.movementTime++
    }
  }

  display() {
    const squareSize = this.image.img.width / this.image.croppedValue
    const xPos = this.image.img.width * this.image.xRatio
    const yPos = this.image.img.width * this.image.yRatio
    const size = this.cellSize * this.image.sizeRatio
    this.context.drawImage(this.image.img, xPos, yPos, squareSize, squareSize, this.yAnt, this.xAnt, size, size);
    this._move()
  }

  getAdjacentCells() {
      const adjacentCells = [];
      const adjacentCellsVisited = [];

      const directions = [
          { dx: 1, dy: 0 }, // Droite
          { dx: -1, dy: 0 }, // Gauche
          { dx: 0, dy: 1 }, // Bas
          { dx: 0, dy: -1 } // Haut
      ];

      for (const direction of directions) {
          const nextCellX = this.xCell + direction.dx;
          const nextCellY = this.yCell + direction.dy;

          if (
              nextCellX >= 0 &&
              nextCellX < this.map.matrixLength &&
              nextCellY >= 0 &&
              nextCellY < this.map.matrixLength &&
              ( this.map.matrix[nextCellX][nextCellY] === CellType.FLOOR ||
              this.map.matrix[nextCellX][nextCellY] === CellType.ANTHILL )
          ) {
              if (this.visited[nextCellX][nextCellY] != false ){
                adjacentCellsVisited.push({ x: nextCellX, y: nextCellY });
              } else {
                adjacentCells.push({ x: nextCellX, y: nextCellY });
              }
          }
      }

      if (adjacentCells.length > 0){
        return adjacentCells[Math.floor(Math.random() * adjacentCells.length)]

      } else {
        return adjacentCellsVisited[Math.floor(Math.random() * adjacentCellsVisited.length)]

      }
  }

}

export default Ant