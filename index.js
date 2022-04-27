const express = require('express');
const server = express();
const routes = require('./routes')

//Config
server.set('port', process.env.PORT || 8080);

server.use(express.json());

// Endpoints
server.use(routes)

server.listen(server.get('port'), (err)=> {
    err ? console.log(err) : console.log(`[server] Server listening on port ${server.get('port')}`);
});