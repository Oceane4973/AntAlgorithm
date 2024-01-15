import ControlPanel from "./src/controllers/ControlPanel.controller.js";
import Canvas from './src/controllers/Canvas.controller.js'
import GameEngine from "./src/GameEngine.js";

window.addEventListener('load', function() {
    const els = [1,2,3,4];

    const engine = new GameEngine(els);
    const control = new ControlPanel(engine);

    const screenHeight = window.innerHeight
    const canvasHeight = screenHeight * 0.9

    const canvasController = new Canvas("game", screenHeight, canvasHeight)
    canvasController.generateMatrixBackground()
    canvasController.generateBackground()
});