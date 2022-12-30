import {Router} from "express";
import {getVideojuegosTopVentas, getInfoVideogame, getMoreInfo, getVideojuegosTopMetacritic} from  "../controller/videogames.controller.js";

const videogamesinfoRouter = Router();

videogamesinfoRouter.get("/", (req, res)=>{
    res.send("Videojuegos");
})

videogamesinfoRouter.get('/topVentas',getVideojuegosTopVentas);
videogamesinfoRouter.get('/MasInformacion/:Nombre',getMoreInfo);
videogamesinfoRouter.get('/topMetacritic',getVideojuegosTopMetacritic);
videogamesinfoRouter.get('/search/:Nombre',getInfoVideogame);


export default videogamesinfoRouter;