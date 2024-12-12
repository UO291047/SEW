<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name ="author" content ="David Gonzalez" />
    <meta name ="description" content ="Viajes" />
    <meta name ="keywords" content ="viajes" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />

    <title>F1Desktop - Viajes</title>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico"/>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" 
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" 
        crossorigin="anonymous"></script>
    <script src="js/viajes.js"></script>

    <link href="https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.js"></script>
</head>

<body>
    <?php
    class Carrusel{

        protected $nombre_pais;
        protected $nombre_capital;
        protected $perPage;
        protected $json;
        public function __construct($nombre_pais, $nombre_capital) {
            $this->nombre_pais = $nombre_pais;
            $this->nombre_capital = $nombre_capital;
        }

        public function obtenerImagenes() {
            $tag = urlencode($this->nombre_pais);
            $perPage = 10;
        
            $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
            $url .= 'tags=' . $tag;
            $url .= '&per_page=' . $perPage;
            $url .= '&format=json&nojsoncallback=1';
        
            $context = stream_context_create([
                'http' => ['ignore_errors' => true]
            ]);
        
            $respuesta = file_get_contents($url, false, $context);
        
            if ($respuesta === false) {
                echo "<h3>Error al intentar conectar con el servidor</h3>";
                return;
            }
        
            $json = json_decode($respuesta);
        
            if ($json === null) {
                echo "<h3>Error en el archivo JSON recibido</h3>";
            } else {
                $this->json = $json;
                $this->perPage = $perPage;
            }
        }
        

        public function crearCarrusel() {
            $carrusel = 
            "<article>
                <h3> ".$this->nombre_pais." </h3>";
            for($i=0;$i<$this->perPage;$i++) {
                $URLfoto = $this->json->items[$i]->media->m;       
                $carrusel .= "
                    <img alt='Imagen Carrusel".$i."' src='".$URLfoto."' />
                    ";
            }
            $carrusel .= "
                <button> &gt; </button>
                <button> &lt; </button>
            </article>";

            echo $carrusel;
        }
    }

    $carrusel = new Carrusel("Emiratos Árabes Unidos", "Abu Dabi");
    ?>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="index.html">F1Desktop</a></h1>
        <nav>
            <a href="index.html">Index</a>
            <a href="calendario.html">Calendario</a>
            <a href="juegos.html">Juegos</a>
            <a href="meteorologia.html">Meteorologia</a>
            <a href="noticias.html">Noticias</a>
            <a href="piloto.html">Piloto</a>
            <a class="active" href="viajes.php">Viajes</a>
            <a href="circuito.html">Circuito</a>
            <a href="api.html">Creador de Escuderia</a>
        </nav>
    </header>

    <p>Estas en: <a href="index.html">Indice</a> >> Viajes</p>

    <h2>Viajes</h2>
    <script>
        var viajes = new Viajes();
    </script>
    
    <section>
        <h3>Mapas</h3>
        <input type="button" value="Obtener mapa estatico" onclick="viajes.getMapaEstatico();">
        <input type="button" value="Obtener mapa dinamico" onclick="viajes.getMapaDinamico();">
    </section>
    
    <!-- Lleva id para poder poner el mapa dinamico -->
    <div id="map">
        
    </div>

    <?php
        $carrusel->obtenerImagenes();
        $carrusel->crearCarrusel();
    ?>
    <script>
        viajes.activarCarrusel();
    </script>

</body>
</html>