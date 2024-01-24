import ControlPanel from "./src/controllers/ControlPanel.controller.js";
import Canvas from './src/controllers/Canvas.controller.js'
import GameEngine from "./src/GameEngine.js";


window.addEventListener('load', async function() {

    const screenHeight = window.innerHeight
    const canvasHeight = screenHeight * 0.9

    const canvasController = new Canvas("game", canvasHeight, canvasHeight)
    await canvasController.generateMap()

    const engine = new GameEngine(canvasController);
    const control = new ControlPanel("#control", "#pheromones", engine);
})
