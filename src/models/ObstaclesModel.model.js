import StaticElementsModel from "./StaticElementsModel.model";

class ObstaclesModelModel extends StaticElementsModel{

    constructor(canva = null, positionX = 0, positionY = 0) {
        super(canva , positionX, positionY, true);
    }

}

export default ObstaclesModelModel;