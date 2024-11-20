class CanvasDrawing {
    constructor() {
        this.canvas = document.getElementById('drawingCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.colorPicker = document.getElementById('colorPicker');
        this.lineWidthInput = document.getElementById('lineWidth');
        this.isDrawing = false;

        this.init();
    }

    init() {
        // Configurar eventos de dibujo
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Botones de funcionalidad
        document.getElementById('clearCanvas').addEventListener('click', () => this.clearCanvas());
        document.getElementById('copyCanvas').addEventListener('click', () => this.copyCanvas());
        document.getElementById('pasteCanvas').addEventListener('click', () => this.pasteCanvas());
        document.getElementById('saveCanvas').addEventListener('click', () => this.saveCanvas());
        document.getElementById('loadCanvas').addEventListener('click', () => this.loadCanvas());
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.offsetX, e.offsetY);
    }

    draw(e) {
        if (!this.isDrawing) return;
        this.ctx.lineWidth = this.lineWidthInput.value;
        this.ctx.strokeStyle = this.colorPicker.value;
        this.ctx.lineTo(e.offsetX, e.offsetY);
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
            alert('Canvas copiado al portapapeles.');
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
        alert('Dibujo guardado en el almacenamiento local.');
    }

    loadCanvas() {
        const imageData = localStorage.getItem('canvasDrawing');
        if (imageData) {
            const img = new Image();
            img.onload = () => this.ctx.drawImage(img, 0, 0);
            img.src = imageData;
        } else {
            alert('No hay dibujo guardado.');
        }
    }
}

// Inicializar la funcionalidad cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => new CanvasDrawing());
