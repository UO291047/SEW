class Circuito{

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

    readInputFile(files){
        var archivo = files[0];
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
        {
            var lector = new FileReader();

            lector.onload = function(event){
                const xml = lector.result;
                var elemento = document.createElement("pre");
                elemento.innerText = xml;
                $("label:first").before(elemento);
            }

            lector.readAsText(archivo);

        }
        else {
            alert("Error : ¡¡¡ Archivo no válido !!!");
        }
    }

    cargarArchivoKML(files) {
        var file = files[0];

        mapboxgl.accessToken = 'pk.eyJ1IjoidW8yOTEwNDciLCJhIjoiY2xxOW1uOHd4MWcyNjJpcDdqcDFrZmRoNSJ9.wRJntK8K2RqcAqRrw0XE2g';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [this.longitud, this.latitud],
            zoom: 14
        });
        map.addControl(new mapboxgl.NavigationControl());
        map.scrollZoom.disable();

        const lector = new FileReader();

        lector.onload = (event) => {
            const resultXML = event.target.result;
            this.procesarKML(resultXML, map);
        };

        lector.readAsText(file);
    }

    procesarKML(xmlContent, map) {
        const xmlDoc = $.parseXML(xmlContent);
        const $xml = $(xmlDoc);

        const puntos = [];

        $xml.find('Placemark').each(function () {
            const coordenadas = $(this).find('coordinates').text().split(' ');

            coordenadas.forEach(coord => {
                const [longitud, latitud, altitud] = coord.split(',').map(parseFloat);
                puntos.push([longitud, latitud, altitud]);
            });
        });

        const primerPunto = puntos[0];

        // Añadir la ruta al mapa centrando en el primer punto
        map.on('load', function () {
            map.addLayer({
                'id': 'circuito',
                'type': 'line',
                'source': {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': puntos
                        }
                    }
                },
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
                    'line-width': 8
                }
            });

            // Centrar el mapa en el primer punto
            map.flyTo({
                center: primerPunto,
                zoom: 15
            });
        });
    }

    cargarAltimetria(files){
        var archivo = files[0];
        var lector = new FileReader();

        lector.onload = function(event){
            const svg = event.target.result;
            var elemento = document.createElement("p");
            elemento.innerHTML = svg;
            $("label:last").before(elemento);
        }

        lector.readAsText(archivo);
    }

}
