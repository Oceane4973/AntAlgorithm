import controlPanel from "./src/controllers/controlPanel.controller.js";
import Canvas from './src/controllers/Canvas.controller.js'
import GameEngine from "./src/GameEngine.js";

const els = [1,2,3,4];
const engine = new GameEngine(els);

let first = true;

const control = new controlPanel(() => {
    if(control.play){
        cancelAnimationFrame(animation);

    } else {
        if(first){
            start();
            first = false;
        } else
            animation = requestAnimationFrame(start);
    }
});

window.addEventListener('load', function() {
    const control = new controlPanel();

    const screenHeight = window.innerHeight
    const canvasHeight = screenHeight * 0.9

    const canvasController = new Canvas("game", screenHeight, canvasHeight)
    canvasController.generateMatrixBackground()
    canvasController.generateBackground()
})

let animation = null;

function start() {
    engine.update();
    animation = requestAnimationFrame(start);
}
