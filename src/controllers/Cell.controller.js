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

        if (this.model.type !== CellType.OBSTACLE && this.model.type !== CellType.TREE) {
            this.view.draw_pheromone(context, x, y, cellSize, this.model.pheromones, this.model.maxPheromones);
            this.model.evaporate()
        }
    }

    placeRandom(){
        this.map.placeRandomElement(CellType.FOOD, 1);
        this.sound.play();
    }
}

export default Cell;
