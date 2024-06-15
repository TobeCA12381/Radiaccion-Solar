const http = require('node:http');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const hostname = '34.134.26.143';
const port = 8093;

// Ruta al directorio de archivos estáticos y vistas
const publicDir = path.join(__dirname, 'public');
const viewsDir = path.join(__dirname, 'views');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Renderizar la vista EJS
    const filePath = path.join(viewsDir, 'index.ejs');
    ejs.renderFile(filePath, {}, (err, str) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error al renderizar la vista EJS');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(str);
      }
    });
  } else {
    // Servir archivos estáticos
    const staticFilePath = path.join(publicDir, req.url);
    fs.readFile(staticFilePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Archivo no encontrado');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', getContentType(req.url));
        res.end(data);
      }
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Función para obtener el tipo de contenido según la extensión del archivo
function getContentType(url) {
  const ext = path.extname(url);
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'application/javascript';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}
