import Cell from './Cell.model.js'

class ObstaclesModelModel extends Cell {

    constructor(canva = null, positionX = 0, positionY = 0) {
        super(canva , positionX, positionY, true);
    }

}

export default ObstaclesModelModel;