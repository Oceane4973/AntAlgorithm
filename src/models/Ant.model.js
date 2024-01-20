import ImageLoader from '../loader/ImageLoader.js';
import { CellType } from '../models/Cell.model.js';

class Ant {
  static type = "ANT";
  static directions = [
    { dx: 1, dy: 0 }, // Droite
    { dx: -1, dy: 0 }, // Gauche
    { dx: 0, dy: 1 }, // Bas
    { dx: 0, dy: -1 } // Haut
  ];

  constructor(canvas, map, time = 1) {
    this.canvas = canvas;
    this.map = map;
    this.image = ImageLoader.instance.images[Ant.type];
    this.visited = Array.from({ length: this.map.matrixLength }, () => Array(this.map.matrixLength).fill(false));
    this.context = this.canvas.getContext('2d');
    this.cellSize = this.map.cellSize;
    this.time = time;
    this.move = this.cellSize / this.time;
    this.movementTime = 0;
    this.hasFindFood = false;

    this.nextCell = { x: this.map.anthillX, y: this.map.anthillY };
    this.updatePosition(this.map.anthillX, this.map.anthillY);
  }

  updatePosition(x, y) {
    [this.xCell, this.yCell, this.xAnt, this.yAnt] = [x, y, x * this.cellSize, y * this.cellSize];
    this.visited[x][y] = true;
  }

  findShortestPathToAnthill = () => {
    const priorityQueue = [{ x: this.xCell, y: this.yCell, distance: 0, path: [] }];
    const visitedCells = new Set();

    while (priorityQueue.length > 0) {
      priorityQueue.sort((a, b) => a.distance - b.distance);
      const { x, y, distance, path } = priorityQueue.shift();

      if (x === this.map.anthillX && y === this.map.anthillY) {
        return path;
      }

      if (!visitedCells.has(`${x},${y}`)) {
        visitedCells.add(`${x},${y}`);

        for (const { dx, dy } of Ant.directions) {
          const [nextX, nextY, nextDistance] = [x + dx, y + dy, distance + 1];

          if (this.isValidCell(nextX, nextY) && this.visited[nextX][nextY]) {
            priorityQueue.push({ x: nextX, y: nextY, distance: nextDistance, path: [...path, { x: nextX, y: nextY }] });
          }
        }
      }
    }

    return null;
  };

  _move = () => {
    if (this.movementTime === this.time) {
      if (this.hasFindFood) {
        this.pathToAnthill = (!this.pathToAnthill || !this.pathToAnthill.length) ? this.findShortestPathToAnthill()?.reverse() || [] : this.pathToAnthill;
        this.nextCell = this.pathToAnthill.pop();
        if (!this.nextCell) {
          this.hasFindFood = false;
          this.pathToAnthill = undefined;
          // Actions supplémentaires en cas d'arrivée à la fourmilière
        }
      } else {
        this.nextCell = this.getAdjacentCells();
      }

      this.movementTime = 0;
    }

    if (this.nextCell && this.nextCell.x !== undefined && this.nextCell.y !== undefined) {
      this.updatePosition(this.nextCell.x, this.nextCell.y);
      this.movementTime++;
    }
  };

  display = () => {
    const { img, croppedValue, xRatio, yRatio, sizeRatio } = this.image;
    const squareSize = img.width / croppedValue;
    const [xPos, yPos, size] = [img.width * xRatio, img.width * yRatio, this.cellSize * sizeRatio];

    this.context.drawImage(img, xPos, yPos, squareSize, squareSize, this.yAnt, this.xAnt, size, size);
    this._move();
  };

  getAdjacentCells = () => {
    const [adjacentCells, adjacentCellsVisited] = [[], []];

    for (const { dx, dy } of Ant.directions) {
      const [nextCellX, nextCellY] = [this.xCell + dx, this.yCell + dy];

      if (this.map.matrix[nextCellX][nextCellY] === CellType.FOOD) {
        this.hasFindFood = true;
        return { x: nextCellX, y: nextCellY };
      }

      if (this.isValidCell(nextCellX, nextCellY)) {
        const targetArray = this.visited[nextCellX][nextCellY] ? adjacentCellsVisited : adjacentCells;
        targetArray.push({ x: nextCellX, y: nextCellY });
      }
    }

    return (adjacentCells.length > 0 ? adjacentCells : adjacentCellsVisited)[Math.floor(Math.random() * (adjacentCells.length > 0 ? adjacentCells : adjacentCellsVisited).length)];
  };

  isValidCell = (x, y) => x >= 0 && x < this.map.matrixLength && y >= 0 && y < this.map.matrixLength &&
                            (this.map.matrix[x][y] === CellType.FLOOR || this.map.matrix[x][y] === CellType.ANTHILL);
}

export default Ant;
