const express = require("express"); // Importar el módulo express
const path = require('path');

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(8093, '0.0.0.0', () => {
    console.log("Corriendo en el puerto 8093");
});
