
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

    getCoords(){
        return this.coords_capital;
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

    cargarDatos(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                
                //Presentación de los datos contenidos en JSON
                
                var stringDatos = "<li> <img src=https://openweathermap.org/img/wn/" + datos.list[0].weather[0].icon + "@2x.png> </li>";
                    stringDatos += "<li>Temperatura máxima: " + datos.list[0].main.temp_max + " grados Celsius</li>";
                    stringDatos += "<li>Temperatura mínima: " + datos.list[0].main.temp_min + " grados Celsius</li>";
                    stringDatos += "<li>Humedad: " + datos.list[0].main.humidity + " %</li>";
                    stringDatos += "<li>Lluvia: " + datos.list[0].rain['3h'] + " milímetros </li>";
                
                $("pre").append(stringDatos);

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

    verJSON(){
        this.apikey = "dff06432f9d5b3e7c70f9a5f75d2615d";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + this.coords_capital[0] + "&lon=" + this.coords_capital[1] + "&appid=" + this.apikey + this.unidades + this.idioma;
        //https://api.openweathermap.org/data/2.5/forecast?lat=-6.17221&lon=35.73947&appid=dff06432f9d5b3e7c70f9a5f75d2615d&units=metric&lang=es
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>";

        //Muestra el archivo JSON recibido   
        this.crearElemento("h4", "Datos", "footer")  
        this.crearElemento("pre","","footer"); // Crea un elemento con DOM para el string con JSON
        this.cargarDatos();
    }

}
