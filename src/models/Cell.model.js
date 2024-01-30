import ImageLoader from '../loader/ImageLoader.js'

class Cell {

    constructor(type = CellType.TREE) {
        this.type = type;
        this.image = ImageLoader.instance.images[type];
        this.pheromones = 0;
        this.drawPheromoneCircle = false;
        this.quantity = 0;
        this.controller = null;
    }

    static evaporationRate = 0.001;
    static foodPheromone = 0.3;

    depositFoodPheromone() {
        if (this.type !== CellType.ANTHILL && this.type !== CellType.FOOD) {
            this.pheromones += Cell.foodPheromone;
        }
    }

    getFood(){
        if (this.quantity !== 0 && this.type === CellType.FOOD){
            this.quantity -= 0.05
        }
        if (this.quantity <= 0  && this.type === CellType.FOOD){
            this.setType(CellType.FLOOR);
            this.controller.placeRandom();
        }
    }

    setType(type){
        this.type = type;
        this.pheromones = (type === CellType.FOOD) ? 1 : 0
        this.quantity = (type === CellType.FOOD) ? 1 : 0
    }

    evaporate() {
        if (this.type !== CellType.ANTHILL && this.type !== CellType.FOOD) {
            this.pheromones = Math.max(0, this.pheromones * (1 - Cell.evaporationRate));
        }
    }
}

export default Cell

const CellType = {
    FOOD : "FOOD",
    FLOOR : "FLOOR",
    ANTHILL : "ANTHILL",
    OBSTACLE : "OBSTACLE",
    TREE : "TREE"
}

export { CellType }
