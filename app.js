const express = require("express");
const path = require('path');

const app = express();
const hostname = '34.134.26.143';
const port = 8093;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(port, hostname, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
