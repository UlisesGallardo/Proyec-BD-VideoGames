
select  *  from Videojuego

select  * from Desarrollador

select * from videogames

select  * from PuntajeMetacritic

select * from metacritic_games

select * from Ventas

select * from vgsales



select d.ID, d.Nombre, v.name from videogames v
join Desarrollador d on d.Nombre = v.developer


update Videojuego 
set Videojuego.IDVentas = vgsales.rank
from Videojuego 
join vgsales  on Videojuego.Nombre = vgsales.Name
join Ventas ve on ve.ID = vgsales.rank


update Videojuego
set Videojuego.IDDesarrollador = d.ID
from Videojuego vv
join videogames v on v.name = vv.Nombre
join Desarrollador d on d.Nombre = v.developer

/*Verificar*/
select  Videojuego.Nombre, d.Nombre  from Videojuego
join Desarrollador d on d.ID = Videojuego.IDDesarrollador


/*Llenar tabla PuntajeMetacritic*/

select * from metacritic_games
join Videojuego v on v.Nombre = metacritic_games.game			/*de metacritic_games se puede obtener los desarrolladores faltantes*/ 

/*Agregar el id del videojuego a la tabla de metacritic_games*/

/*
Opcion 1

ALTER TABLE Videojuego
DROP CONSTRAINT IDPuntaje


ALTER TABLE Videojuego DROP COLUMN IDPuntaje
ALTER TABLE PuntajeMetacritic ADD IDVideojuego INT NULL FOREIGN KEY REFERENCES Videojuego(ID);

select * from Videojuego where Videojuego.IDPuntaje!=NULL

*/


/*Opcion 2, obtener el promedio de las plataformas*/
SELECT DISTINCT SUM(convert(INT,positive_critics)) CriticasPostivas, 
SUM(convert(INT, negative_critics)) CriticasNegativas, SUM(convert(INT,neutral_critics)) CriticasNeutrales, 
SUM(convert (INT, positive_users))UsuariosPositivas, SUM(convert(INT,negative_users))UsuariosNegativas,
SUM(convert(INT,neutral_users))UsuariosNeutrales, AVG(ALL user_score) PuntajeUsuarios, AVG(ALL metascore)PuntajeMetacritic, game Nombre
FROM metacritic_games group by game 

/*
SELECT * FROM metacritic_games  where game = '7 Days to Die'
ALTER TABLE PuntajeMetacritic ADD Nombre nvarchar(max) NULL;
*/
--insert into Ventas(VentasNorteAmerica,VentasUnionEuropea,VentasJapon,OtrasVentas,VentasGlobales)
--select NA_Sales, EU_Sales, JP_Sales, Other_Sales, Global_Sales from vgsales


insert into PuntajeMetacritic
(CriticasPositivas,CriticasNegativas,CriticasNeutrales,UsuariosPositivas,UsuariosNegativas, UsuariosNeutrales,PuntajeUsuarios ,PuntajeMetacritic, Nombre)
SELECT DISTINCT SUM(convert(INT,positive_critics)) CriticasPostivas, 
SUM(convert(INT, negative_critics)) CriticasNegativas, SUM(convert(INT,neutral_critics)) CriticasNeutrales, 
SUM(convert (INT, positive_users))UsuariosPositivas, SUM(convert(INT,negative_users))UsuariosNegativas,
SUM(convert(INT,neutral_users))UsuariosNeutrales, AVG(ALL user_score) PuntajeUsuarios, AVG(ALL metascore)PuntajeMetacritic, game Nombre
FROM metacritic_games group by game 


update Videojuego
set Videojuego.IDPuntaje = p.ID
from Videojuego vv
join PuntajeMetacritic p on p.Nombre = vv.Nombre


select * from Videojuego v
join PuntajeMetacritic p on p.ID = v.IDPuntaje 

select *  from Videojuego 

/*
select distinct rating, game from metacritic_games m
join Videojuego v on v.Nombre = m.game order by game
*/

/*Actualizando Clasificacion de videojuegos*/
update Videojuego 
set Videojuego.Clasificacion = m.rating
from Videojuego v
join metacritic_games m  on v.Nombre = m.game

select * from Videojuego where Clasificacion is not NULL and IDDesarrollador is not NULL and IDVentas is not NULL and IDPuntaje is not NULL

