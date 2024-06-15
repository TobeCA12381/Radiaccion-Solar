const http = require('node:http');

const hostname = '0.0.0.0';
const port = 8093;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/json');
  let arreglo = [{
    nombre:"Juan",
    apellido:"Perez"
    },
    {
    nombre:"Betox",
    apellido:"Alarcon"
    },
    {
    nombre:"Anthony",
    apellido:"Garcia"
    }
    ]
    
    res.write(JSON.stringify(arreglo));  
    res.end('');
    
  });



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 
