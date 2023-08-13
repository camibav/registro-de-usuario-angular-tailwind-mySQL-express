create database db_usuarios;
use db_usuarios;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apelllido varchar(50) not null,
    correo VARCHAR(100) NOT NULL unique,
    contraseña VARCHAR(255) NOT NULL
);

