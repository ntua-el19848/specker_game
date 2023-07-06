/* The dependencies we need */
const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');

/* Middleware to auto parse the request as JSON Object */
app.use(express.json());

/* HealthCheck route that is called in order to ensure that ms is up and connected with the db */
app.get('/healthcheck', (req, res) => {
  mongoose.connect('mongodb://userquotasdb:27017/userQuotasDB', {useNewUrlParser: true, useUnifiedTopology: true,},)
  .then(()=> res.status(200).json({ message: 'MongoDB connection successful' }))
  .catch(()=> res.status(400).json({ message: 'MongoDB connection unsuccessful' }))
});

/* Connect to the database */
mongoose.connect('mongodb://userquotasdb:27017/userQuotasDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/* Check if the connection with the db is successful */
const userQuotasdb = mongoose.connection;
userQuotasdb.on('error', console.error.bind(console, 'connection error:'));
userQuotasdb.once('open', function () {
  console.log('Connected to userQuotas database');
});

/* Import routes */
const routes = require("./routes/router.js");
app.use('/', routes);

module.exports = app;

/* Start the server */
const httpServer = http.createServer(app);
httpServer.listen(3400, () => {
	console.log('HTTP Server running on port 3400');
});
