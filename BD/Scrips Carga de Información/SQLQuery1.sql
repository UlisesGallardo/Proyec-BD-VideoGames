
update Videojuego 
set IDVentas = 
(select distinct rank from vgsales s join Videojuego v on v.Nombre = s.Name)
from Videojuego v join vgsales s on v.Nombre = s.Name

select distinct rank, s.Name from vgsales s
join Videojuego v on v.Nombre = s.Name


update Videojuego 
set Videojuego.IDVentas = vgsales.rank
from Videojuego join vgsales  on Videojuego.Nombre = vgsales.Name
join Ventas ve on ve.ID = vgsales.rank

select * from vgsales where vgsales.rank = 201

select * from Videojuego
join ventas on ventas.ID = Videojuego.IDVentas order by ventas.ID

select * from Videojuego


select Name, Genre, Publisher, sum(NA_Sales), sum(EU_Sales), sum(JP_Sales), sum(Other_Sales), sum(Global_Sales), count(1) from vgsales group by Name, Genre, Publisher


select * from Videojuego
join ventas on ventas.ID = Videojuego.IDVentas order by ventas.ID

select Nombre, Genero, Clasificacion, AnioSalida, IDDesarrollador, IDVentas, IDPuntaje, count(1) from Videojuego group by Nombre, Genero, Clasificacion, AnioSalida, IDDesarrollador, IDVentas, IDPuntaje
having count(1) > 1

update Videojuego 
set Videojuego.IDVentas = vgsales.rank
from Videojuego join vgsales  on Videojuego.Nombre = vgsales.Name
join Ventas ve on ve.ID = vgsales.rank

select * from vgsales

select rank from Videojuego join vgsales  on Videojuego.Nombre = vgsales.Name where rank not in (select ID from Ventas)
