import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Imagen from './Imagen';
import Carta from "./Card"

function ViewIndividual() {
    const location = useLocation(); //Propiedades pasadas desde el navbar

    const [juego, setJuego] = useState("")
    const [info, setInfo] = useState()          //usar loader skeleton
    const [picture, setPicture] = useState({})
    var datos = []
    

    const imagen =(Nombre)=>{
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
            if( location.state &&location.state.Nombre){
                datos = []
                
                console.log("juego", location.state.Nombre);
                axios({
                    url: "http://localhost:8080/api/videojuegos/"+location.state.Nombre,
                    method: "GET",
                })
                .then((response) => {
                    imagen(location.state.Nombre)
                    setJuego(location.state.Nombre)
                    setInfo(response.data);
                    console.log("Datos desde ViewIndividual",response.data);
                })
                .catch((error) => {
                console.log("Error", error);
                })
            }
        }, [location.state ? location.state.Nombre : juego])
    

    if(info){
        info.map((Arreglo)=>{
            for (var prop in Arreglo[0]) {
                if (Object.prototype.hasOwnProperty.call(Arreglo[0], prop)) {
                    datos.push({prop: prop, valor: Arreglo[0][prop]}); //https://stackoverflow.com/questions/8312459/iterate-through-object-properties?rq=1
                }
            }
        })
    }
    
    return (
        <div>
            <div className="main">
                {
                    picture && datos && <Carta img = {picture.original} datos = {datos} nombre = {juego} className="info"/>
                }
            </div>
        </div>
    )
}

export default ViewIndividual
