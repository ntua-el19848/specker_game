/* import the dependencies */
const express = require('express');
const http = require('http');
const app = express();

/* import routes */
const transformJSON = require("./routes/routes.js");

/* Middleware to auto parse the request as JSON Object */
app.use(express.json());

/* use route for /transform sub directories */
app.use('/transform', transformJSON )

module.exports = app;

/* Healthcheck route for the microservice to ensure that it is up */
app.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'Transform To Highcharts Microservice is up' });
    console.log("transformToHighcharts (healthcheck): Service is up!");
});

/* Start the server */
const httpServer = http.createServer(app);
httpServer.listen(3300, () => {
    console.log('HTTP transformToHighcharts Microservice running on port 3300');
});