insert into Plataforma (Nombre)
(select PLATFORM from vgsales
UNION 
select platform from metacritic_games)

select *  From Plataforma
select * from videogames

ALTER TABLE Plataforma
ALTER COLUMN Compania nvarchar(100) NULL

/*LLenado de tabla plataforma*/

update Plataforma
set Compania = 'Nintendo', FechaSalida = '2012-11-18' 
from Plataforma
where Nombre = 'WiiU'

update Plataforma
set Compania = 'Nintendo', FechaSalida = '1989-04-21' 
from Plataforma
where Nombre = 'GB'

update Plataforma
set Compania = 'Sony Computer Entertainment', FechaSalida = '2011-12-17' 
from Plataforma
where Nombre = 'VITA'

update Plataforma
set Compania = 'Nintendo', FechaSalida = '1996-06-23' 
from Plataforma
where Nombre = 'N64'

update Plataforma
set Compania = 'Microsoft', FechaSalida = '2005-11-22' 
from Plataforma
where Nombre = 'X360'

update Plataforma
set Compania = 'NEC Home Electronics', FechaSalida = '1987-09-30' 
from Plataforma
where Nombre = 'TG16'

update Plataforma
set Compania = 'Microsoft', FechaSalida = '2001-11-15' 
from Plataforma
where Nombre = 'XB'

update Plataforma
set Compania = 'Atari, Inc.', FechaSalida = '1977-09-1' 
from Plataforma
where Nombre = '2600'


update Plataforma
set Compania = 'The 3DO Company', FechaSalida = '1993-10-4' 
from Plataforma
where Nombre = '3DO'

update Plataforma
set Compania = 'Sega', FechaSalida = '1990-10-6' 
from Plataforma
where Nombre = 'GG'

update Plataforma
set Compania = 'Sony Interactive Entertainment', FechaSalida = '2013-11-15' 
from Plataforma
where Nombre = 'PS4'

update Plataforma
set Compania = 'Sony, Foxconn y ASUS para la SCEI1​', FechaSalida = '2006-11-06' 
from Plataforma
where Nombre = 'PS3'

update Plataforma
set Compania = 'Sony​', FechaSalida = '2000-03-04' 
from Plataforma
where Nombre = 'PS2'


select *  From Plataforma


update Plataforma
set Compania = 'Bandai', FechaSalida = '1999-03-04' 
from Plataforma
where Nombre = 'WS'

update Plataforma
set Compania = 'Sega', FechaSalida = '1994-11-21' 
from Plataforma
where Nombre = 'SAT'

update Plataforma
set Compania = 'Nintendo', FechaSalida = '2001-03-21' 
from Plataforma
where Nombre = 'GBA'

update Plataforma
set Compania = 'NEC', FechaSalida = '1994-12-23' 
from Plataforma
where Nombre = 'PCFX'


update Plataforma
set Compania = 'Nintendo', FechaSalida = '2001-09-14' 
from Plataforma
where Nombre = 'GC'

update Plataforma
set Compania = 'Nintendo', FechaSalida = '2017-03-17' 
from Plataforma
where Nombre = 'Switch'

update Plataforma
set Compania = 'Nintendo', FechaSalida = '1983-07-15' 
from Plataforma
where Nombre = 'NES'

update Plataforma
set Compania = 'Nintendo', FechaSalida = '2011-02-23' 
from Plataforma
where Nombre = '3DS'


update Plataforma
set Compania = 'SNK	', FechaSalida = '1990-01-30' 
from Plataforma
where Nombre = 'NG'


update Plataforma
set Compania = 'Sega', FechaSalida = '1998-10-29' 
from Plataforma
where Nombre = 'GEN'

DELETE FROM Plataforma WHERE Nombre = 'PSV' and Compania is NULL
select *  From Plataforma

update Plataforma
set Compania = 'Sega', FechaSalida = '1998-10-29' 
from Plataforma
where Nombre = 'PC'

/*Relacionar la tabla Videojuego con la tabla Plataforma*/
insert into VideojuegoPlataforma (IDVideojuego, IDPlataforma)
select Videojuego.ID, p.ID from Videojuego
join videogames v on v.name = Videojuego.Nombre
join Plataforma p on p.Nombre= v.platform

select *  From VideojuegoPlataforma