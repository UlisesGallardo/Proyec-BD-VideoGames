import React, { Component } from 'react'
import {useLocation} from 'react-router-dom';

function InfoGame() {
    const location = useLocation(); 
    var informacion = location.state.Info;
    console.log(informacion);
    return (
        <div>Info </div>
      )
}

export default InfoGame
