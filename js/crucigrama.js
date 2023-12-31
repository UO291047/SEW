class Crucigrama{

    rows = 11;
    columns = 9;
    board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
    board_facil = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
    board_medio = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32"
    board_dificil = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72"
    init_time;
    end_time;
    tablero;

    constructor(){
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init(diff){
        if(diff === "facil"){
            this.board = this.board_facil;
        }else if(diff === "medio"){
            this.board = this.board_medio;
        }else{
            this.board = this.board_dificil;
        }
        this.tablero = [];
        this.start();
        this.paintMathword();
    }

    paintMathword(){
        this.createStructure();
        this.init_time = Date.now();
    }

    createStructure(){
        const mainElement = document.querySelector("main.crucigrama-container");
        //Limpiamos el main por si ya tenía algo
        while(mainElement.firstChild){
            mainElement.removeChild(mainElement.firstChild);
        }
        
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
        var element = 0;
    
        // Verifica si la tecla pulsada es un número (códigos de teclas numéricas de 1 a 9)
        if (keyCode >= 49 && keyCode <= 57) {
            // Obtiene el número de la tecla pulsada
            element = keyCode - 48;
    
            // Llama al método introduceNumber con el número obtenido
            this.introduceElement(element);
            return;
        }// Si la tecla pulsada es Backspace, llama al método introduceNumber con el valor 0
        else if (keyCode === 8) {
            element = 0;
            this.introduceElement(element);
            return;
        }

        //Operadores aritmeticos
        if(keyCode === 111 || keyCode === 191){ // /
            element = "/"
            this.introduceElement(element);
        }else if(keyCode === 106 || (keyCode === 56 && event.shiftKey)){ // *
            element = "*";
            this.introduceElement(element);
        }else if(keyCode === 109 || keyCode === 189){ // -
            element = "-";
            this.introduceElement(element);
        }else if(keyCode === 107 || keyCode === 187){ // +
            element = "+";
            this.introduceElement(element);
        }

    }

    introduceElement(element) {

        const { row, column } = this.selectedCell;
        const selectedCellElement = document.querySelector(`[data-row='${row}'][data-column='${column}']`);

        var expression_row = true;
        var expression_col = true;

        this.tablero[row][column] = element;

        if(element === 0){
            selectedCellElement.dataset.state = 'init';
            selectedCellElement.textContent = "";
            return;
        }

        expression_row = this.validRow(this.selectedCell);
        expression_col = this.validCol(this.selectedCell);

        // Si el número es válido, realizar acciones necesarias
        if (expression_row && expression_col) {

            selectedCellElement.dataset.state = 'correct';
            selectedCellElement.textContent = element;

            // Comprobar si ya están rellenas todas las cuadrículas del sudoku
            if (this.check_win_condition()) {
                this.end_time = Date.now();
                const tiempo = this.calculate_date_difference();
                alert('¡Crucigrama completado! \n Has tardado: ' + tiempo);
                return;
            }
        } else {
            this.tablero[row][column] = 0;
            selectedCellElement.dataset.state = 'init';
            alert('Número no válido para la casilla seleccionada.');
        }
    }

    validRow(cell){
        var {row, column} = cell;

        if(column + 1 >= this.columns || this.tablero[row][column+1] == -1){
            return true;
        }

        for(var i=1; i<this.columns; i++){
            if(this.tablero[row][column+i] === "="){
                column = column + i;
                break;
            }
        }

        var first_number = this.tablero[row][column - 3];
        var second_number = this.tablero[row][column - 1];
        var expression = this.tablero[row][column - 2];
        var result = this.tablero[row][column + 1];

        if(first_number != 0 && second_number != 0 && expression != 0 && result != 0){
            var expr = [first_number, expression, second_number].join("");
            var res = eval(expr);
            if(res != result){
                return false;
            }
        }

        return true;
 
    }

    validCol(cell){
        var {row, column} = cell;

        if(row + 1 >= this.rows || this.tablero[row+1][column] == -1){
            return true;
        }

        for(var i=1; i<this.rows; i++){
            if(this.tablero[row+i][column] === "="){
                row = row + i;
                break;
            }
        }

        var first_number = this.tablero[row - 3][column];
        var second_number = this.tablero[row - 1][column];
        var expression = this.tablero[row - 2][column];
        var result = this.tablero[row + 1][column];

        if(first_number != 0 && second_number != 0 && expression != 0 && result != 0){
            var expr = [first_number, expression, second_number].join("");
            var res = eval(expr);
            if(res != result){
                return false;
            }
        }

        return true;
 
    }

    check_win_condition() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                if (this.tablero[r][c] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    calculate_date_difference(){
        const diff = (this.end_time - this.init_time) * 1000;
        var horas, minutos, segundos = 0;
        horas = (diff/(60*60)) > 0 ? 0 : Math.trunc(diff/(60*60));
        minutos = ((diff/60) - horas*60) > 0 ? 0 : Math.trunc((diff/60) - horas*60);
        segundos = diff%60;

        return horas + ":" + minutos + ":" + segundos;
    }
    
}