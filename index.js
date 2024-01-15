import controlPanel from "./src/controllers/controlPanel.controller.js";
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

let animation = null;

function start() {
    engine.update();
    animation = requestAnimationFrame(start);
}
