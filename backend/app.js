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
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    throw err;
  }
  console.log("Conectado a la base de datos!");
});

// Ruta para registrar un usuario
app.post("/registrar", (req, res) => {
  const { nombre, apellido, correo, password } = req.body;

  if (!nombre || !apellido || !correo || !password) {
    return res.status(400).json({ message: "Faltan campos por llenar" });
  }

  const sql = `INSERT INTO usuarios (nombre, apellido, correo, password) VALUES (?, ?, ?, ?)`;
  const values = [nombre, apellido, correo, password];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al registrar usuario:", err);
      return res.status(400).json({ message: "Error al registrar usuario" });
    }
    console.log("Usuario registrado con ID:", result.insertId);
    res.status(201).json({ message: "Usuario registrado exitosamente" })
  });
});

//Ruta para iniciar sesión
app.post("/login", (req, res) => {
 const { correo, password } = req.body;
 if (!correo || !password) {
   return res.status(400).json({ message: "Faltan campos por llenar" });
 }
  const sql = `SELECT * FROM usuarios WHERE correo = ? AND password = ?`;
  const values = [correo, password];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al iniciar sesión:", err);
      return res.status(400).json({ message: "Error al iniciar sesión" });
    }
    if (result.length === 0) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos" });
    }
    console.log("Usuario inicio sesión con ID:", result[0].id);
    res.status(200).json({ message: "Usuario inicio sesión exitosamente" })
  })
})

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express.js en funcionamiento en el puerto ${PORT}`);
});
