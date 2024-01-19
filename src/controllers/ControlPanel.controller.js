class ControlPanel {

    constructor(engine = null){
        this.clicked = 0;
        this.btn = document.querySelector("#control");
        this.setupListener();
        this.play = false;
        this.engine = engine;
        this.begin = false;
        this.animation = null;
        this.loop = this.loop.bind(this);
    }

    setupListener(){
        this.btn.addEventListener('click', () => {
            this.clicked += 1;
            this.play = this.clicked % 2 === 0;
            this.refresh();
        })
    }

    refresh(){
        if(this.engine !== null && this.engine !== undefined){
            if(this.play){
                this.engine.switchMode();
                cancelAnimationFrame(this.animation);
            } else {
                if(this.begin){
                    this.loop();
                    this.begin = false;
                } else {
                    this.animation = requestAnimationFrame(this.loop);
                    this.engine.switchMode();
                }
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