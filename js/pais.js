
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
                    $("pre").text(JSON.stringify(datos, null, 2)); //muestra el json en un elemento pre
                
                    //Presentación de los datos contenidos en JSON
                    
                    var stringDatos = "<ul><li>Ciudad: " + datos.city.name + "</li>";
                        stringDatos += "<li>País: " + datos.country + "</li>";
                        stringDatos += "<li>Latitud: " + datos.city.coord.lat + " grados</li>";
                        stringDatos += "<li>Longitud: " + datos.city.coord.lon + " grados</li>";
                        stringDatos += "<li>Temperatura: " + datos.list[0].main.temp + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura máxima: " + datos.list[0].main.temp_max + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura mínima: " + datos.list[0].main.temp_min + " grados Celsius</li>";
                        stringDatos += "<li>Presión: " + datos.list[0].main.pressure + " milibares</li>";
                        stringDatos += "<li>Humedad: " + datos.list[0].main.humidity + " %</li>";
                        stringDatos += "<li>Amanece a las: " + new Date(datos.sunrise *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Oscurece a las: " + new Date(datos.sunset *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Dirección del viento: " + datos.list[0].wind.deg + " grados</li>";
                        stringDatos += "<li>Velocidad del viento: " + datos.list[0].wind.speed + " metros/segundo</li>";
                        stringDatos += "<li>Hora de la medida: " + new Date(datos.list[0].dt *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Fecha de la medida: " + new Date(datos.list[0].dt *1000).toLocaleDateString() + "</li>";
                        stringDatos += "<li>Descripción: " + datos.list[0].weather[0].description + "</li>";
                        stringDatos += "<li>Visibilidad: " + datos.list[0].visibility + " metros</li>";
                        stringDatos += "<li>Nubosidad: " + datos.list[0].clouds.all + " %</li></ul>";
                    
                    $("p").html(stringDatos);
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
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
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>";

        //Muestra el archivo JSON recibido
        this.crearElemento("h2","Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a>","footer"); 
        this.crearElemento("h3",this.correcto,"footer"); // Crea un elemento con DOM 
        this.crearElemento("h4","JSON","footer"); // Crea un elemento con DOM        
        this.crearElemento("pre","","footer"); // Crea un elemento con DOM para el string con JSON
        this.crearElemento("h4","Datos","footer"); // Crea un elemento con DOM 
        this.crearElemento("p","","footer"); // Crea un elemento con DOM para los datos obtenidos con JSON
        this.cargarDatos();
    }

}
