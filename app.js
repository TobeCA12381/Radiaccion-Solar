const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const hostname = '34.134.26.143';
const port = 8093;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const filePath = path.join(__dirname, 'index.ejs');
    
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error interno del servidor');
        return;
      }

      ejs.renderFile(filePath, {}, {}, (err, str) => {
        if (err) {
          res.writeHead(500);
          res.end('Error al renderizar EJS');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(str);
      });
    });
  } else {
    res.writeHead(404);
    res.end('Página no encontrada');
  }
});

server.listen(port, hostname, () => {
  console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
