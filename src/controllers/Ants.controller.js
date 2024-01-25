import Ant from '../models/Ant.model.js'

class Ants {

    constructor(canvas = null, map = null) {
        this.canvas = canvas
        this.map = map
        this.maxAnts = 30
        this.ants = [new Ant(canvas, map)]
    }

    async refresh(timer){
        if (Math.random() <= 0.02 && this.ants.length < this.maxAnts && timer != null){
            this.ants.push(new Ant(this.canvas, this.map))
        }
        for (let ant of this.ants){
            ant.display(!(timer==null))
        }
    }
}

export default Ants