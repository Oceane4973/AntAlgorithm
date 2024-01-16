import StaticElements from "./StaticElements.view.js";

class Ground extends StaticElements {

    constructor(context = null, url = "", positionX = 0, positionY = 0) {
        super(context, url, positionX, positionY);

    }

    loadImage() {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = "./src/resources/assets/grass.png";
        })
    }

    async display(canvas, x, y, cellSize) {
        const context = canvas.getContext('2d');
        const img = await this.loadImage();

        // Générer des coordonnées aléatoires pour la région
        const a = Math.floor(Math.random() * 100)%16;
        const b = Math.floor(Math.random() * 100)%16;

        // Dessiner la région extraite sur le canvas
        context.drawImage(img, a*16, b*16, cellSize, cellSize, x*cellSize, y*cellSize, a+16, b+16);
    }


}

export default Ground;