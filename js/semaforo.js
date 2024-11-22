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
        var reactionTime = "Reacción: " + (diff * 0.001).toFixed(3) + " s";
        var p = document.querySelector("body main p");
        p.textContent = reactionTime;
        const main = document.querySelector("body main");
        main.appendChild(p);
        main.classList.remove("load");
        main.classList.remove("unload");
        main.querySelector("button").disabled = false;
        main.querySelectorAll("button")[1].disabled = true;
    }

    createRecordForm(){
        const container = document.querySelector("body section");
        let form = "<form action='#' method='post' name='registro'>" 
                    + "<input type='text' name='name' value='Nombre'/>"
                    + "<input type='text' name='surname' value='Apellido'/>"
                    + "<input type='text' name='difficulty' value='Dificultad'/>"
                    + "<input type='text' name='time' value='Tiempo'/>"
                + "</form>";
        $(container).html($(container).html() + form);
    }

}