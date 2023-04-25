## Getting Started

- Primero haremos la instalación base de los paquetes necesarios para correr el API con el siguiente comando:

```bash
npm install
# or
yarn install
```

- Para poder correr la aplicación necesitará correr el siguiente comando:

```bash
npm start
# or
yarn start
```

Esto dejará corriendo el API en el puerto 4000.

- Para poder retornar todas las files podría utilizar el siguiente comando:

```bash
curl --location --request GET 'localhost:4000/files/data'
```

- Para poder consultar el API por un file específico podría utilizar el siguiente comando:

```bash
curl --location --request GET 'localhost:4000/files/data?fileName=test2.csv'
```
