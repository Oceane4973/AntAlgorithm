import ControlPanel from "./src/controllers/ControlPanel.controller.js";
import Canvas from './src/controllers/Canvas.controller.js'
import GameEngine from "./src/GameEngine.js";

window.addEventListener('load', async () => {
    const screenHeight = window.innerHeight
    const canvasHeight = screenHeight * 0.9

    const canvasController = new Canvas("game", canvasHeight, canvasHeight)
    // Exposer le canvasController globalement pour les tests
    window.canvasController = canvasController;
    
    await canvasController.generateMap()

    const engine = new GameEngine(canvasController);
    // Exposer le GameEngine globalement pour les tests
    window.gameEngine = engine;
    
    new ControlPanel("#control", "#pheromones", engine);
})

// quantité maximal sur une cellule / quantité max de la cellule la plus haute historiquement
