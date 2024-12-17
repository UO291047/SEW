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

            if(!$this->databaseExists()){
                $this->create_database();
            }
        }

        public function getConexion(): PDO{
            $this->pdo->exec("USE $this->dbname");
            return $this->pdo;
        }

        public function databaseExists(): bool {
            try {
                // Ejecuta una consulta para comprobar si la base de datos existe
                $stmt = $this->pdo->prepare("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = :dbname");
                $stmt->bindParam(':dbname', $this->dbname, PDO::PARAM_STR);
                $stmt->execute();
        
                // Comprueba si hay resultados
                $result = $stmt->fetch() !== false;
                return $result;
        
            } catch (PDOException $e) {
                // Maneja errores si ocurren
                echo "Error al comprobar la base de datos: " . $e->getMessage();
                return false;
            }
        }
        

        public function create_database(){
            try {
                $this->pdo->exec("DROP DATABASE IF EXISTS $this->dbname");
                $this->pdo->exec("CREATE DATABASE $this->dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci");
                $this->pdo->exec("USE $this->dbname");
                $sqlFilePath = 'informacion.sql';
                $sqlContent = file_get_contents($sqlFilePath);

                if ($sqlContent === false) {
                    throw new Exception("No se pudo leer el archivo SQL.");
                }

                $statements = array_filter(array_map('trim', explode(';', $sqlContent)));

                foreach ($statements as $statement) {
                    if (!empty($statement)) {
                        $this->pdo->exec($statement);
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

        public function exportDatabaseToCSV() {
            try {
                $this->pdo->exec("USE $this->dbname");
                $tables = $this->pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
        
                // Limpia cualquier salida previa
                if (ob_get_level() > 0) {
                    ob_end_clean();
                }
        
                header('Content-Type: text/csv; charset=utf-8');
                header('Content-Disposition: attachment; filename="database_export.csv"');
                $output = fopen('php://output', 'w');
        
                foreach ($tables as $table) {
                    $stmt = $this->pdo->query("SELECT * FROM $table");
                    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
                    if (!empty($rows)) {
                        fputcsv($output, ["Table: $table"]);
                        fputcsv($output, array_keys($rows[0]));
        
                        foreach ($rows as $row) {
                            fputcsv($output, $row);
                        }
                    }
                }
        
                fclose($output);
                exit; // Termina la ejecución tras enviar el archivo
            } catch (Exception $e) {
                echo "Error al exportar la base de datos: " . $e->getMessage();
            }
        }
        
        public function importDatabaseFromCSV($filePath) {
            try {
                $this->pdo->exec("USE $this->dbname");
                $this->clearDatabase();
        
                // Leer datos del archivo CSV
                $file = fopen($filePath, 'r');
                $tableData = [];
                $currentTable = '';
        
                while (($line = fgetcsv($file, 0, ',', '"')) !== false) {
                    // Ignorar líneas vacías
                    if (empty(array_filter($line))) {
                        continue;
                    }
                    if (strpos($line[0], 'Table: ') === 0) {
                        $currentTable = str_replace('Table: ', '', $line[0]);
                        $tableData[$currentTable] = ['columns' => [], 'rows' => []];
                    } elseif (!empty($currentTable) && empty($tableData[$currentTable]['columns'])) {
                        $tableData[$currentTable]['columns'] = $line;
                    } elseif (!empty($currentTable)) {
                        $tableData[$currentTable]['rows'][] = $line;
                    }
                }
                fclose($file);
        
                // Importar datos respetando dependencias
                foreach ($this->getTableDependencyOrder(array_keys($tableData)) as $table) {
                    if (!empty($tableData[$table]['rows'])) {
                        $columns = implode(',', array_map(fn($col) => "`$col`", $tableData[$table]['columns']));
        
                        foreach ($tableData[$table]['rows'] as $row) {
                            // Validar que el número de valores coincide con el número de columnas
                            if (count($row) !== count($tableData[$table]['columns'])) {
                                throw new Exception("La fila no coincide con las columnas de la tabla `$table`: " . implode(',', $row));
                            }
        
                            $placeholders = implode(',', array_fill(0, count($row), '?'));
                            $stmt = $this->pdo->prepare("INSERT INTO `$table` ($columns) VALUES ($placeholders)");
                            $stmt->execute($row);
                        }
                    }
                }
        
            } catch (Exception $e) {
                echo "Error al importar la base de datos: " . $e->getMessage();
            }
        }
        
    
        private function clearDatabase() {
            try {
                $this->pdo->exec("SET FOREIGN_KEY_CHECKS = 0");
        
                $tables = $this->pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
                $orderedTables = $this->getTableDependencyOrder($tables);
        
                // Vaciar tablas en orden inverso
                foreach (array_reverse($orderedTables) as $table) {
                    $this->pdo->exec("TRUNCATE TABLE `$table`");
                }
        
                $this->pdo->exec("SET FOREIGN_KEY_CHECKS = 1");
            } catch (Exception $e) {
                echo "Error al limpiar la base de datos: " . $e->getMessage();
            }
        }
        
        private function getTableDependencyOrder($tables) {
            $dependencies = [];
        
            // Obtener dependencias de cada tabla
            foreach ($tables as $table) {
                $result = $this->pdo->query("
                    SELECT REFERENCED_TABLE_NAME 
                    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
                    WHERE TABLE_SCHEMA = '$this->dbname' AND TABLE_NAME = '$table' 
                    AND REFERENCED_TABLE_NAME IS NOT NULL
                ");
                $dependencies[$table] = $result->fetchAll(PDO::FETCH_COLUMN);
            }
        
            // Resolver orden usando un algoritmo topológico
            $ordered = [];
            $visited = [];
        
            $visit = function ($table) use (&$ordered, &$visited, &$dependencies, &$visit) {
                if (isset($visited[$table])) return;
                $visited[$table] = true;
                foreach ($dependencies[$table] ?? [] as $dependency) {
                    $visit($dependency);
                }
                $ordered[] = $table;
            };
        
            foreach ($tables as $table) {
                $visit($table);
            }
        
            return $ordered;
        }
                
        public function handleExportImport() {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                if (isset($_POST['export'])) {
                    $this->exportDatabaseToCSV();
                } else if (isset($_POST['import'])) {
                    if (isset($_FILES['csv_file']) && $_FILES['csv_file']['error'] === UPLOAD_ERR_OK) {
                        $filePath = $_FILES['csv_file']['tmp_name'];
                        $this->importDatabaseFromCSV($filePath);
                    } else {
                        echo "Error al cargar el archivo CSV.";
                    }
                }
            }
        }
    }

    $database = new Database();

    // Manejo de formularios
    $database->handleExportImport();
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
        $pdo = $database->getConexion();
    ?>

    <form method="POST" action="consultor.php" enctype="multipart/form-data">
        <button type="submit" name="export">Exportar Base de Datos</button>
        <input type="file" name="csv_file" accept=".csv">
        <button type="submit" name="import">Importar Base de Datos</button>
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
