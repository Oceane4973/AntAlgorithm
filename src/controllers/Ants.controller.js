import {default as AntM} from '../models/Ant.model.js';
import {default as AntV} from '../views/Ant.view.js';

class Ants {

    constructor(canvas = null, map = null) {
        this.canvas = canvas
        this.map = map
        this.maxAnts = 30
        this.ants = [{model: new AntM(canvas, map), view: new AntV(canvas, map.cellSize)}];
    }

    async refresh(timer){
        if (Math.random() <= 0.02 && this.ants.length < this.maxAnts && timer != null){
            this.ants.push({model: new AntM(this.canvas, this.map), view: new AntV(this.canvas, this.map.cellSize)})
        }
        for (let ant of this.ants){
            if(!(timer==null))
                ant.model._move();
            ant.view.display(ant.model.xAnt, ant.model.yAnt, ant.model.angle);
        }
    }
}

export default Ants
