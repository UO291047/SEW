"use strict";
class Viajes{

    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }

    getMapaEstatico(){
        var ubicacion=document.querySelector("main");
        
        var apiKey = "?access_token=pk.eyJ1IjoidW8yOTEwNDciLCJhIjoiY2xxOW1uOHd4MWcyNjJpcDdqcDFrZmRoNSJ9.wRJntK8K2RqcAqRrw0XE2g";
        //URL: obligatoriamente https
        var url = "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/";
        //Parámetros
        // centro del mapa (obligatorio si no hay marcadores)
        var centro = this.longitud + "," + this.latitud;
        //zoom (obligatorio si no hay marcadores)
        //zoom: 1 (el mundo), 5 (continentes), 10 (ciudad), 15 (calles), 20 (edificios)
        var zoom =",14,0";
        //Tamaño del mapa en pixeles (obligatorio)
        var tamaño= "/800x600";

        var marcador = "pin-l+ff0000("+centro+")/";
        
        this.imagenMapa = url + marcador + centro + zoom + tamaño + apiKey;
        ubicacion.innerHTML = "<img src='"+this.imagenMapa+"' alt='mapa estático' />";
    }

    getMapaDinamico(){
        const mainElement = document.querySelector("main");
        //Limpiamos el main por si ya tenía algo
        while(mainElement.firstChild){
            mainElement.removeChild(mainElement.firstChild);
        }

        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yOTEwNDciLCJhIjoiY2xxOW1uOHd4MWcyNjJpcDdqcDFrZmRoNSJ9.wRJntK8K2RqcAqRrw0XE2g'; // Nuestro Token de acceso
        var map = new mapboxgl.Map({
            container: 'map', 
            style: 'mapbox://styles/mapbox/streets-v9', // localización del mapa de estilo
            center: [this.longitud,this.latitud], // Posición inicial
            zoom: 14 // Zoom inicial
        });
    }

    readInputFile(files){
        var archivo = files[0];
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
        {
            var lector = new FileReader();

            lector.onload = function(event){
                var viajes = new Viajes();
                var resultXML = lector.result;
                var resultHTML = viajes.procesarXML(resultXML);
                const mainElement = document.querySelector("main");
                mainElement.innerHTML = resultHTML;
            }

            lector.readAsText(archivo);

        }
        else {
            alert("Error : ¡¡¡ Archivo no válido !!!");
        }
    }

    procesarXML(xmlContent) {
        var htmlOutput = '<h2>Información de rutas</h2>';
        
        // Parsear el contenido XML
        var xmlDoc = $.parseXML(xmlContent);
        var $xml = $(xmlDoc);
      
        // Iterar sobre cada ruta en el XML
        $xml.find('ruta').each(function() {
          var nombreRuta = $(this).attr('nombre');
          var tipoRuta = $(this).find('tipo').text();
          var adecuadaPara = $(this).attr('adecuada-para');
          var medioTransporte = $(this).attr('medio-transporte');
      
          // Mostrar información básica de la ruta
          htmlOutput += '<article>';
          htmlOutput += '<h3>' + nombreRuta + '</h3>';
          htmlOutput += '<p><strong>Tipo:</strong> ' + tipoRuta + '</p>';
          htmlOutput += '<p><strong>Adecuada para:</strong> ' + adecuadaPara + '</p>';
          htmlOutput += '<p><strong>Medio de transporte:</strong> ' + medioTransporte + '</p>';
      
          // Mostrar información detallada de la ruta
          htmlOutput += '<article>';
          $(this).find('informacion').each(function() {
            var horario = $(this).find('horario');
            var lugar = $(this).find('ubicacion > lugar').text();
            var gestion = $(this).find('gestion').text();
            var descripcion = $(this).find('descripcion > texto').text();
      
            htmlOutput += '<p><strong>Horario:</strong> ' + horario.attr('fecha-inicio') + ' ' + horario.attr('hora-inicio') + ' (' + horario.attr('duracion') + ')</p>';
            htmlOutput += '<p><strong>Lugar:</strong> ' + lugar + '</p>';
            htmlOutput += '<p><strong>Gestión:</strong> ' + gestion + '</p>';
            htmlOutput += '<p><strong>Descripción:</strong> ' + descripcion + '</p>';
      
            // Mostrar información de los hitos
            htmlOutput += '<h4>Hitos</h4>';
            $(this).find('hitos > hito').each(function() {
              var nombreHito = $(this).attr('nombre');
              var textoHito = $(this).find('texto').text();
              var coordenadasHito = $(this).find('coordenadas');
              var galeriaHito = $(this).find('galeria');
      
              htmlOutput += '<article>';
              htmlOutput += '<p><strong>Nombre del Hito:</strong> ' + nombreHito + '</p>';
              htmlOutput += '<p><strong>Texto del Hito:</strong> ' + textoHito + '</p>';
              htmlOutput += '<p><strong>Coordenadas del Hito:</strong> Latitud ' + coordenadasHito.attr('latitud') + ', Longitud ' + coordenadasHito.attr('longitud') + ', Altitud ' + coordenadasHito.attr('altitud') + '</p>';
      
              
              htmlOutput += '</article>';
            });
          });
          htmlOutput += '</article>';
      
          htmlOutput += '</article>';
        });
      
        return htmlOutput;
      }
      

}