class Crucigrama{

    rows = 11;
    columns = 9;
    board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
    init_time;
    end_time;
    tablero;

    constructor(){
        this.tablero = [];
        this.start();
    }

    paintMathword(){
        this.createStructure();
        this.init_time = Date.now();
    }

    createStructure(){
        const mainElement = document.querySelector("main.crucigrama-container");

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const cell = document.createElement("p");
                if(this.tablero[i][j] === 0){
                    cell.dataset.state = "init";
                    cell.textContent = "";
                    cell.addEventListener("click", () => this.handleCellClick(cell));
                }else if(this.tablero[i][j] === -1){
                    cell.dataset.state = "empty";
                    cell.textContent = "";
                }else{
                    cell.dataset.state = "blocked";
                    cell.textContent = this.tablero[i][j];
                }
                
                cell.dataset.row = i;
                cell.dataset.column = j;

                mainElement.appendChild(cell);
            }
        }
    }

    start() {
        const values = this.board.split(",");
        var i = 0;

        for (var r = 0; r < this.rows; r++) {
            var inicio = r * this.columns;
            var fin = inicio + this.columns;
            var fila = [];
            for (var c = 0; c < this.columns; c++) {
                var value = values[i];
                if (isNaN(parseInt(value))) {
                    if(value === "."){
                        value = 0;
                    }
                    else if(value === "#"){
                        value = -1;
                    }else{
                        value = values[i];
                    }
                }
                fila.push(value);
                i++;
            }
            this.tablero.push(fila);
        }

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleCellClick(cell) {
        // Manejar el evento de clic en una celda
        cell.dataset.state = "clicked";
        const row = parseInt(cell.dataset.row);
        const column = parseInt(cell.dataset.column);

        // Actualiza la celda seleccionada
        this.selectedCell = { row, column };
    }

    handleKeyDown(event) {
        console.log('Tecla pulsada:', event.keyCode);
        // Verifica si hay una celda seleccionada
        if (!this.selectedCell) {
            alert('Selecciona una celda antes de pulsar un número.');
            return;
        }
    
        // Obtiene el código de la tecla pulsada
        const keyCode = event.keyCode;
    
        // Verifica si la tecla pulsada es un número (códigos de teclas numéricas de 1 a 9)
        if (keyCode >= 49 && keyCode <= 57) {
            // Obtiene el número de la tecla pulsada
            const number = keyCode - 48;
    
            // Llama al método introduceNumber con el número obtenido
            this.introduceNumber(number);
        }else if (keyCode === 8) {
            // Si la tecla pulsada es Backspace, llama al método introduceNumber con el valor 0
            this.introduceNumber(0);
        }
    }

    introduceNumber(number) {

        const { row, column } = this.selectedCell;

        const selectedCellElement = document.querySelector(`[data-row='${row}'][data-column='${column}']`);

        if(number === 0){
            this.tablero[row][column] = number;
            selectedCellElement.dataset.state = 'clicked';
            selectedCellElement.textContent = "";
            return;
        }

        // Comprobar si el número es válido en la fila
        const isNumberValidInRow = !this.tablero[row].includes(number);

        // Comprobar si el número es válido en la columna
        const isNumberValidInColumn = !this.tablero.map(row => row[column]).includes(number);

        // Comprobar si el número es válido en la sub-cuadrícula 3x3
        const subgridStartRow = Math.floor(row / 3) * 3;
        const subgridStartColumn = Math.floor(column / 3) * 3;
        const isNumberValidInSubgrid = this.isNumberInSubgrid(subgridStartRow, subgridStartColumn, number);

        // Si el número es válido, realizar acciones necesarias
        if (isNumberValidInRow && isNumberValidInColumn && isNumberValidInSubgrid) {

            this.tablero[row][column] = number;
            selectedCellElement.dataset.state = 'correct';
            selectedCellElement.textContent = number;

            // Comprobar si ya están rellenas todas las cuadrículas del sudoku
            if (this.isSudokuCompleted()) {
                alert('¡Sudoku completado!');
                return;
            }
        } else {
            alert('Número no válido para la casilla seleccionada.');
        }
    }
    
}