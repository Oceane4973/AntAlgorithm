class StaticElementsModel {

    constructor(canva = null, positionX = 0, positionY = 0, hasCollidingBox = false) {
        this.canva = canva;
        this.positionX = positionX;
        this.positionY = positionY;
        this.hasCollidingBox = hasCollidingBox;
    }

}

export default StaticElementsModel;