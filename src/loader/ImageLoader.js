import { ImageData } from '../models/ImageData.model.js'

class ImageLoader {

    static instance = new ImageLoader()

    constructor() {
        if (!ImageLoader.instance) {
            ImageLoader.instance = this
            ImageLoader.instance.images = {
                FOOD : new ImageData("./src/resources/assets/foodAndColony.png",15, 0, 0.87),
                FLOOR : new ImageData("./src/resources/assets/grass.png",4),
                ANTHILL: new ImageData("./src/resources/assets/cellules.png",5, 0.4, 0.85),
                OBSTACLE : new ImageData("./src/resources/assets/foodAndColony.png",15, 0, 1.06),
                TREE : new ImageData("./src/resources/assets/tree.png",4, 0, 0.04 )
            };
        }
        return ImageLoader.instance;
    }

    async loadImages(){
        for (let key in this.images) {
            if (Object.prototype.hasOwnProperty.call(this.images, key)) {
                await ImageLoader.instance.images[key].initialize();
            }
        }
    }
}

export default ImageLoader;