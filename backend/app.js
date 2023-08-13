const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1161202CAmi",
  database: "db_usuarios",
  port: "3306",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express.js en funcionamiento en el puerto ${PORT}`);
});

//Ruta para registrar un usuario
app.post("/register", (req, res) => {
  const { nombre, apellido, correo, contraseña } = req.body;
  if (!nombre || !apellido || !correo || !contraseña) {
    res.status(400).send("Faltan datos");
    return;
  }
  const sql = `INSERT INTO usuarios (nombre, apellido, correo, contraseña) VALUES ('${nombre}', '${apellido}', '${correo}', '${contraseña}')`;
    connection.query(sql, (err, result) => {
        if(err){
            res.status(400).send("Error al registrar usuario");
            return;
        }
        res.status(201).send("Usuario registrado");
    })
});
