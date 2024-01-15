class GameEngine{

    constructor(elements) {
        this.timeStart = Date.now();
        this.lag = 0;
        this.fps = 60;
        this.frameDuration = 1000 / this.fps;
        this.position = {x: 0, y:0};
        this.cellSize = 100;
        this.speed = 1;
        this.direction = 0;
        this.timer = 0;
        this.elements = elements;
    }

    update(){
        let currentTime = Date.now();
        let deltaTime   = currentTime - this.timeStart;
        this.lag += deltaTime;
        this.timeStart = currentTime;
        this.timer += deltaTime;

        while (this.lag >= this.frameDuration) {
            this.elements.forEach(element => {
                element.controller.move(this.frameDuration);
                element.view.display();
            })
            // this.move(this.frameDuration);
            // this.display();
            this.lag -= this.frameDuration;
        }

        if (this.position.x < 1) {
            requestAnimationFrame(this.update);
        }
    }

}