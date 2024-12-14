<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <meta name ="author" content ="David Gonzalez" />
    <meta name ="description" content ="Consultor F1" />
    <meta name ="keywords" content ="consultas" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />

    <title>F1Desktop - Consultor F1</title>
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="icon" href="../multimedia/imagenes/favicon.ico"/>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" 
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" 
        crossorigin="anonymous"></script>
</head>

<body>

    <?php
    class Database {
        // Configuración de conexión a la base de datos
        private $host;
        private $user;
        private $password;
        private $dbname;

        private $pdo;

        public function __construct(){
            $this->host = 'localhost';
            $this->user = 'DBUSER2024';
            $this->password = 'DBPSWD2024';
            $this->dbname = 'informacion';

            $this->pdo = new PDO("mysql:host=$this->host", $this->user, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        public function getConexion(): PDO{
            return $this->pdo;
        }

        public function create_database(){
            try {
                // Conectar al servidor MySQL
                $pdo = $this->getConexion();
            
                // Eliminar la base de datos si ya existe (opcional, para evitar duplicados)
                $pdo->exec("DROP DATABASE IF EXISTS $this->dbname");
                echo "Base de datos eliminada si existía.\n";
            
                // Crear la base de datos
                $pdo->exec("CREATE DATABASE $this->dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci");
                echo "Base de datos '$this->dbname' creada.\n";
            
                // Seleccionar la base de datos
                $pdo->exec("USE $this->dbname");
            
                // Cargar el fichero SQL
                $sqlFilePath = 'informacion.sql'; // Ruta del archivo cargado
                $sqlContent = file_get_contents($sqlFilePath);
            
                if ($sqlContent === false) {
                    throw new Exception("No se pudo leer el archivo SQL.");
                }
            
                // Dividir las instrucciones SQL por punto y coma para ejecutarlas
                $statements = array_filter(array_map('trim', explode(';', $sqlContent)));
            
                foreach ($statements as $statement) {
                    if (!empty($statement)) {
                        $pdo->exec($statement);
                    }
                }
            
                echo "Base de datos cargada exitosamente desde '$sqlFilePath'.\n";
            
            } catch (PDOException $e) {
                echo "Error de conexión o ejecución: " . $e->getMessage() . "\n";
            } catch (Exception $e) {
                echo "Error general: " . $e->getMessage() . "\n";
            }
        }

        public function getResultsByPilot($id_piloto) {
            try {
                $pdo = $this->getConexion();
        
                $stmt = $pdo->prepare("
                    SELECT carreras.nombre AS carrera, carreras.fecha, resultados.posicion, resultados.puntos 
                    FROM resultados
                    JOIN carreras ON resultados.id_carrera = carreras.id_carrera
                    WHERE resultados.id_piloto = ?
                    ORDER BY carreras.fecha ASC
                ");
                $stmt->execute([$id_piloto]);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            } catch (PDOException $e) {
                echo "Error al obtener los resultados: " . $e->getMessage();
                return [];
            }
        }

        public function getRankingByRace($id_carrera) {
            try {
                $pdo = $this->getConexion();
        
                $stmt = $pdo->prepare("
                    SELECT pilotos.nombre, pilotos.apellidos, resultados.posicion, resultados.puntos
                    FROM resultados
                    JOIN pilotos ON resultados.id_piloto = pilotos.id_piloto
                    WHERE resultados.id_carrera = ?
                    ORDER BY resultados.posicion ASC
                ");
                $stmt->execute([$id_carrera]);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            } catch (PDOException $e) {
                echo "Error al obtener el ranking: " . $e->getMessage();
                return [];
            }
        }
        
        public function getPilotName($id_piloto): string{
            try {
                $pdo = $this->getConexion();
        
                $stmt = $pdo->prepare("
                    SELECT nombre, apellidos 
                    FROM pilotos
                    WHERE id_piloto = ?
                ");
                $stmt->execute([$id_piloto]);
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $result[0]["nombre"]." ".$result[0]["apellidos"];
        
            } catch (PDOException $e) {
                echo "Error al obtener los resultados: " . $e->getMessage();
                return "";
            }
        }

        public function getRaceName($id_carrera): string{
            try {
                $pdo = $this->getConexion();
        
                $stmt = $pdo->prepare("
                    SELECT nombre
                    FROM carreras
                    WHERE id_carrera = ?
                ");
                $stmt->execute([$id_carrera]);
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $result[0]["nombre"];
        
            } catch (PDOException $e) {
                echo "Error al obtener los resultados: " . $e->getMessage();
                return "";
            }
        }
        
    }

    $database = new Database();
    ?>

    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1><a href="../index.html">F1Desktop</a></h1>
        <nav>
            <a href="../index.html">Index</a>
            <a href="../calendario.html">Calendario</a>
            <a href="../juegos.html">Juegos</a>
            <a href="../meteorologia.html">Meteorologia</a>
            <a href="../noticias.html">Noticias</a>
            <a href="../piloto.html">Piloto</a>
            <a href="../viajes.php">Viajes</a>
            <a href="../circuito.html">Circuito</a>
            <a href="../api.html">Creador de Escuderia</a>
            <a class="active" href="php/consultor.php">Consultor F1</a>
        </nav>
    </header>

    <p>Estas en: <a href="../index.html">Indice</a> >> Consultor F1</p>

    <h2>Consultor F1</h2>
    
    <?php
        $database->create_database();
        $pdo = $database->getConexion();
    ?>

    <form method="GET" action="consultor.php">
        <label for="piloto">Selecciona un piloto:</label>
        <select name="id_piloto" id="piloto">
            <?php
            $pilotos = $pdo->query("SELECT id_piloto, CONCAT(nombre, ' ', apellidos) AS nombre_completo FROM pilotos")->fetchAll(PDO::FETCH_ASSOC);
            foreach ($pilotos as $piloto) {
                echo "<option value='{$piloto['id_piloto']}'>{$piloto['nombre_completo']}</option>";
            }
            ?>
        </select>
        <button type="submit">Ver resultados</button>
    </form>
    
    <?php
    if (isset($_GET['id_piloto'])) {
        $id_piloto = $_GET['id_piloto'];
        $nombre = $database->getPilotName($id_piloto);
        $resultados = $database->getResultsByPilot($id_piloto);

        echo "<h3>$nombre</h3>";
        if (!empty($resultados)) {
            echo "<table>";
            echo "<caption>Resultados del piloto</caption>";
            echo "<thead><tr><th scope='col'>Carrera</th><th scope='col'>Fecha</th><th scope='col'>Posición</th><th scope='col'>Puntos</th></tr></thead>";
            echo "<tbody>";
            foreach ($resultados as $resultado) {
                echo "<tr>
                    <td>{$resultado['carrera']}</td>
                    <td>{$resultado['fecha']}</td>
                    <td>{$resultado['posicion']}</td>
                    <td>{$resultado['puntos']}</td>
                </tr>";
            }
            echo "</tbody></table>";
        } else {
            echo "<p>No se encontraron resultados para este piloto.</p>";
        }
    }
    ?>

    <form method="GET" action="consultor.php">
        <label for="carrera">Selecciona una carrera:</label>
        <select name="id_carrera" id="carrera">
            <?php
            $carreras = $pdo->query("SELECT id_carrera, nombre FROM carreras")->fetchAll(PDO::FETCH_ASSOC);
            foreach ($carreras as $carrera) {
                echo "<option value='{$carrera['id_carrera']}'>{$carrera['nombre']}</option>";
            }
            ?>
        </select>
        <button type="submit">Ver ranking</button>
    </form>

    <?php
    if (isset($_GET['id_carrera'])) {
        $id_carrera = $_GET['id_carrera'];
        $nombre = $database->getRaceName($id_carrera);
        $ranking = $database->getRankingByRace($id_carrera);
    
        echo "<h3>$nombre</h3>";
        if (!empty($ranking)) {
            echo "<table>";
            echo "<caption>Ranking de la carrera</caption>";
            echo "<thead><tr><th scope='col'>Piloto</th><th scope='col'>Posición</th><th scope='col'>Puntos</th></tr></thead><tbody>";
            foreach ($ranking as $posicion) {
                echo "<tr>
                    <td>{$posicion['nombre']} {$posicion['apellidos']}</td>
                    <td>{$posicion['posicion']}</td>
                    <td>{$posicion['puntos']}</td>
                </tr>";
            }
            echo "</tbody></table>";
        } else {
            echo "<p>No se encontraron resultados para esta carrera.</p>";
        }
    }
    ?>

</body>
</html>