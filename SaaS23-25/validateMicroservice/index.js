const express = require('express');
const http = require('http');
const app = express();
const validateRoute = require("./routes/routes.js");

app.use(express.json({limit: '50mb'}));

app.use('/', validateRoute )

module.exports = app;

/* Define healthcheck route to check if validate microservice is up */
app.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Validate Microservice is up' });
});

const httpServer = http.createServer(app);
httpServer.listen(3500, () => {
    console.log('HTTP validate Microservice running on port 3500');
});