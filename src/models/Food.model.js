import StaticElements from "./StaticElements.model";

class Food extends StaticElements {

    constructor(canva = null, positionX = 0, positionY = 0) {
        super(canva , positionX, positionY, false);
    }

}

export default Food;