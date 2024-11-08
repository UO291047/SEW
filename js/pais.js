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
                    "<li>" + "Población: " + this.getPoblacion() + "</li>" +
                    "<li>" + "Tipo de gobierno: " + this.getTipoGobierno() + "</li>" +
                    "<li>" + "Religión mayoritaria: " + this.getReligion() + "</li>" +
                    "<li>" + "Nombre del circuito: " + this.getNombreCircuito() + "</li>" +
                "</ul>"
    }

    printCoords(){
        document.write("<p>" + "Coordenadas del circuito: [" + this.getCoords() + "]" + "</p>");
    }

    crearElemento(tipoElemento, texto, insertarAntesDe){
        // Crea un nuevo elemento modificando el árbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }

    cargarDatos(){
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                
                var stringDatos = "";
                var h4 = "";
                var ul = "";
                var article = "";
                var temperaturaMin = 100;
                var temperaturaMax = -100;

                //Extracción de los datos contenidos en el XML
                $('time',datos).each(function(i){
                    i += 1;

                    //Temperaturas maxima y minima
                    var newTemperaturaMin = $('time:nth-of-type('+ i +') > temperature',datos).attr("min");
                    if(newTemperaturaMin < temperaturaMin){
                        temperaturaMin = newTemperaturaMin;
                    }
                    var newTemperaturaMax = $('time:nth-of-type('+ i +') > temperature',datos).attr("max");
                    if(newTemperaturaMax > temperaturaMax){
                        temperaturaMax = newTemperaturaMax;
                    }

                    //La respuesta de la API da el tiempo cada 3 horas, es decir, 8 veces al dia
                    if(i%8 == 0){
                        var dia                   = $('time:nth-of-type('+ i +')',datos).attr("from").split("T")[0];
                        var temperatura           = $('time:nth-of-type('+ i +') > temperature',datos).attr("value");
                        var humedad               = $('time:nth-of-type('+ i +') > humidity',datos).attr("value");
                        var precipitacionValue    = $('time:nth-of-type('+ i +') > precipitation',datos).attr("value");
                        var icono                 = $('time:nth-of-type('+ i +') > symbol', datos).attr("var");
                        var iconoDesc             = $('time:nth-of-type('+ i +') > symbol', datos).attr("name");
                        
                        stringDatos =  "<p>Temperatura: " + temperatura + " ºC</p>";
                            stringDatos += "<p>Temperatura mínima: " + temperaturaMin + " ºC</p>";
                            stringDatos += "<p>Temperatura máxima: " + temperaturaMax + " ºC</p>";
                            stringDatos += "<p>Humedad: " + humedad + " % </p>";
                            stringDatos += "<p>Precipitación: " + precipitacionValue + "</p>";
                            stringDatos += "<p> <img src=https://openweathermap.org/img/wn/" + icono + "@2x.png alt=" + iconoDesc +"> </p>";
                        
                        h4 = "<h4> " + dia + "</h4>";
                        article = "<article> " + h4 + stringDatos + "</article>";
                        $("section").html($("section").html() + article);
                    }
                });
            },
            error:function(){
                $("h3").remove();
                $("section").remove();
            }
        });
    }

    verXML(){

        this.apikey = "dff06432f9d5b3e7c70f9a5f75d2615d";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + this.coords_meta[1] + "&lon=" + this.coords_meta[0] + this.unidades + this.idioma + this.tipo + "&appid=" + this.apikey;

        this.crearElemento("h3","Predicción","footer"); // Crea un elemento con DOM 
        this.crearElemento("section","","footer"); // Crea un elemento con DOM para los datos obtenidos con XML
        this.cargarDatos();
    }
}