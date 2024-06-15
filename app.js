const express= require("express")

const app = express()

const path = require('path');

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",(req,res)=>{

    res.render("index")
})

app.listen(3000,'34.134.26.143',(req,res)=> {
    console.log("Corriendo  en el puerto 3000")

})
