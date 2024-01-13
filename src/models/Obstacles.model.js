import StaticElementsModel from "./StaticElementsModel.model";

class ObstaclesModel extends StaticElementsModel{

    constructor(map = null, positionX = 0, positionY = 0) {
        super(map , positionX, positionY, true);
    }

}

export default ObstaclesModel;