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
    class Record {
        protected $server;
        protected $user;
        protected $pass;
        protected $dbname;

        public function __construct() {
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->pass = "DBPSWD2024";
            $this->dbname = "records";
        }

        public function manageForm() {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $name = $_POST["name"];
                $surname = $_POST["surname"];
                $level = $_POST["level"];
                $time = $_POST["time"];

                $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
                if ($conn->connect_error) {
                    die("Error de conexión: " . $conn->connect_error);
                }

                $stmt = $conn->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)");
                if ($stmt === false) {
                    die("Error al preparar la consulta: " . $conn->error);
                }

                $stmt->bind_param("ssss", $name, $surname, $level, $time);

                if (!($stmt->execute())) {
                    echo "Error al insertar datos: " . $stmt->error;
                }

                $stmt->close();
                $conn->close();

                // Redirige a la misma página para evitar duplicados al recargar
                //header("Location: " . $_SERVER['PHP_SELF']);
                //exit;
            }
        }

        public function getTopRecords($level) {
            $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            if ($conn->connect_error) {
                die("Error de conexión: " . $conn->connect_error);
            }
    
            $stmt = $conn->prepare("SELECT nombre, apellidos, tiempo FROM registro WHERE nivel = ? ORDER BY tiempo ASC LIMIT 10");
            if ($stmt === false) {
                die("Error al preparar la consulta: " . $conn->error);
            }
    
            $stmt->bind_param("s", $level);
            $stmt->execute();
    
            $result = $stmt->get_result();
            $records = [];
            while ($row = $result->fetch_assoc()) {
                $records[] = $row;
            }
    
            $stmt->close();
            $conn->close();
    
            return $records;
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
            <a href="viajes.php">Viajes</a>
            <a href="circuito.html">Circuito</a>
            <a href="api.html">Creador de Escuderia</a>
            <a href="php/consultor.php">Consultor F1</a>
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

            // Obtener el nivel actual desde el formulario
            $currentLevel = $_POST["level"];
            $topRecords = $record->getTopRecords($currentLevel);

            // Obtener la cantidad de resultados
            $numRecords = count($topRecords);

            echo "<section>";
            if ($numRecords > 0) {
                echo "<h3>Los $numRecords mejores registros para el nivel '$currentLevel'</h3>";
                foreach ($topRecords as $rec) {
                    echo "<p>" . htmlspecialchars($rec['nombre']) . " " . htmlspecialchars($rec['apellidos']) . 
                        " - " . htmlspecialchars($rec['tiempo']) . " segundos</p>";
                }
            } else {
                echo "<p>No se encontraron resultados para el nivel '$currentLevel'.</p>";
            }
            echo "</section>";
        }
    ?>

    <script>
        const semaforo = new Semaforo();
    </script>
</body>
</html>