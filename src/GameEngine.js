class GameEngine{

    constructor(canvasController) {
        this.timeStart = Date.now();
        this.lag = 0;
        this.fps = 60;
        this.frameDuration = 1000 / this.fps;
        this.position = {x: 0, y:0};
        this.cellSize = 100;
        this.speed = 1;
        this.direction = 0;
        this.timer = 0;
        this.canvasController = canvasController;
        this.update = this.update.bind(this);
    }

    async moveAndDisplayAsync(element) {
        //await element.controller.move(this.frameDuration);
        //await element.view.display();
    }

    async update(){
        let currentTime = Date.now();
        console.log(this)
        let deltaTime   = currentTime - this.timeStart;
        this.lag += deltaTime;
        this.timeStart = currentTime;
        this.timer += deltaTime;

        while (this.lag >= this.frameDuration) {
            this.canvasController.refresh()
            // this.elements.forEach(element => {
            //     element.controller.move(this.frameDuration);
            //     element.view.display();
            // })
            // const moveAndDisplayPromises = this.elements.map(element => this.moveAndDisplayAsync(element));
            // await Promise.all(moveAndDisplayPromises);
            // this.move(this.frameDuration);
            // this.display();
            this.lag -= this.frameDuration;
        }

        // if (this.position.x < 1) {
        //     requestAnimationFrame(this.update);
        // }
    }

}

export default GameEngine;