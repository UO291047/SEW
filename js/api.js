class Api {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.colorPicker = document.querySelector("label:first-of-type > input");
        this.lineWidthInput = document.querySelector("label:last-of-type > input");
        this.isDrawing = false;

        this.init();
    }

    init() {
        // Asignar eventos de ratón
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Asignar eventos táctiles
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevenir desplazamiento de la página
            this.startDrawing(e);
        });
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevenir desplazamiento de la página
            this.draw(e);
        });
        this.canvas.addEventListener('touchend', () => this.stopDrawing());
        this.canvas.addEventListener('touchcancel', () => this.stopDrawing());

        // Botones de funcionalidad
        document.querySelector("button:nth-of-type(1)").addEventListener('click', () => this.clearCanvas());
        document.querySelector("button:nth-of-type(2)").addEventListener('click', () => this.copyCanvas());
        document.querySelector("button:nth-of-type(3)").addEventListener('click', () => this.pasteCanvas());
        document.querySelector("button:nth-of-type(4)").addEventListener('click', () => this.saveCanvas());
        document.querySelector("button:nth-of-type(5)").addEventListener('click', () => this.loadCanvas());
    }

    // Obtener posición relativa en táctiles y ratón
    getPosition(event) {
        if (event.touches) {
            const touch = event.touches[0];
            return { x: touch.clientX - this.canvas.offsetLeft, y: touch.clientY - this.canvas.offsetTop };
        } else {
            return { x: event.offsetX, y: event.offsetY };
        }
    }

    startDrawing(e) {
        this.isDrawing = true;
        const pos = this.getPosition(e);
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
    }

    draw(e) {
        if (!this.isDrawing) return;
        const pos = this.getPosition(e);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.lineWidth = this.lineWidthInput.value;
        this.ctx.strokeStyle = this.colorPicker.value;
        this.ctx.stroke();
    }

    stopDrawing() {
        this.isDrawing = false;
        this.ctx.closePath();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    copyCanvas() {
        this.canvas.toBlob(async (blob) => {
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        });
    }

    pasteCanvas() {
        navigator.clipboard.read().then((items) => {
            for (const item of items) {
                for (const type of item.types) {
                    if (type.startsWith('image/')) {
                        item.getType(type).then((blob) => {
                            const img = new Image();
                            img.onload = () => this.ctx.drawImage(img, 0, 0);
                            img.src = URL.createObjectURL(blob);
                        });
                    }
                }
            }
        });
    }

    saveCanvas() {
        const imageData = this.canvas.toDataURL();
        localStorage.setItem('canvasDrawing', imageData);
    }

    loadCanvas() {
        const imageData = localStorage.getItem('canvasDrawing');
        if (imageData) {
            const img = new Image();
            img.onload = () => this.ctx.drawImage(img, 0, 0);
            img.src = imageData;
        }
    }
}
