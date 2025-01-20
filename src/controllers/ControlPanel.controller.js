class ControlPanel {

    constructor(id_start, id_pheromones, engine = null){
        this.clicked = 0;
        this.btn = document.querySelector(id_start);
        this.pheromones = document.querySelector(id_pheromones);
        this.displayPheromones = false
        this.setupListener();
        this.play = false;
        this.engine = engine;
        this.animation = null;
        this.loop = this.loop.bind(this);
    }

    setupListener(){
        this.btn.addEventListener('click', () => {
            this.clicked += 1;
            this.play = this.clicked % 2 === 0;
            this.refresh();
        })
        this.pheromones.addEventListener('click', () => {
            this.displayPheromones = !this.displayPheromones
            this.engine.updatePheromonesView(this.displayPheromones)
        })

    }

    refresh(){
        if(this.engine !== null && this.engine !== undefined){
            if(this.play){
                this.engine.switchMode();
                cancelAnimationFrame(this.animation);
            } else {
                this.engine.switchMode();
                this.animation = requestAnimationFrame(this.loop);
            }
        }
        this.btn.textContent = this.play ? "Start" : "Pause";
    }

    loop(){
        this.engine.update();
        this.animation = requestAnimationFrame(this.loop);
    }
}

export default ControlPanel;
