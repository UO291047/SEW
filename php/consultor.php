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

        public function databaseExists(): bool {
            try {
                $pdo = $this->getConexion();
                $stmt = $pdo->prepare("SHOW DATABASES LIKE :dbname");
                $stmt->bindParam(':dbname', $this->dbname);
                $stmt->execute();
                return $stmt->rowCount() > 0;
            } catch (PDOException $e) {
                // Manejo de errores, por ejemplo, logear o mostrar el error
                echo "Error: " . $e->getMessage();
                return false;
            }
        }
        

        public function create_database(){
            try {
                $pdo = $this->getConexion();
                $pdo->exec("DROP DATABASE IF EXISTS $this->dbname");
                $pdo->exec("CREATE DATABASE $this->dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci");
                $pdo->exec("USE $this->dbname");
                $sqlFilePath = 'informacion.sql';
                $sqlContent = file_get_contents($sqlFilePath);

                if ($sqlContent === false) {
                    throw new Exception("No se pudo leer el archivo SQL.");
                }

                $statements = array_filter(array_map('trim', explode(';', $sqlContent)));

                foreach ($statements as $statement) {
                    if (!empty($statement)) {
                        $pdo->exec($statement);
                    }
                }
            } catch (PDOException $e) {
                echo "Error de conexión o ejecución: " . $e->getMessage() . "\n";
            } catch (Exception $e) {
                echo "Error general: " . $e->getMessage() . "\n";
            }
        }

        public function getResultsByPilot($id_piloto) {
            try {
                $pdo = $this->getConexion();
                $stmt = $pdo->prepare("SELECT carreras.nombre AS carrera, carreras.fecha, resultados.posicion, resultados.puntos FROM resultados JOIN carreras ON resultados.id_carrera = carreras.id_carrera WHERE resultados.id_piloto = ? ORDER BY carreras.fecha ASC");
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
                $stmt = $pdo->prepare("SELECT pilotos.nombre, pilotos.apellidos, resultados.posicion, resultados.puntos FROM resultados JOIN pilotos ON resultados.id_piloto = pilotos.id_piloto WHERE resultados.id_carrera = ? ORDER BY resultados.posicion ASC");
                $stmt->execute([$id_carrera]);
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                echo "Error al obtener el ranking: " . $e->getMessage();
                return [];
            }
        }

        public function renderResultsByPilot($id_piloto) {
            $resultados = $this->getResultsByPilot($id_piloto);

            echo "<h3>Resultados del piloto</h3>";
            if (!empty($resultados)) {
                echo "<table>";
                echo "<caption>Resultados del piloto seleccionado</caption>";
                echo "<thead><tr><th scope='col'>Carrera</th><th scope='col'>Fecha</th><th scope='col'>Posición</th><th scope='col'>Puntos</th></tr></thead><tbody>";
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

        public function renderRankingByRace($id_carrera) {
            $ranking = $this->getRankingByRace($id_carrera);

            echo "<h3>Ranking de la carrera</h3>";
            if (!empty($ranking)) {
                echo "<table>";
                echo "<caption>Clasificación de la carrera seleccionada</caption>";
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

        public function renderPilotsDropdown() {
            $pdo = $this->getConexion();
            $pilotos = $pdo->query("SELECT id_piloto, CONCAT(nombre, ' ', apellidos) AS nombre_completo FROM pilotos")->fetchAll(PDO::FETCH_ASSOC);
            foreach ($pilotos as $piloto) {
                echo "<option value='{$piloto['id_piloto']}'>{$piloto['nombre_completo']}</option>";
            }
        }

        public function renderRacesDropdown() {
            $pdo = $this->getConexion();
            $carreras = $pdo->query("SELECT id_carrera, nombre FROM carreras")->fetchAll(PDO::FETCH_ASSOC);
            foreach ($carreras as $carrera) {
                echo "<option value='{$carrera['id_carrera']}'>{$carrera['nombre']}</option>";
            }
        }

        public function exportDatabaseToCSV(string $outputFile): void {
            try {
                $pdo = $this->getConexion();
                $pdo->exec("USE $this->dbname");
        
                // Obtener todas las tablas
                $tables = $this->getAllTables();
        
                // Abrir archivo para escribir
                $file = fopen($outputFile, 'w');
                if ($file === false) {
                    throw new Exception("No se pudo crear el archivo CSV.");
                }
        
                foreach ($tables as $table) {
                    fwrite($file, "##TABLE:$table\n");
        
                    $stmt = $pdo->query("SELECT * FROM $table");
                    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
                    if (!empty($rows)) {
                        fputcsv($file, array_keys($rows[0])); // Encabezados
                        foreach ($rows as $row) {
                            fputcsv($file, $row); // Filas
                        }
                    }
                }
        
                fclose($file);
            } catch (Exception $e) {
                echo "Error: " . $e->getMessage();
            }
        }
        

        public function importDatabaseFromCSV(string $inputFile): void {
            try {
                $this->pdo->exec("USE $this->dbname");
                $file = fopen($inputFile, 'r');

                if ($file === false) {
                    throw new Exception("No se pudo abrir el archivo $inputFile.");
                }

                $currentTable = null;
                $headers = [];
                $stmt = null;

                $this->pdo->beginTransaction();

                while (($line = fgetcsv($file)) !== false) {
                    // Detectar el inicio de una nueva tabla
                    if (strpos($line[0], '##TABLE:') === 0) {
                        $currentTable = str_replace('##TABLE:', '', $line[0]);
                        // Eliminar datos previos de la tabla
                        $this->pdo->exec("DELETE FROM $currentTable");

                        // Reiniciar encabezados
                        $headers = [];
                        continue;
                    }

                    // Configurar encabezados
                    if (empty($headers)) {
                        $headers = $line;
                        $placeholders = implode(',', array_fill(0, count($headers), '?'));
                        $sql = "INSERT INTO $currentTable (" . implode(',', $headers) . ") VALUES ($placeholders)";
                        $stmt = $this->pdo->prepare($sql);
                        continue;
                    }

                    // Insertar datos en la tabla actual
                    $stmt->execute($line);
                }

                $this->pdo->commit();
                fclose($file);

            } catch (PDOException $e) {
                $this->pdo->rollBack();
                echo "Error al importar la base de datos: " . $e->getMessage();
            } catch (Exception $e) {
                echo "Error general: " . $e->getMessage();
            }
        }

        private function getAllTables(): array {
            $stmt = $this->pdo->query("SHOW TABLES");
            return $stmt->fetchAll(PDO::FETCH_COLUMN);
        }

        public function handleExportForm(): void {
            if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['export'])) {
                // Limpia cualquier salida previa
                ob_start();
        
                $outputFile = 'backup_database.csv';
                $this->exportDatabaseToCSV($outputFile);
        
                if (file_exists($outputFile)) {
                    // Limpia el buffer de salida
                    ob_end_clean();
        
                    // Configura encabezados para la descarga
                    header('Content-Type: text/csv');
                    header('Content-Disposition: attachment; filename="' . basename($outputFile) . '"');
                    readfile($outputFile);
        
                    // Elimina el archivo temporal
                    unlink($outputFile);
        
                    // Termina la ejecución del script
                    exit;
                } else {
                    echo "Error: No se pudo generar el archivo de exportación.";
                }
            }
        }
        
        

        public function handleImportForm(): void {
            if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['import'])) {
                if (isset($_FILES['csv_file']) && $_FILES['csv_file']['error'] === UPLOAD_ERR_OK) {
                    $inputFile = $_FILES['csv_file']['tmp_name'];
                    $this->importDatabaseFromCSV($inputFile);
                } else {
                    echo "Error al subir el archivo CSV.";
                }
            }
        }
    }

    $database = new Database();

    // Manejo de formularios
    $database->handleExportForm();
    $database->handleImportForm();
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
        if(!$database->databaseExists()){
            $database->create_database();
        }
        $pdo = $database->getConexion();
    ?>

    <form method="post">
        <button type="submit" name="export">Exportar Base de Datos</button>
    </form>

    <form method="post" enctype="multipart/form-data">
        <label for="csv_file">Importar Base de Datos:</label>
        <input type="file" name="csv_file" id="csv_file" accept=".csv" required>
        <button type="submit" name="import">Importar</button>
    </form>

    <form method="GET" action="consultor.php">
        <label for="piloto">Selecciona un piloto:</label>
        <select name="id_piloto" id="piloto">
            <?php $database->renderPilotsDropdown(); ?>
        </select>
        <button type="submit">Ver resultados</button>
    </form>
    
    <?php
    if (isset($_GET['id_piloto'])) {
        $database->renderResultsByPilot($_GET['id_piloto']);
    }
    ?>

    <form method="GET" action="consultor.php">
        <label for="carrera">Selecciona una carrera:</label>
        <select name="id_carrera" id="carrera">
            <?php $database->renderRacesDropdown(); ?>
        </select>
        <button type="submit">Ver ranking</button>
    </form>

    <?php
    if (isset($_GET['id_carrera'])) {
        $database->renderRankingByRace($_GET['id_carrera']);
    }
    ?>

</body>
</html>
