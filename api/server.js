const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8800;
const server = http.createServer(app);
server.setTimeout(3000);
server.listen(port);