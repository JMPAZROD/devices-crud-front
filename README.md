# Proyecto de nodesjs con MS SQL SERVER

## Scripts Disponibles

En el directorio puede correr:

### `npm run dev`
### `npm run build`

Este proyecto tiene una base de datos llamada "webcrud" y contiene una tabla llamada "Devices" 

En caso de que no exista, ejecutar el query:

CREATE DATABASE webcrud;
CREATE TABLE Devices (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    device_storage VARCHAR(50) NOT NULL
);
