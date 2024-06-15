const express = require('express');
const path = require('path');

const app = express();
const hostname = '34.134.26.143';  // Tu hostname específico
const port = 80;  // Puerto estándar HTTP

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');

// Configurar el directorio de vistas
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos (CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.render('index');
});

// Iniciar el servidor
app.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
