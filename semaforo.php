<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name ="author" content ="David Gonzalez" />
    <meta name ="description" content ="Juego de reaccion" />
    <meta name ="keywords" content ="juegos,semaforo,reaccion" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />

    <title>F1Desktop - Juego Semaforo</title>
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/semaforo_grid.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.ico"/>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" 
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" 
        crossorigin="anonymous"></script>
    <script src="js/semaforo.js"></script>
</head>

<body>
    <?php
        class Record{

            protected $server;
            protected $user;
            protected $pass;
            protected $dbname;

            public function __construct(){
                $this->server = "localhost";
                $this->user = "DBUSER2024";
                $this->pass = "DBPSWD2024";
                $this->dbname = "records";
            }

            public function manageForm(){
                $name = $_POST["name"];
                $surname = $_POST["surname"];
                $level = $_POST["level"];
                $time = $_POST["time"];

                $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
                if ($conn->connect_error) {
                    die("Error de conexion: ". $conn->connect_error);
                }

                $insertar = "INSERT INTO registro(nombre, apellidos, nivel, tiempo) VALUES ($name, $surname, $level, $time)";
                if ($conn->query($insertar) === TRUE) {
                    echo "Nuevo registro creado exitosamente";
                } else {
                    echo "Error al insertar datos: " . $conn->error;
                }
            }
        }

        $record = new Record();
    ?>

    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="index.html">F1Desktop</a></h1>
        <nav>
            <a href="index.html">Index</a>
            <a href="calendario.html">Calendario</a>
            <a class="active" href="juegos.html">Juegos</a>
            <a href="meteorologia.html">Meteorologia</a>
            <a href="noticias.html">Noticias</a>
            <a href="piloto.html">Piloto</a>
            <a href="viajes.html">Viajes</a>
            <a href="circuito.html">Circuito</a>
            <a href="api.html">Creador de Escuderia</a>
        </nav>
    </header>

    <p>Estas en: <a href="index.html">Indice</a> >> <a href="juegos.html">Juegos</a> >> Semaforo</p>

    <h2>Juegos</h2>

    <nav>
        <a href="memoria.html">Memoria</a>
        <a class="active" href="semaforo.php">Semaforo</a>
    </nav>

    <main>
        
    </main>

    <section>
        
    </section>

    <?php
        if (count($_POST)> 0) {
            $record->manageForm();
        }
    ?>

    <script>
        const semaforo = new Semaforo();
    </script>
</body>
</html>