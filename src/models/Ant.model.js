import { CellType } from './Cell.model.js';

class Ant {
    static type = "ANT";
    static directions = [
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 }
    ];
    static gamma = 0.01

      constructor(canvas, map, time = 20) {
        this.canvas = canvas;
        this.map = map;

        this.visited = Array.from({ length: this.map.matrixLength }, () => Array(this.map.matrixLength).fill(false));

        // To move ant
        this.time = time;
        this.movementTime = 0;

        // To return
        this.hasFindFood = false;

        // To display
        this.currentCell = {x : this.map.anthillX, y : this.map.anthillY, isVisited : null}
        this.nextCell = null
        this.oldCell = null
        this.visited[this.map.anthillX][this.map.anthillY] = true

        this.angle = 0;

        this.xAnt = this.currentCell.x * this.map.cellSize
        this.yAnt = this.currentCell.y * this.map.cellSize
          this.sound = document.createElement("audio");
        this.sound.src = "src/resources/sounds/crunch.mp3";
      }

  updatePosition() {
    this.xAnt += this.map.cellSize / this.time * (this.nextCell.x - this.oldCell.x)
    this.yAnt += this.map.cellSize / this.time * (this.nextCell.y - this.oldCell.y)
  }

  updateObjective(nextCell) {
    this.oldCell = this.currentCell
    this.nextCell = nextCell
    this.currentCell = nextCell
    this.visited[nextCell.x][nextCell.y] = true;

    const dx = this.nextCell.x - this.oldCell.x;
    const dy = this.nextCell.y - this.oldCell.y;

    if (dx === 1 && dy === 0) this.angle = -90;
    else if (dx === -1 && dy === 0) this.angle = 90;
    else if (dx === 0 && dy === 1) this.angle = 180;
    else this.angle = 0;
    }

  findShortestPathToAnthill() {
      const queue = [{ x: this.currentCell.x, y: this.currentCell.y, path: [] }];
      const visitedCells = new Set();

      while (queue.length > 0) {
          const { x, y, path } = queue.shift();

          if (x === this.map.anthillX && y === this.map.anthillY) {
              return path;
          }

          if (!visitedCells.has(`${x},${y}`)) {
              visitedCells.add(`${x},${y}`);

              for (const { dx, dy } of Ant.directions) {
                  const [nextX, nextY] = [x + dx, y + dy];

                  if (this.isValidCell(nextX, nextY) && this.visited[nextX][nextY]) {
                      queue.push({ x: nextX, y: nextY, path: [...path, { x: nextX, y: nextY }] });
                  }
              }
          }
      }

      return null;
  }


  _move(){
    if (this.movementTime === this.time) {
      if (this.hasFindFood) {
          this.pathToAnthill = (!this.pathToAnthill || !this.pathToAnthill.length) ? this.findShortestPathToAnthill()?.reverse() || [] : this.pathToAnthill;
          if (this.pathToAnthill.length > 0) {
              let next = this.pathToAnthill.pop();
              this.map.matrixCell[this.nextCell.x][this.nextCell.y].model.depositFoodPheromone()
              this.updateObjective(next)
          } else {
              this.hasFindFood = false;
              this.pathToAnthill = undefined;
              this.updateObjective({ x: this.map.anthillX, y: this.map.anthillY });
          }
      } else {
          this.updateObjective(this.getAdjacentCells())
      }
      this.movementTime = 0;
    }

    if (this.nextCell == null){
        this.updateObjective(this.getAdjacentCells())
    }
    this.updatePosition();
    this.movementTime++;
  };

  display(move = true){
    if (move){
        this._move();
    }
    const { img, croppedValue, xRatio, yRatio, sizeRatio } = this.image;
    const squareSize = img.width / croppedValue;
    const [xPos, yPos, size] = [img.width * xRatio, img.width * yRatio, this.map.cellSize * sizeRatio];

    const ctx = this.canvas.getContext('2d');
    ctx.save();
    ctx.translate(this.yAnt + size/2,  this.xAnt+ size/2);
    ctx.rotate(this.angle*Math.PI/180);
    ctx.drawImage(img, xPos, yPos, squareSize, squareSize, -size/2, -size/2, size, size);
    ctx.restore();
  };

    getAdjacentCells(){
        let targets = []

        for (const { dx, dy } of Ant.directions) {
            const [nextCellX, nextCellY] = [this.currentCell.x + dx, this.currentCell.y + dy];

            if (this.map.matrixCell[nextCellX][nextCellY].model.type === CellType.FOOD) {
                this.hasFindFood = true;
                this.sound.play();
                this.map.matrixCell[nextCellX][nextCellY].model.getFood();
                return { x: nextCellX, y: nextCellY, isVisited : false};
            }

            if (this.isValidCell(nextCellX, nextCellY)) {
                targets.push({ x: nextCellX, y: nextCellY, isVisited : this.visited[nextCellX][nextCellY]});
            }
        }

        if (targets.length === 1){
            return targets[0]
        }

        if (this.oldCell){
            targets = targets.filter(target => !(target.x === this.oldCell.x && target.y === this.oldCell.y));
        }

        let prob = Math.floor(Math.random() * 100)/100
        let probability = []
        let total = 0
        for (let target of targets){
            let pheromones = this.map.matrixCell[target.x][target.y].model.pheromones + Ant.gamma
            probability.push(pheromones)
            total += pheromones
        }

        if (total < Ant.gamma*5){
            let newTargets = targets.filter(target => !target.isVisited);
            if (newTargets.length > 0){
                return newTargets[Math.floor(Math.random() * newTargets.length)];
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
   (this.map.matrixCell[x][y].model.type === CellType.FLOOR || this.map.matrixCell[x][y].model.type === CellType.ANTHILL);
}

export default Ant;
