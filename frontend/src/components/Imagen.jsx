import React, {useEffect, useState} from 'react'
import axios from "axios";

function Imagen(props) {
    const [picture, setPicture] = useState({})


    const img = (Nombre)=>{
        axios({
            url: "http://localhost:8080/api/videojuegos/imagenes/"+Nombre,
            method: "GET"
          })
          .then((response) => {
            setPicture(response.data);
          })
          .catch((error) => {
            console.log("Error", error);
          })
    }

    useEffect(()=>{
        img(props.Nombre);
    },[])


    return (
        <div>
            {picture.original && <img src = {picture.original} width="25%" ></img>}
        </div>
    )
}

export default Imagen
