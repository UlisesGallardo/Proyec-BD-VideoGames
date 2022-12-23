import e from "express";
import db from "../config/db.js";
import { twitchAccessToken, igdb } from 'ts-igdb-client';
import { fields, exclude, and, where ,WhereFlags} from 'ts-igdb-client';

export const getVideojuegosTopVentas = ()=>{
    
    return new Promise((resolve, reject)=>{
        var query = "select VentasGlobales, Nombre, Genero, AnioSalida from ventas join videojuego on videojuego .IDVentas = ventas .ID order by VentasGlobales desc LIMIT 100;";
       
        db.execute(query).then((result)=>{
            //console.log(result[0]);
            resolve(result[0]);
        }).catch((error)=>{
            reject(error);
        })

    });
}

export const getInfoVideogame = (Name) =>{
    return new Promise((resolve, reject)=>{


        //multiples consultas https://www.technicalkeeda.com/nodejs-tutorials/nodejs-mysql-multiple-statement-queries
        //var query = "select * from Videojuego v where v.Nombre = '"+Name+"'; select DISTINCT v.VentasGlobales, v.VentasJapon,v.VentasNorteAmerica, v.VentasUnionEuropea,v.OtrasVentas from Videojuego vv join Ventas v on v.ID = vv.IDVentas where vv.Nombre = '"+Name+"'; select DISTINCT d.Nombre Desarrollador, Ciudad, País, AnioFundacion from Videojuego v join Desarrollador d on d.ID = v.IDDesarrollador where v.Nombre = '"+Name+"'; select DISTINCT CriticasPositivas, CriticasNegativas, CriticasNeutrales, UsuariosPositivas,UsuariosNegativas, UsuariosNeutrales,PuntajeUsuarios, PuntajeMetacritic  from Videojuego v join PuntajeMetacritic p on p.ID = v.IDPuntaje where v.Nombre = '"+Name+"'";
        //console.log("Nombre", Name);
        var query = " select * from videojuego v where v.Nombre = '"+Name+"'; select DISTINCT v.VentasGlobales, v.VentasJapon,v.VentasNorteAmerica, v.VentasUnionEuropea,v.OtrasVentas from videojuego vv join ventas v on v.ID = vv.IDVentas where vv.Nombre = '"+Name+"'; select DISTINCT d.Nombre Desarrollador, Ciudad, Pais, AnioFundacion from videojuego v join desarrollador d on d.ID = v.IDDesarrollador where v.Nombre = '"+Name+"'; select DISTINCT CriticasPositivas, CriticasNegativas, CriticasNeutrales, UsuariosPositivas,UsuariosNegativas, UsuariosNeutrales,PuntajeUsuarios, PuntajeMetacritic from videojuego v join puntajemetacritic p on p.ID = v.IDPuntaje where v.Nombre = '"+Name+"';";

          db.query(query).then((results)=>{
            const datos = [];
            datos.push(results[0][0][0]);
            datos.push(results[0][1][0]);
            datos.push(results[0][2][0]);
            datos.push(results[0][3][0]);
            //console.log(datos);
            resolve(datos);
          }).catch((error)=>{
                reject(error);
            });

    });
}

export const getMoreInfo = (Name)=>{
    
    return new Promise((resolve, reject)=>{


        async function GameInfo(client, name){
            const { data } = await client.request('games') // Here the query is tagged as a "count" query because it ends with `/count`
            .pipe(fields('*'), where('name',"=",name), ) // 'name', 'games', 'collection.*'
            .execute();

            return data;
        }

        async function GenerateClient(){
            const twitchSecrets = {
                client_id: process.env.TWITCHSECRETS_CLIENT_ID,
                client_secret: process.env.TWITCHSECRETS_CLIENT_SECRET,
                }
            const accessToken = await twitchAccessToken(twitchSecrets);
            const client = igdb(twitchSecrets.client_id, accessToken);

            return client;
        }

        async function GetImage(client, gameID){
            const { data } = await client.request('covers') // Here the query is tagged as a "count" query because it ends with `/count`
                .pipe(fields("*"),where("game","=",gameID)) // 'name', 'games', 'collection.*' where('game','>=',198690) 
                .execute();
            return data;
        }

        GenerateClient().then((client)=>{

            GameInfo(client, Name).then((id)=>{
                console.log(id);
                GetImage(client, id[0]["id"]).then((data)=>{
                    console.log(data);
                    //return data;
                    resolve(data);
                }).catch((error)=>{
                    reject (error);
                })
            }).catch((error)=>{
                reject (error);
            })

            
            
        })

    });
}