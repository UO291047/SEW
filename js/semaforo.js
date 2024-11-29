"use strict";
class Semaforo{

    levels = [0.2, 0.5, 0.8];
    lights = 4;
    unload_moment = null;
    clic_moment = null;

    constructor(){
        this.difficulty = this.getRandomLevel();
        this.createStructure();
    }

    getRandomLevel(){
        return this.levels[Math.floor(Math.random() * (3 - 0) + 0)]
    }

    createStructure(){
        const container = document.querySelector("body main");
        const title = document.createElement("h2");
        title.textContent = "Juego Semáforo";
        container.appendChild(title);

        var div;
        for(var i=0; i<this.lights; i++){
            div = document.createElement("div");
            container.appendChild(div)
        }

        const btStart = document.createElement("button");
        btStart.textContent = "Arranque";
        btStart.addEventListener("click", () => this.initSecuence());
        const btStop = document.createElement("button");
        btStop.textContent = "Reacción";
        btStop.disabled = true;
        btStop.addEventListener("click", () => this.stopReaction());
        container.appendChild(btStart);
        container.appendChild(btStop);

        const p = document.createElement("p");
        container.appendChild(p);
    }

    initSecuence(){
        this.difficulty = this.getRandomLevel();
        const main = document.querySelector("body main");
        main.classList.add("load");
        main.querySelector("button").disabled = true;
        setTimeout(() => {
            this.unload_moment = new Date().getTime();
            this.endSecuence();
        }, 1500 + this.difficulty * 1000);
    }

    endSecuence(){
        const main = document.querySelector("body main");
        main.classList.remove("load");
        main.classList.add("unload");
        main.querySelectorAll("button")[1].disabled = false;
    }

    stopReaction(){
        this.clic_moment = new Date().getTime();
        const diff = this.clic_moment - this.unload_moment;
        this.reactionTime = (diff * 0.001).toFixed(3);
        let reaction = "Reacción: " + this.reactionTime + " s";
        let p = document.querySelector("body main p");
        p.textContent = reaction;
        const main = document.querySelector("body main");
        main.appendChild(p);
        main.classList.remove("load");
        main.classList.remove("unload");
        main.querySelector("button").disabled = false;
        main.querySelectorAll("button")[1].disabled = true;
        this.createRecordForm();
    }

    createRecordForm(){
        const container = document.querySelector("body section");
        let registrar = "<h3>Registrar</h3>"
        let form = "<form action='#' method='post' name='registro'>"
                    + "<label>Nombre: <input type='text' name='name'/></label>"
                    + "<label>Apellido: <input type='text' name='surname'/></label>"
                    + "<label>Nivel: <input readonly type='text' name='level' value=" + this.getLevel() + " /></label>"
                    + "<label>Tiempo: <input readonly type='text' name='time' value=" + this.reactionTime + " /></label>"
                    + "<input type='submit' name='enviar' value='Enviar'/>"
                + "</form>";
        $(container).html(registrar + form);
    }

    getLevel(){
        if(this.difficulty == this.levels[0]){
            return 'Dificil';
        }else if(this.difficulty == this.levels[1]){
            return 'Medio';
        }else{
            return 'Facil';
        }
    }

}