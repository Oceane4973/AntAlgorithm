class StaticElementsModel{

    constructor(positionX = 0, positionY = 0, hasCollidingBox = false) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.hasCollindingBox = hasCollidingBox;
    }

    touch(element){
        //vérifier la collision avec l'object
    }

}

export default StaticElementsModel;