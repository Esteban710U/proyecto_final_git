-- Esquema del sistema de inscripción - Universidad de Antioquia
CREATE DATABASE IF NOT EXISTS proyecto_final CHARACTER SET utf8mb4;
USE proyecto_final;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  puntaje_admision DECIMAL(5,2) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  facultad VARCHAR(150) NOT NULL,
  universidad VARCHAR(150) NOT NULL DEFAULT 'Universidad de Antioquia',
  puntaje_minimo DECIMAL(5,2) NOT NULL,
  cupos INT NOT NULL DEFAULT 30
);

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  program_id INT NOT NULL,
  estado VARCHAR(30) NOT NULL DEFAULT 'inscrito',
  fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);
