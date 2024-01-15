class controlPanel {

    constructor(){
        this.clicked = 0;
        this.btn = document.querySelector("#control");
        this.setupListener();
        this.play = false;
    }

    setupListener(){
        this.btn.addEventListener('click', () => {
            this.clicked += 1;
            this.play = this.clicked % 2 === 0;
            this.refresh();
        })
    }

    refresh(){
        this.btn.textContent = this.play ? "Start" : "Pause";
    }
}

export default controlPanel;