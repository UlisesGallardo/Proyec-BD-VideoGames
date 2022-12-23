import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Carta from "./Card"
import Chart from "./Chart"
import { Card, Col, Container, Row} from 'react-bootstrap';
import ReactLoading from 'react-loading';


function ViewIndividual()  {
    const location = useLocation(); //Propiedades pasadas desde el navbar

    const [juego, setJuego] = useState("")
    const [info, setInfo] = useState()          //usar loader skeleton
    const [picture, setPicture] = useState('')
    var datos = []

        const  imagen  = ()=>{
            axios({
                url: process.env.REACT_APP_SERVER_URL + "/api/videojuegos/MasInformacion/"+location.state.Nombre,
                method: "GET",
            })
            .then((response) => {
                setPicture(response.data[0]["url"])
                //console.log("Respuesta",response.data[0]["url"]);
            })
            .catch((error) => {
                console.log("Error", error);
                setPicture("https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg");
            })
        }
        

        useEffect(()=>{
            if( location.state &&location.state.Nombre){
                datos = []
                
                console.log("juego", location.state.Nombre);
                axios({
                    url: process.env.REACT_APP_SERVER_URL + "/api/videojuegos/"+location.state.Nombre,
                    method: "GET",
                })
                .then((response) => {
                    imagen();
                
                    setJuego(location.state.Nombre)
                    var res = response.data;
                    setInfo(() => {  return res.map((item) => item) })
                })
                .catch((error) => {
                console.log("Error", error);
                })
            }
        }, [location.state ? location.state.Nombre : juego])
    

    if(info){

        //console.log("Info ->",info);

        info.map((Arreglo)=>{
            //console.log(Arreglo);     
            for (var prop in Arreglo) {
                datos.push({prop: prop, valor: Arreglo[prop]})
            }
        })
    }
    
    return (
        <div>
            <div className="main">
                {
                    (datos.length && info && picture !== '' ) ? (       //validar todo
                        <>
                            <Col>
                            <Container>
                                <Carta img = {picture} datos = {datos} nombre = {juego} className="info"/> 
                            </Container>
                            <Container>                            
                                {info[1] ? <Chart informacion = {{data: info[1], labels: ['VentasJapon', 'VentasNorteAmerica', 'VentasUnionEuropea','OtrasVentas'], titulo:'ventas en millones', colores:'blue'}} /> : "" }
                            
                                {info[3] ? <Chart 
                                                    informacion = {{data:  (({ CriticasPositivas, CriticasNegativas, CriticasNeutrales}) => ({ CriticasPositivas, CriticasNegativas, CriticasNeutrales}))(info[3]), //https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
                                                    labels: ['CriticasPositivas', 'CriticasNegativas', 'CriticasNeutrales'], 
                                                    titulo:'Criticas', 
                                                    colores:['green','red','grey']}} 
                                                    /> : ""}
                                {info[3] ? <Chart 
                                                    informacion = {{data: (({ UsuariosPositivas, UsuariosNegativas, UsuariosNeutrales}) => ({ UsuariosPositivas, UsuariosNegativas, UsuariosNeutrales}))(info[3]), 
                                                    labels: ['UsuariosPositivas','UsuariosNegativas','UsuariosNeutrales'], 
                                                    titulo:'Criticas Usuarios', 
                                                    colores:['green','red','grey']}} 
                                                    /> : ""}

                                {info[3] ? <Chart 
                                                    informacion = {{data: (({ PuntajeUsuarios, PuntajeMetacritic}) => ({ PuntajeUsuarios, PuntajeMetacritic}))(info[3]), 
                                                    labels: ['PuntajeUsuarios','PuntajeMetacritic'], 
                                                    titulo:'PuntajeMetacritic', 
                                                    colores:'green'}} 
                                                    /> : ""}
                            </Container>
                            </Col>
                        </>
                    ) :     <ReactLoading type = {"bars"} color = {"#2E4053"} height={'10%'} width={'10%'} />
                }     
            </div>
        </div>
    )
}

export default ViewIndividual
