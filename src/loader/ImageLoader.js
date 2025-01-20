import { ImageData } from './ImageData.js'

class ImageLoader {

    static instance = new ImageLoader()

    constructor() {
        if (!ImageLoader.instance) {
            ImageLoader.instance = this
            ImageLoader.instance.images = {
                FOOD : new ImageData("./src/resources/assets/foodAndColony.png",15, 0, 0.882, 1.1),
                FLOOR : new ImageData("./src/resources/assets/grass.png",4 ),
                ANTHILL: new ImageData("./src/resources/assets/cellules.png",5, 0.4, 0.73, 0.6),
                OBSTACLE : new ImageData("./src/resources/assets/foodAndColony.png",15, 0, 1.06, 1),
                TREE : new ImageData("./src/resources/assets/tree.png",4, 0.03, 0.04 ),
                ANT : new ImageData("./src/resources/assets/ant.png", 1, 0, 0, 0.5)
            };
        }
        return ImageLoader.instance;
    }

    async loadImages(){
        for (let key in ImageLoader.instance.images) {
            if (Object.prototype.hasOwnProperty.call(ImageLoader.instance.images, key)) {
                await ImageLoader.instance.images[key].initialize();
            }
        }
    }
}

export default ImageLoader;
