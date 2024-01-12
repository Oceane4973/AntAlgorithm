class StaticElementsModel{

    constructor(map = null, positionX = 0, positionY = 0, hasCollidingBox = false) {
        this.map = map;
        this.positionX = positionX;
        this.positionY = positionY;
        this.hasCollidingBox = hasCollidingBox;
    }

}

export default StaticElementsModel;