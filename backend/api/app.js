import db from "./config/db.js";
import express from "express";
import indexRouter from "./routes/index.route.js";

import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

//Conexión a la base de datos
db.connect().then(()=>{
    console.log("Conectado con éxito");
}).catch((error)=>{
    console.log("Error : ", error);
});

//Rutas
app.use("/", indexRouter);

//Inica el servidor
const PORT = process.env.PORT || 8081;
app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto ", PORT);
})

