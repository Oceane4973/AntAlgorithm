class controlPanel {

    constructor(){
        this.clicked = 0;
        this.btn = document.querySelector("#control");
        this.setupListener();
        console.log("here");
    }

    setupListener(){
        this.btn.addEventListener('click', () => {
            this.clicked += 1;
            this.refresh();
        })
    }

    refresh(){
        this.btn.textContent = this.clicked % 2 === 0 ? "Start" : "Pause";
    }
}

export default controlPanel;