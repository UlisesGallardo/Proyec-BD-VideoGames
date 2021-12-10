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
    database: 'videojuegos',
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

app.get('/api/videojuegos/busqueda/:Nombre', function(request, response){
    const Name = request.params.Nombre;
    var sql = require("mssql"); 
    sql.connect(configsql, function(err){

        if(err)console.log(err);
        var querystring = "select *  from Videojuego vg where vg.Nombre like '"+Name+"%' ";

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

app.get('/api/videojuegos/topVentas', function(request, response){
    var sql = require("mssql"); 
    sql.connect(configsql, function(err){
        if(err)console.log(err);
        var querystring = "select TOP(100) vv.VentasGlobales, v.Nombre, v.Genero, v.AnioSalida from Ventas vv join Videojuego v on v.IDVentas = vv.ID order by VentasGlobales desc";

        var result = new sql.Request();

        result.query(querystring, function(error, recordset){
            if(error){
                console.log("Error",error);
                response.sendStatus(400);
            }
            console.log("datos desde backend topventas",recordset.recordset)
            response.send(recordset.recordset);
        })  
    });
});

app.get('/api/videojuegos/topPuntaje', function(request, response){
    var sql = require("mssql"); 
    sql.connect(configsql, function(err){
        if(err)console.log(err);
        var querystring = "select TOP(150) p.PuntajeMetacritic, v.Nombre, v.Genero, v.AnioSalida from PuntajeMetacritic p join Videojuego v on v.IDPuntaje = p.ID order by p.PuntajeMetacritic desc";

        var result = new sql.Request();

        result.query(querystring, function(error, recordset){
            if(error){
                console.log("Error",error);
                response.sendStatus(400);
            }
            console.log("datos desde backend topventas",recordset.recordset)
            response.send(recordset.recordset);
        })  
    });
});

app.get('/api/videojuegos/:Nombre', function(request, response){
    const Name = request.params.Nombre;

    //Devolver un arreglo de objetos donde el ID de los Puntajes, Ventas o Desarrollador sea distinto de NULL
    const datos = []

    var sql = require("mssql"); 
    sql.connect(configsql, function(err){

        //multiples consultas https://www.technicalkeeda.com/nodejs-tutorials/nodejs-mysql-multiple-statement-queries
        if(err)console.log(err);
        var querystring = "select * from Videojuego v where v.Nombre = '"+Name+"'; select DISTINCT v.VentasGlobales, v.VentasJapon,v.VentasNorteAmerica, v.VentasUnionEuropea,v.OtrasVentas from Videojuego vv join Ventas v on v.ID = vv.IDVentas where vv.Nombre = '"+Name+"'; select DISTINCT d.Nombre Desarrollador, Ciudad, País, AnioFundacion from Videojuego v join Desarrollador d on d.ID = v.IDDesarrollador where v.Nombre = '"+Name+"'; select DISTINCT CriticasPositivas, CriticasNegativas, CriticasNeutrales, UsuariosPositivas,UsuariosNegativas, UsuariosNeutrales,PuntajeUsuarios, PuntajeMetacritic  from Videojuego v join PuntajeMetacritic p on p.ID = v.IDPuntaje where v.Nombre = '"+Name+"'";

        var result = new sql.Request();

        result.query(querystring, function(error, recordset){
            if(error){
                console.log("Error",error);
                response.sendStatus(400);
            }        
            response.send(recordset.recordsets);
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

//api/videojuego/validar
app.get('/api/videojuego/validar/:Nombre', function(request, response){
    const Name = request.params.Nombre;
    var sql = require("mssql"); 
    sql.connect(configsql, function(err){

        if(err)console.log(err);
        var querystring = "select count(1) existe from Videojuego where Nombre = '"+Name+"' ";

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

app.get("/", (req, res)=>{
    res.send("hola mundo");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto ", PORT);
})