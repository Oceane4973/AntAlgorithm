import { CellType } from '../models/Cell.model.js';

class Cell{

    constructor(model = null, view = null, map = null) {
        this.model = model;
        this.view = view;
        this.map = map;
        this.sound = document.createElement("audio");
        this.sound.src = "src/resources/sounds/pop.mp3";
    }

    display(canvas, x, y, cellSize) {
        const context = canvas.getContext('2d')
        this.view.draw_default_grass(context, x, y, cellSize)

        if (this.model.type !== CellType.FLOOR){
            this.view.draw_image(context, x, y, cellSize)
        }

        if (this.model.type !== CellType.OBSTACLE && this.model.type !== CellType.TREE && this.model.type !== CellType.FOOD /*&& this.model.pheromones > 0.01*/) {
            this.view.draw_pheromone(context, x, y, cellSize, this.model.pheromones, this.model.maxPheromones);
            this.model.evaporate()
        }

        if (this.model.type == CellType.FOOD && this.model.quantity > 0) {
            this.view.draw_pheromone(context, x, y, cellSize, this.model.quantity, this.model.maxPheromones, `rgb(0, 0, 0)`);
        }
    }

    placeRandom(){
        this.map.placeRandomElement(CellType.FOOD, 1);
        this.sound.play();
    }
}

export default Cell;
