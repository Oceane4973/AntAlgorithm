
class Canvas {
    constructor(id, width, height) {
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;

        this.context = this.canvas.getContext("2d");
    }

    generateMatrixBackground(){
        this.matrix = [
            

        ]
    }

    generateBackground(){

    }


}

export default Canvas;