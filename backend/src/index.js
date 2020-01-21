const express = require('express');
const mongoose =  require('mongoose');
const routes = require('./routes');
const {setupWebsocket} = require('./websocket');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.Server(app);


setupWebsocket(server);

mongoose.connect('mongodb://ifmsmongo:665718chuva@cluster0-shard-00-00-pdv0f.mongodb.net:27017,cluster0-shard-00-01-pdv0f.mongodb.net:27017,cluster0-shard-00-02-pdv0f.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true ,
    useUnifiedTopology: true,
});
app.use(cors());
app.use(express.json());
app.use(routes);

// Metodos HTTP : GET, POST, PUT, DELETE

// Tipos de parâmetros:
// -> Query Params: req.query (filtros,ordenação,paginação, ...)
// Route Params (Identificar um recurso na alteração ou remoçaõ)
// Body: (Dados para criação ou alteração de um registro)

//MongoDB(não relacionado)




server.listen(3333);