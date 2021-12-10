import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Carta from "./Card"
import Chart from "./Chart"
import { Card, Col, Container, Row} from 'react-bootstrap';

function ViewResult() {
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
                    console.log("Datos desde ViewIndividual",response.data[3][0] );
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
                    picture && datos && info && (       //validar todo
                        <>
                            <Col>
                            <Container>
                                <Carta img = {picture.original} datos = {datos} nombre = {juego} className="info"/>
                            </Container>
                            <Container>                            
                                {info[1].length ? <Chart informacion = {{data: info[1][0], labels: ['VentasJapon', 'VentasNorteAmerica', 'VentasUnionEuropea','OtrasVentas'], titulo:'ventas en millones', colores:'blue'}} /> : ""}
                            
                                {info[3].length ? <Chart 
                                                    informacion = {{data:  (({ CriticasPositivas, CriticasNegativas, CriticasNeutrales}) => ({ CriticasPositivas, CriticasNegativas, CriticasNeutrales}))(info[3][0]), //https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
                                                    labels: ['CriticasPositivas', 'CriticasNegativas', 'CriticasNeutrales'], 
                                                    titulo:'Criticas', 
                                                    colores:['green','red','grey']}} 
                                                    /> : ""}
                                {info[3].length ? <Chart 
                                                    informacion = {{data: (({ UsuariosPositivas, UsuariosNegativas, UsuariosNeutrales}) => ({ UsuariosPositivas, UsuariosNegativas, UsuariosNeutrales}))(info[3][0]), 
                                                    labels: ['UsuariosPositivas','UsuariosNegativas','UsuariosNeutrales'], 
                                                    titulo:'Criticas Usuarios', 
                                                    colores:['green','red','grey']}} 
                                                    /> : ""}

                                {info[3].length ? <Chart 
                                                    informacion = {{data: (({ PuntajeUsuarios, PuntajeMetacritic}) => ({ PuntajeUsuarios, PuntajeMetacritic}))(info[3][0]), 
                                                    labels: ['PuntajeUsuarios','PuntajeMetacritic'], 
                                                    titulo:'PuntajeMetacritic', 
                                                    colores:'green'}} 
                                                    /> : ""}
                            </Container>
                            </Col>
                        </>
                    )
                }     
            </div>
        </div>
    )
}

export default ViewResult
