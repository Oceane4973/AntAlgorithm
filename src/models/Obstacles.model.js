import StaticElementsModel from "./StaticElementsModel.model";

class ObstaclesModel extends StaticElementsModel{

    constructor(canva = null, positionX = 0, positionY = 0) {
        super(canva , positionX, positionY, true);
    }

}

export default ObstaclesModel;