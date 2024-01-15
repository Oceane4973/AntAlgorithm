import controlPanel from "./src/controllers/controlPanel.controller.js";
import GameEngine from "./src/GameEngine.js";

const control = new controlPanel();

const els = [1,2,3,4];
const engine = new GameEngine(els);

function start() {
    engine.update();
    requestAnimationFrame(start);
}

start();