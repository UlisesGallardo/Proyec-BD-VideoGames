import {Router} from "express";

import videogamesinfoRouter from "./videogames.route.js";

const indexRouter = Router();
const prefix = "/api";

indexRouter.get(prefix, (req, res)=>{
    res.send("Bienvenido a la API");
})

indexRouter.use(`${prefix}/videojuegos`, videogamesinfoRouter);

export default indexRouter;