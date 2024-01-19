import controlPanel from "./src/controllers/controlPanel.controller.js";
import Canvas from './src/controllers/Canvas.controller.js'

window.addEventListener('load', async function() {
    const control = new controlPanel();

    const screenHeight = window.innerHeight
    const canvasHeight = screenHeight * 0.9

    const canvasController = new Canvas("game", canvasHeight, canvasHeight)
    await canvasController.generateMap()
})
