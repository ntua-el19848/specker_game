/* Microservice responsible for downloading the templates for the charts */

/* Importing the required modules */
const express = require('express');
const http = require('http');
const app = express();

/* Middleware to parse the request body */
app.use(express.json());

/* Healthcheck route that ensures that the microservice is up and running */
app.get('/healthcheck', (req, res) => {
  res.status(200).json({ message: 'MongoDB connection successful'});
});

/* Route to download the template for the chart */
app.get('/download/:ChartType', function(req, res){
  const file = './templates/'+req.params.ChartType+'.csv';
  res.download(file);
});

module.exports = app;

/* Starting the server */
const httpServer = http.createServer(app);
httpServer.listen(3100, () => {
    console.log('HTTP Template Microservice running on port 3100');
});