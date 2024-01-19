import Map from './Map.controller.js'
import Ants from './Ants.controller.js'

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
        this.ants = new Ants(this.canvas, this.map)
    }

    async refresh(){
        //map
        await this.map.refresh()

        //ants
        await this.ants.refresh()
    }
}

export default Canvas