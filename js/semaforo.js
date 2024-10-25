"use strict";
class Semaforo{

    levels = [0.2, 0.5, 0.8];
    lights = 4;
    unload_moment = null;
    clic_moment = null;

    constructor(){
        this.difficulty = this.getRandomLevel();
    }

    getRandomLevel(){
        return this.levels[Math.floor(Math.random() * (3 - 0) + 0)]
    }

}