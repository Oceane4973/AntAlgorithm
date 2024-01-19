import Map from './Map.controllers.js'

class Canvas {
    constructor(id, width, height) {
        this.canvas = document.getElementById(id)
        this.canvas.width = width
        this.canvas.height = height

        this.context = this.canvas.getContext("2d")
        this.map = new Map(this.canvas)
    }
    
    async generateMap() {
        await this.map.generate()
    }
}

export default Canvas