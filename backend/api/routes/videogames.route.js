import {Router} from "express";
import {getVideojuegosTopVentas, getInfoVideogame, getMoreInfo} from  "../controller/videogames.controller.js";

const videogamesinfoRouter = Router();

videogamesinfoRouter.get("/", (req, res)=>{
    res.send("Videojuegos");
})

videogamesinfoRouter.get('/topVentas',getVideojuegosTopVentas);
videogamesinfoRouter.get('/:Nombre',getInfoVideogame);
videogamesinfoRouter.get('/MasInformacion/:Nombre',getMoreInfo);


export default videogamesinfoRouter;