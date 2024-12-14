-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2024 a las 10:04:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `informacion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras`
--

CREATE TABLE `carreras` (
  `id_carrera` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `id_circuito` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carreras`
--

INSERT INTO `carreras` (`id_carrera`, `nombre`, `fecha`, `id_circuito`) VALUES
(1, 'Bahrain Grand Prix', '2024-03-03', 1),
(2, 'Saudi Arabian Grand Prix', '2024-03-17', 2),
(3, 'Australian Grand Prix', '2024-03-31', 3),
(4, 'Azerbaijan Grand Prix', '2024-04-28', 4),
(5, 'Miami Grand Prix', '2024-05-05', 5),
(6, 'Emilia Romagna Grand Prix', '2024-05-19', 6),
(7, 'Monaco Grand Prix', '2024-05-26', 7),
(8, 'Spanish Grand Prix', '2024-06-09', 8),
(9, 'Canadian Grand Prix', '2024-06-16', 9),
(10, 'Austrian Grand Prix', '2024-06-30', 10),
(11, 'British Grand Prix', '2024-07-07', 11),
(12, 'Hungarian Grand Prix', '2024-07-21', 12),
(13, 'Belgian Grand Prix', '2024-07-28', 13),
(14, 'Dutch Grand Prix', '2024-08-25', 14),
(15, 'Italian Grand Prix', '2024-09-01', 15),
(16, 'Singapore Grand Prix', '2024-09-15', 16),
(17, 'Japanese Grand Prix', '2024-09-22', 17),
(18, 'Qatar Grand Prix', '2024-10-06', 18),
(19, 'United States Grand Prix', '2024-10-20', 19),
(20, 'Mexico City Grand Prix', '2024-10-27', 20),
(21, 'São Paulo Grand Prix', '2024-11-03', 21),
(22, 'Las Vegas Grand Prix', '2024-11-17', 22),
(23, 'Abu Dhabi Grand Prix', '2024-11-24', 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `circuitos`
--

CREATE TABLE `circuitos` (
  `id_circuito` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ubicacion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `circuitos`
--

INSERT INTO `circuitos` (`id_circuito`, `nombre`, `ubicacion`) VALUES
(1, 'Bahrain International Circuit', 'Sakhir, Bahrain'),
(2, 'Jeddah Street Circuit', 'Jeddah, Saudi Arabia'),
(3, 'Albert Park Circuit', 'Melbourne, Australia'),
(4, 'Baku City Circuit', 'Baku, Azerbaijan'),
(5, 'Miami International Autodrome', 'Miami, USA'),
(6, 'Imola Circuit', 'Imola, Italy'),
(7, 'Circuit de Monaco', 'Monaco, Monaco'),
(8, 'Circuit de Barcelona-Catalunya', 'Barcelona, Spain'),
(9, 'Circuit Gilles Villeneuve', 'Montreal, Canada'),
(10, 'Red Bull Ring', 'Spielberg, Austria'),
(11, 'Silverstone Circuit', 'Silverstone, UK'),
(12, 'Hungaroring', 'Budapest, Hungary'),
(13, 'Spa-Francorchamps', 'Stavelot, Belgium'),
(14, 'Zandvoort Circuit', 'Zandvoort, Netherlands'),
(15, 'Monza Circuit', 'Monza, Italy'),
(16, 'Marina Bay Street Circuit', 'Singapore, Singapore'),
(17, 'Suzuka Circuit', 'Suzuka, Japan'),
(18, 'Losail International Circuit', 'Losail, Qatar'),
(19, 'Circuit of the Americas', 'Austin, USA'),
(20, 'Autódromo Hermanos Rodríguez', 'Mexico City, Mexico'),
(21, 'Interlagos', 'São Paulo, Brazil'),
(22, 'Las Vegas Street Circuit', 'Las Vegas, USA'),
(23, 'Yas Marina Circuit', 'Abu Dhabi, UAE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equipo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fundacion` year(4) NOT NULL,
  `pais` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id_equipo`, `nombre`, `fundacion`, `pais`) VALUES
(1, 'Scuderia Ferrari', '1929', 'Italy');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pilotos`
--

CREATE TABLE `pilotos` (
  `id_piloto` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `nacionalidad` varchar(50) NOT NULL,
  `id_equipo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pilotos`
--

INSERT INTO `pilotos` (`id_piloto`, `nombre`, `apellidos`, `fecha_nacimiento`, `nacionalidad`, `id_equipo`) VALUES
(1, 'Charles', 'Leclerc', '1997-10-16', 'Monaco', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE `resultados` (
  `id_resultado` int(11) NOT NULL,
  `id_carrera` int(11) DEFAULT NULL,
  `id_piloto` int(11) DEFAULT NULL,
  `posicion` tinyint(4) NOT NULL,
  `puntos` decimal(4,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`id_resultado`, `id_carrera`, `id_piloto`, `posicion`, `puntos`) VALUES
(1, 1, 1, 2, 18.00),
(2, 2, 1, 3, 15.00),
(3, 3, 1, 6, 8.00),
(4, 4, 1, 4, 12.00),
(5, 5, 1, 2, 18.00),
(6, 6, 1, 3, 15.00),
(7, 7, 1, 1, 25.00),
(8, 8, 1, 7, 6.00),
(9, 9, 1, 5, 10.00),
(10, 10, 1, 2, 18.00),
(11, 11, 1, 4, 12.00),
(12, 12, 1, 3, 15.00),
(13, 13, 1, 5, 10.00),
(14, 14, 1, 1, 25.00),
(15, 15, 1, 4, 12.00),
(16, 16, 1, 3, 15.00),
(17, 17, 1, 2, 18.00),
(18, 18, 1, 1, 25.00),
(19, 19, 1, 5, 10.00),
(20, 20, 1, 6, 8.00),
(21, 21, 1, 2, 18.00),
(22, 22, 1, 4, 12.00),
(23, 23, 1, 3, 15.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD PRIMARY KEY (`id_carrera`),
  ADD KEY `id_circuito` (`id_circuito`);

--
-- Indices de la tabla `circuitos`
--
ALTER TABLE `circuitos`
  ADD PRIMARY KEY (`id_circuito`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equipo`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `pilotos`
--
ALTER TABLE `pilotos`
  ADD PRIMARY KEY (`id_piloto`),
  ADD KEY `id_equipo` (`id_equipo`);

--
-- Indices de la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`id_resultado`),
  ADD KEY `id_carrera` (`id_carrera`),
  ADD KEY `id_piloto` (`id_piloto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carreras`
--
ALTER TABLE `carreras`
  MODIFY `id_carrera` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `circuitos`
--
ALTER TABLE `circuitos`
  MODIFY `id_circuito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pilotos`
--
ALTER TABLE `pilotos`
  MODIFY `id_piloto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `resultados`
--
ALTER TABLE `resultados`
  MODIFY `id_resultado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carreras`
--
ALTER TABLE `carreras`
  ADD CONSTRAINT `carreras_ibfk_1` FOREIGN KEY (`id_circuito`) REFERENCES `circuitos` (`id_circuito`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pilotos`
--
ALTER TABLE `pilotos`
  ADD CONSTRAINT `pilotos_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`) ON DELETE SET NULL;

--
-- Filtros para la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `resultados_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id_carrera`) ON DELETE CASCADE,
  ADD CONSTRAINT `resultados_ibfk_2` FOREIGN KEY (`id_piloto`) REFERENCES `pilotos` (`id_piloto`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
