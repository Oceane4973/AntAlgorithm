import Canvas from './src/controllers/Canvas.controller.js'

window.addEventListener('load', function() {
    const screenHeight = window.innerHeight
    const canvasHeight = screenHeight * 0.9

    const canvasController = new Canvas("game", screenHeight, canvasHeight)
    canvasController.generateMatrixBackground()
    canvasController.generateBackground()
})
