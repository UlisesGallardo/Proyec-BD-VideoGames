import { Card, Button, Container, Nav } from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import axios from "axios";
import {useEffect} from "react"


function HomePage() {
    let navigate = useNavigate();
    const TopVentas = ()=>{
        navigate('/toppage', {state:{top:true}});
    }

    const TopPuntaje = ()=>{
        navigate('/TopPageMetacritic');
    }

    const search = ()=>{
        navigate('/search');
    }

    
    /*
    useEffect(()=>{

        axios({
            url: "https://api.igdb.com/v4/games",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Client-ID': 'den4dtbz6v6fpyv7pi9zs2anp1ivpl',
                'Authorization': 'Bearer fm709n7tam6nsqlk8wvsyqmnv85kq2',
        },
        data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.error(err);
        });
    
    },[])*/

    return (
        <div>
            <Container>
                <Card bg="dark" text="light" border="info" className="text-center mt-5">
                    <Card.Header>Top Ventas</Card.Header>
                    <Card.Body>
                        <Card.Title>Conoce los juegos más vendidos.</Card.Title>
                        <Card.Text>
                        Aquí podrás ver las ventas globales y por región de muchos videojuegos de los últimos tiempos.
                        </Card.Text>
                        <Button variant="outline-info" onClick={TopVentas}>Ver</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Juegos entre 1980 y 2017.</Card.Footer>
                </Card>
                <Card bg="dark" text="light" border="info" className="text-center mt-5">
                    <Card.Header>Top Calificación</Card.Header>
                    <Card.Body>
                        <Card.Title>Conoce los juegos mejor valorados.</Card.Title>
                        <Card.Text>
                        Aquí podrás ver los puntajes de los usuarios y de la crítica especializada de muchos videojuegos de los últimos tiempos.
                        </Card.Text>
                        <Button variant="outline-info" onClick={TopPuntaje}>Ver</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Juegos entre 2011 y 2019.</Card.Footer>
                </Card>
                <Card bg="dark" text="light" border="info" className="text-center mt-5 mb-5">
                    <Card.Header>Búsqueda avanzada</Card.Header>
                    <Card.Body>
                        <Card.Title>Conoce juegos de acuerdo a las características que tú definas.</Card.Title>
                        <Card.Text>
                        Aquí podrás buscar juegos y ordenarlos de acuerdo al criterio que tú decidas.
                        </Card.Text>
                        <Button variant="outline-info" onClick={search}>Ver</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Experimenta y conoce.</Card.Footer>
                </Card>
            </Container>
        </div>
    )
}

export default HomePage
