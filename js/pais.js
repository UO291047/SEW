
"use strict";
class Pais {
    constructor (nombre_pais, nombre_capital, poblacion){
        this.nombre_pais = nombre_pais;
        this.nombre_capital = nombre_capital;
        this.poblacion = poblacion;
    }
    
    rellenarAtributosSecundarios(tipo_gobierno, coords_capital, religion){
        this.tipo_gobierno = tipo_gobierno;
        this.coords_capital = coords_capital;
        this.religion = religion;
    }

    getNombrePais(){
        return this.nombre_pais;
    }

    getNombreCapital(){
        return this.nombre_capital;
    }

    getPoblacion(){
        return this.poblacion;
    }

    getTipoGobierno(){
        return this.tipo_gobierno;
    }

    getReligion(){
        return this.religion;
    }

    getExtraInfo(){
        return "<ul>" +
                    "<li>" + "Población: " + this.poblacion + "</li>" +
                    "<li>" + "Tipo de gobierno: " + this.tipo_gobierno + "</li>" +
                    "<li>" + "Religión mayoritaria: " + this.religion + "</li>" +
                "</ul>"
    }

    printCoords(){
        document.write("<p>" + "Coordenadas de la capital: [" + this.coords_capital + "]" + "</p>");
    }

}
