import StaticElementsModel from "./StaticElementsModel.model";

class Food extends StaticElementsModel{

    constructor(canva = null, positionX = 0, positionY = 0) {
        super(canva , positionX, positionY, false);
    }

}

export default Food;