import StaticElements from "./StaticElements.model";

class Obstacles extends StaticElements {

    constructor(canva = null, positionX = 0, positionY = 0) {
        super(canva , positionX, positionY, true);
    }

}

export default Obstacles;