-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-12-2024 a las 17:26:09
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
-- Base de datos: `records`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `nombre` text NOT NULL,
  `apellidos` text NOT NULL,
  `nivel` text NOT NULL,
  `tiempo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`nombre`, `apellidos`, `nivel`, `tiempo`) VALUES
('David', 'Gonzalez', 'Facil', 0.06),
('Manuel', 'Sanchez', 'Medio', 0.245),
('Ainhoa', 'Castellon', 'Facil', 0.081),
('Sergio', 'Navajas', 'Dificil', 0.312),
('David', 'Gonzalez', 'Dificil', 0.123),
('Daniel', 'Grande', 'Medio', 0.25),
('Paco', 'Lagos', 'Dificil', 0.473),
('David', 'Gonzalez', 'Facil', 0.004),
('David', 'Gonzalez', 'Medio', 0.273),
('Manuel ', 'Sanchez', 'Dificil', 0.324),
('David', 'Gonzalez', 'Medio', 0.152),
('Daniel', 'Grande', 'Facil', 0.214),
('Ainhoa', 'Castellon', 'Dificil', 0.326),
('David', 'Gonzalez', 'Dificil', 0.318),
('Manuel', 'Verver', 'Dificil', 0.327),
('Antonio', 'Castro', 'Facil', 0.076),
('Juja', 'Milanovo', 'Dificil', 0.332),
('Paco', 'Lagos', 'Medio', 0.102),
('David', 'Gonzalez', 'Dificil', 0.167),
('Fernando', 'Torres', 'Dificil', 0.136),
('Ivan', 'Fernandez', 'Facil', 0.082),
('David', 'Gonzalez', 'Medio', 0.048),
('David', 'Gonzalez', 'Medio', 0.181),
('Samuel', 'Sella', 'Medio', 0.19),
('Ivan', 'Fernandez', 'Dificil', 0.341),
('Pedro', 'Picapiedra', 'Medio', 0.193),
('Toni', 'Gambino', 'Facil', 0.089),
('Daniel', 'Grande', 'Dificil', 0.312);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
