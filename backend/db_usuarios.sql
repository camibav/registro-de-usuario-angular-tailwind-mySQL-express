create database db_usuarios;
use db_usuarios;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido varchar(50) not null,
    correo VARCHAR(100) NOT NULL ,
   password VARCHAR(255) NOT NULL
);
CREATE TABLE datos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    edad INT,
    telefono VARCHAR(20),
    foto VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id));
select *from datos;

INSERT INTO usuarios (nombre, apellido, correo, password) 
VALUES ('Camilo', 'Bacca', 'ca@hot.com','camilo12' );
INSERT INTO datos (usuario_id, edad, telefono, foto)
VALUES (1,25, 3157697148, 'ruta/de/la/foto.jpg');
