import React, { Component } from 'react'
import {useLocation} from 'react-router-dom';
import { Chart as ChartJS } from 'chart.js/auto'
import { Container } from 'react-bootstrap';
import { Bar} from 'react-chartjs-2';


function InfoGame() {
    const location = useLocation(); 
    var informacion = location.state.Info;
    console.log(informacion);


    var platforms = informacion["platforms"];
    var stores = informacion["stores"];
    var ratings = informacion["ratings"];
    var short_screenshots = informacion["short_screenshots"];

    var titulos = []
    var porcentaje = []
    for (const item of ratings) {
      titulos.push(item["title"])
      porcentaje.push(item["percent"])
    }

    

    const labels = ['exceptional', 'recommended', 'meh', 'skip'];
    const values = ratings.map((item) => item["count"])
    console.log(titulos, porcentaje, labels)

    const data = {
      labels,
      datasets: [
        {
          label: 'Ratings de Usuarios',
          data: values,
          backgroundColor: 'rgba(205, 92, 92, 1)',
        }
      ],
    };

    return (
        <Container>
          <div>
              <center><h1>{informacion['name'] }</h1></center>
              
            <ul>
                {platforms.map((item, index) => ( 
                  <div key={index}>
                    <div>{item["platform"]["name"]}</div>
                    
                  </div>
                ))}
            </ul>

            <p>Dónde comprar?</p>

            <ul>
                {stores && stores.map((item, index) => ( 
                  <div key={index}>
                    <div>{item["store"]["name"]}</div>
                    
                  </div>
                ))}
            </ul>

            <div>
                <Bar data={data}  options={{ maintainAspectRatio: true }}/>
            </div>

            <h1>Short_screenshots</h1>
            <ul>
                {short_screenshots.map((item, index) => ( 
                  <div key={index}>
                      <img src={item["image"]} className='img-fluid shadow-4' alt='...' />
                  </div>
                ))}
            </ul>
          </div>
          
        </Container>      
      )
}

export default InfoGame
