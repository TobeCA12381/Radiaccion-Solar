const http = require('node:http');
const express = require('express');
const path = require('path');

const app = express();
const hostname = '34.134.26.143';
const port = 8093;

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

// Crear el servidor HTTP con la aplicación Express
const server = http.createServer(app);

// Iniciar el servidor
server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
