import * as videogamesServices from "../services/videogames.services.js";

export const getVideojuegosTopVentas = (request, response) =>{
    videogamesServices.getVideojuegosTopVentas().then((result)=>{
        console.log("Entrando");
        /*
        response.status(200).json({
            data : result,
        })*/
        response.send(result);

    }).catch((error)=>{
        response.status(500).send(error);
    })
};

export const getVideojuegosTopMetacritic = (request, response) =>{
    videogamesServices.getVideojuegosTopMetacritic().then((result)=>{
        response.send(result);
    }).catch((error)=>{
        //console.log("Hubo un error", error);
        response.status(500).send(error);
    })
};

export const getInfoVideogame = (request, response) => {
    const Name = request.params.Nombre;

    videogamesServices.getInfoVideogame(Name).then((result)=>{
        response.send(result);

    }).catch((error)=>{
        response.status(500).send(error);
    })

};

export const getMoreInfo = (request, response) => {

    const Name = request.params.Nombre;

    videogamesServices.getMoreInfo(Name).then((result)=>{
        response.send(result);

    }).catch((error)=>{
        response.status(500).send(error);
    })

};