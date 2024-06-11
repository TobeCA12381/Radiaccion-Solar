const express= require("express")

const app = express()

app.get("/Juan",(req,res)=>{

    res.send("Hola beto")
})

app.listen(3000,(req,res)=> {
    console.log("Corriendo  en el puerto 3000")

})