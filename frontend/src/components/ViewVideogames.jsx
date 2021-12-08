import React, {useState,useEffect} from 'react'
import axios from "axios";
import Imagen from './Imagen';

function ViewVideogames() {
    const [vg, setVg] = useState({
        recordset : []
    });
    useEffect(()=>{
        axios({
            url: "http://localhost:8080/api/videojuegos",
            method: "GET",
          })
          .then((response) => {
            setVg(response.data);
            console.log("Datos",response.data);
          })
          .catch((error) => {
            console.log("Error", error);
          })
    },[])

    return (
        <div>
            { /*vg &&
                vg.recordset.map((videojuego, index)=>{
                    return <p key={index}>{videojuego.Nombre}</p>
                })
                */
                vg.recordset.length &&
                <div><p>{vg.recordset[50].Nombre}</p>
                    <Imagen
                        Nombre={vg.recordset[50].Nombre}
                    />
                </div>
            }
        </div>
    )
}

export default ViewVideogames
