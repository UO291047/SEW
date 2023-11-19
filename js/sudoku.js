class Sudoku{

    rows = 9;
    columns = 9;
    board = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
    tablero = [];
    selectedCell = null;

    constructor() {
        this.start();
        this.paintSudoku();
    }

    start() {
        for (var r = 0; r < this.rows; r++) {
            var inicio = r * this.columns;
            var fin = inicio + this.columns;
            var fila = [];
            for (var c = 0; c < this.columns; c++) {
                var value = parseInt(this.board.substring(inicio, fin)[c]);
                if (isNaN(value)) {
                    value = 0;
                }
                fila.push(value);
            }
            this.tablero.push(fila);
        }

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    createStructure(){
        const mainElement = document.querySelector("main.sudoku-container");

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const cell = document.createElement("p");
                cell.dataset.state = this.tablero[i][j] === 0 ? "init" : "blocked";
                cell.dataset.row = i;
                cell.dataset.column = j;
                cell.textContent = this.tablero[i][j] === 0 ? "" : this.tablero[i][j];

                if (this.tablero[i][j] === 0) {
                    cell.addEventListener("click", () => this.handleCellClick(cell));
                }

                mainElement.appendChild(cell);
            }
        }
    }

    paintSudoku(){
        this.createStructure();
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

    isNumberInSubgrid(startRow, startColumn, number) {
        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startColumn; c < startColumn + 3; c++) {
                if (this.tablero[r][c] === number) {
                    return false;
                }
            }
        }
        return true;
    }

    isSudokuCompleted() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                if (this.tablero[r][c] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

}