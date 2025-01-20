import ImageLoader from '../loader/ImageLoader.js'

class Cell {

    static maxPheromones = 0
    static evaporationRate = 0.005;
    static foodPheromone = 0.3;

    constructor(type = CellType.TREE) {
        this.type = type;
        this.image = ImageLoader.instance.images[type];
        this.pheromones = 0;
        this.quantity = 0;
        this.controller = null;
        this.maxPheromones = this.pheromones
    }

    depositFoodPheromone() {
        if (this.type !== CellType.ANTHILL && this.type !== CellType.FOOD) {
            this.pheromones += Cell.foodPheromone;
            this.maxPheromones = Math.max(this.maxPheromones, this.pheromones)
            Cell.maxPheromones = Math.max(Cell.maxPheromones, this.pheromones)
        }
    }

    getFood(){
        if (this.quantity !== 0 && this.type === CellType.FOOD){
            this.quantity -= 0.05
        }
        if (this.quantity <= 0  && this.type === CellType.FOOD){
            this.pheromones = 0;
            this.quantity = 0;
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