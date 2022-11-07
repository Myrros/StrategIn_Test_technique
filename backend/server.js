const http = require('http');

// We get ou express app.
const app = require('./app.js');

// We open the server at the port 3000.
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);