-- Datos Desarrollador

-- insert into Desarrollador(Nombre,Ciudad,País,AnioFundacion)
-- SELECT isnull(Developer,''), isnull(City,''), isnull(Country,''), Est  FROM [video-games-developers]

-- drop table [video-games-developers]


-- Datos Ventas

--insert into Ventas(VentasNorteAmerica,VentasUnionEuropea,VentasJapon,OtrasVentas,VentasGlobales)
--select NA_Sales, EU_Sales, JP_Sales, Other_Sales, Global_Sales from vgsales

--select * from Desarrollador where Nombre = 'Nintendo'

select * from Ventas
select * from vgsales

-- Datos Videojuegos (Parte 1)

insert into Videojuego(Nombre,Genero,AnioSalida)
select convert(nvarchar(100),Name), Genre, Year from vgsales

update Videojuego 
set IDVentas = (select rank from vgsales)
from Videojuego v inner join vgsales s on v.Nombre = s.Name

update Videojuego set IDDesarrollador = (select ID from Desarrollador) where Desarrollador.Nombre = vgsales.Publisher

UPDATE
    sales.commissions
SET
    sales.commissions.commission = 
        c.base_amount * t.percentage
FROM 
    sales.commissions c
    INNER JOIN sales.targets t
        ON c.target_id = t.target_id;

select * from Videojuego