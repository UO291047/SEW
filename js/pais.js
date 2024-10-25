"use strict";
class Pais {
    constructor (nombre_pais, nombre_capital, poblacion){
        this.nombre_pais = nombre_pais;
        this.nombre_capital = nombre_capital;
        this.poblacion = poblacion;
    }
    
    rellenarAtributosSecundarios(tipo_gobierno, nombre_circuito, coords_meta, religion){
        this.tipo_gobierno = tipo_gobierno;
        this.nombre_circuito = nombre_circuito;
        this.coords_meta = coords_meta;
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

    getNombreCircuito(){
        return this.nombre_circuito;
    }

    getReligion(){
        return this.religion;
    }

    getCoords(){
        return this.coords_meta;
    }

    getExtraInfo(){
        return "<ul>" +
                    "<li>" + "Población: " + this.poblacion + "</li>" +
                    "<li>" + "Tipo de gobierno: " + this.tipo_gobierno + "</li>" +
                    "<li>" + "Religión mayoritaria: " + this.religion + "</li>" +
                    "<li>" + "Nombre del circuito: " + this.nombre_circuito + "</li>" +
                "</ul>"
    }

    printCoords(){
        document.write("<p>" + "Coordenadas del circuito: [" + this.coords_meta + "]" + "</p>");
    }
}