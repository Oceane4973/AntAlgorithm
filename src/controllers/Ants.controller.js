import Ant from '../models/Ant.model.js'

class Ants {

    constructor(canvas = null, map = null) {
        this.canvas = canvas
        this.map = map
        const number_ant = 1
        this.ants =  Array.from({ length: number_ant }, () => new Ant(canvas, map));
    }

    async refresh(){
        for (let ant of this.ants){
            ant.display()
        }
    }
}

export default Ants