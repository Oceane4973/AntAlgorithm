
class Cell {
    constructor() {
        this.src = "./src/assets/ant.png"
    }

    loadImage() {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = this.src
        })
    }

    async display(canvas, x, y, cellSize) {
        const context = canvas.getContext('2d')
        const img = await this.loadImage()
        context.drawImage(img, x * cellSize, y * cellSize, cellSize, cellSize)
    }
}

export default Cell