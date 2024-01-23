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
  static gamma = 0.01

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
    this.oldCell = null
    this.updatePosition(this.map.anthillX, this.map.anthillY);
  }

  updatePosition(x, y) {
    if (this.xCell && this.yCell){
        this.oldCell = { x: this.xCell, y: this.yCell };
    }
    [this.xCell, this.yCell, this.xAnt, this.yAnt] = [x, y, x * this.cellSize, y * this.cellSize];
    this.visited[x][y] = true;
  }

  findShortestPathToAnthill(){
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

  _move(){
    if (this.movementTime === this.time) {
      if (this.hasFindFood) {
        this.pathToAnthill = (!this.pathToAnthill || !this.pathToAnthill.length) ? this.findShortestPathToAnthill()?.reverse() || [] : this.pathToAnthill;
        this.nextCell = this.pathToAnthill.pop();
        if (!this.nextCell) {
            this.hasFindFood = false;
            this.pathToAnthill = undefined;
            this.nextCell = { x: this.map.anthillX, y: this.map.anthillY }
        } else {
            this.map.matrixCell[this.nextCell.x][this.nextCell.y].depositFoodPheromone()
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

  display(){
    const { img, croppedValue, xRatio, yRatio, sizeRatio } = this.image;
    const squareSize = img.width / croppedValue;
    const [xPos, yPos, size] = [img.width * xRatio, img.width * yRatio, this.cellSize * sizeRatio];

    this.context.drawImage(img, xPos, yPos, squareSize, squareSize, this.yAnt, this.xAnt, size, size);
    this._move();
  };

    getAdjacentCells(){
        let targets = []

        for (const { dx, dy } of Ant.directions) {
            const [nextCellX, nextCellY] = [this.xCell + dx, this.yCell + dy];

            if (this.map.matrix[nextCellX][nextCellY] === CellType.FOOD) {
                this.hasFindFood = true;
                return { x: nextCellX, y: nextCellY };
            }

            if (this.isValidCell(nextCellX, nextCellY)) {
                targets.push({ x: nextCellX, y: nextCellY, isVisited : this.visited[nextCellX][nextCellY]});
            }
        }

        if (targets.length == 1){
            return targets[0]
        }

        targets = targets.filter(target => !(target.x == this.oldCell.x && target.y == this.oldCell.y));

        let prob = Math.floor(Math.random() * 100)/100
        let probability = []
        let total = 0
        for (let target of targets){
            let pheromones = this.map.matrixCell[target.x][target.y].pheromones + Ant.gamma
            probability.push(pheromones)
            total += pheromones
        }

        if (total < Ant.gamma*5){
            let newTarget = targets.find(target => !target.isVisited);
            if (newTarget){
                return newTarget
            }
        }

        let cumul = 0
        for (let i=0; i< targets.length; i++){
            cumul += (probability[i] / total)
            if (cumul >= prob){
                return targets[i]
            }
        }
  };

  isValidCell = (x, y) => x >= 0 && x < this.map.matrixLength && y >= 0 && y < this.map.matrixLength &&
   (this.map.matrix[x][y] === CellType.FLOOR || this.map.matrix[x][y] === CellType.ANTHILL);
}

export default Ant;
