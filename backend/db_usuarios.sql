create database db_usuarios;
use db_usuarios;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido varchar(50) not null,
    correo VARCHAR(100) NOT NULL ,
   password VARCHAR(255) NOT NULL
);
select *from usuarios;
INSERT INTO usuarios (nombre, apellido, correo, password) VALUES ('Camilo', 'Bacca', 'ca@hot.com','camilo12' )
