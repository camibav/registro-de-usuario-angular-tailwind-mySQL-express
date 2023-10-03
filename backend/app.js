const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const fs = require("fs");
const path = require("path"); // Módulo para manejar rutas
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

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

const directorioUploads = "uploads";

if (!fs.existsSync(directorioUploads)) {
  // Crear el directorio si no existe
  fs.mkdir(directorioUploads, (err) => {
    if (err) {
      console.error("Error al crear la carpeta 'uploads':", err);
    } else {
      console.log("Carpeta 'uploads' creada");
    }
  });
} else {
  console.log("La carpeta 'uploads' ya existe");
}

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
    res.status(201).json({ message: "Usuario registrado exitosamente" });
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
      return res
        .status(401)
        .json({ message: "Correo o contraseña incorrectos" });
    }
    const userId = result[0].id; // Obtén el ID del usuario
    console.log(userId);
    res.status(200).json({ message: "Usuario inicio sesión exitosamente", userId }); // Incluye userId en la respuesta JSON
  });
});

//Ruta para obtener datos de un usuario
app.get("/usuarios/:userId", (req, res) => {
const { userId } = req.params;
const sql = `SELECT * FROM usuarios WHERE id = ?`;
const values = [userId];
connection.query(sql, values, (err, result) => {
 if (err) {
   console.error("Error al obtener datos de usuario:", err);
   return res.status(400).json({ message: "Error al obtener datos de usuario" });
 }
  if (result.length === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  const usuario = result[0];
  res.status(200).json({ message: "Usuario obtenido exitosamente", usuario });
})
})


//Ruta para registrar datos de un usuario
app.post("/datos", (req, res) => {
  const { userId, edad, telefono } = req.body;

  if (!userId || !edad || !telefono || !req.files.foto) {
    return res.status(400).json({ message: "Faltan campos por llenar" });
  }

  // Convertir userId y edad a números
  const numericUserId = parseInt(userId);
  const numericEdad = parseInt(edad);

  const foto = req.files.foto;
  const uploadPath = path.join(__dirname, "uploads", foto.name);

  foto.mv(uploadPath, (err) => {
    if (err) {
      console.error("Error al subir la foto:", err);
      return res.status(500).json({ message: "Error al subir la foto" });
    }

    const sql = `INSERT INTO datos (userId, edad, telefono, foto) VALUES (?, ?, ?, ?)`;
    const values = [numericUserId, numericEdad, telefono, uploadPath];

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error al registrar datos:", err);
        return res.status(400).json({ message: "Error al registrar datos" });
      }
      console.log("Datos registrados con ID:", result.insertId);
      res.status(201).json({ message: "Datos registrados exitosamente" });
    });
  });
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express.js en funcionamiento en el puerto ${PORT}`);
});
