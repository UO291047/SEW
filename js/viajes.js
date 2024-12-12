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
        var ubicacion = document.querySelector("body > div");
        
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
        const mapContainer = document.querySelector("body > div");
        //Limpiamos el contenedor por si ya tenía algo
        while(mapContainer.firstChild){
            mapContainer.removeChild(mapContainer.firstChild);
        }

        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yOTEwNDciLCJhIjoiY2xxOW1uOHd4MWcyNjJpcDdqcDFrZmRoNSJ9.wRJntK8K2RqcAqRrw0XE2g';
        const map = new mapboxgl.Map({
            container: 'map', 
            style: 'mapbox://styles/mapbox/streets-v9', // localización del mapa de estilo
            center: [this.longitud,this.latitud], // Posición inicial
            zoom: 14 // Zoom inicial
        });
        map.addControl(new mapboxgl.NavigationControl());
        map.scrollZoom.disable();
    }

    activarCarrusel(){
        const slides = document.querySelectorAll("article img");

        // select next slide button
        const nextSlide = document.querySelector("article button:nth-of-type(1)");

        // current slide counter
        let curSlide = 3;
        // maximum number of slides
        let maxSlide = slides.length - 1;

        // add event listener and navigation functionality
        nextSlide.addEventListener("click", function () {
            // check if current slide is the last and reset current slide
            if (curSlide === maxSlide) {
                curSlide = 0;
            } else {
                curSlide++;
            }

            //   move slide by -100%
            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });

        // select next slide button
        const prevSlide = document.querySelector("article button:nth-of-type(2)");

        // add event listener and navigation functionality
        prevSlide.addEventListener("click", function () {
            // check if current slide is the first and reset current slide to last
            if (curSlide === 0) {
                curSlide = maxSlide;
            } else {
                curSlide--;
            }

            //   move slide by 100%
            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });
    }

}