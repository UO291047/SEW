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

    cargarDatos(){
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                
                //Presentación del archivo XML en modo texto
                $("h5").text((new XMLSerializer()).serializeToString(datos));
            
                //Extracción de los datos contenidos en el XML
                var temperatura           = $('temperature',datos).attr("value");
                var temperaturaMin        = $('temperature',datos).attr("min");
                var temperaturaMax        = $('temperature',datos).attr("max");
                var humedad               = $('humidity',datos).attr("value");
                var precipitacionValue    = $('precipitation',datos).attr("value");
                var horaMedida            = $('lastupdate',datos).attr("value");
                var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                    horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                
                var stringDatos =  "<li>Temperatura: " + temperatura + " grados Celsius</li>";
                    stringDatos += "<li>Temperatura mínima: " + temperaturaMin + " grados Celsius</li>";
                    stringDatos += "<li>Temperatura máxima: " + temperaturaMax + " grados Celsius</li>";
                    stringDatos += "<li>Humedad: " + humedad + " % </li>";
                    stringDatos += "<li>Precipitación valor: " + precipitacionValue + "</li>";
                    stringDatos += "<li>Hora de la medida: " + horaMedidaLocal + "</li>";
                    stringDatos += "<li>Fecha de la medida: " + fechaMedidaLocal + "</li>";
                
                $("pre").html(stringDatos);                  
            },
            error:function(){
                $("h4").remove();
                $("pre").remove();
            }
        });
    }

    crearElemento(tipoElemento, texto, insertarAntesDe){
        // Crea un nuevo elemento modificando el árbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }

    verXML(){

        this.apikey = "dff06432f9d5b3e7c70f9a5f75d2615d";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + this.coords_capital[0] + "&lon=" + this.coords_capital[1] + this.unidades + this.idioma + this.tipo + "&appid=" + this.apikey;

        //Muestra el archivo JSON recibido
        this.crearElemento("h4","Datos","footer"); // Crea un elemento con DOM 
        this.crearElemento("pre","","footer"); // Crea un elemento con DOM para los datos obtenidos con XML
        this.cargarDatos();
    }
}