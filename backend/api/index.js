const express  = require("express");
const app = express();
const cors = require("cors");
const bodyParser  = require("body-parser");
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const configsql={
    user:'uservideojuego',
    password: 'videogame123',
    server: 'localhost',
    database: 'BasedeDatos',
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true, 
        trustServerCertificate:true
    }
}

app.use(bodyParser.json());

app.get('/api/videojuegos', function(request, response){
    var sql = require("mssql"); 
    var filter = request.query.filter; 
    sql.connect(configsql, function(err){

        if(err)console.log(err);
        var querystring = "select Nombre from Videojuego";

        var result = new sql.Request();

        result.query(querystring, function(error, recordset){
            if(error){
                console.log("Error",error);
                response.sendStatus(400);
            }
            response.send(recordset);
        })  
    });
});

app.get('/api/videojuegos/imagenes/:Nombre', function(request, response){

    const Name = request.params.Nombre;
    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("caafe413d176a2ead96cb23481f144c5b2730531acdcf13c72b4c0f926bd4e86");

    const params = {
    q: Name+" cover",
    tbm: "isch",
    ijn: "0"
    };

    const callback = function(data) {
        response.send(data['images_results'][0]);
        //console.log(data['images_results']);
    };
    search.json(params, callback);    
});

app.get("/", (req, res)=>{
    res.send("hola mundo");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto ", PORT);
})