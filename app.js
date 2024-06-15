const app = express()

const path = require('path');

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",(req,res)=>{

    res.render("index")
})

app.listen(8093,'0.0.0.0',(req,res)=> {
    console.log("Corriendo  en el puerto 0893")

})
