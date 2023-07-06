/* This is the main file of the orchestrator microservice. */

/* The dependencies we need */
const express = require('express');
const http = require('http');
const app = express();
const multer = require('multer');
const cors =require('cors');

/* Cors */
app.use(cors());

/* Include functions in controllers that implement the use cases */
const importUser = require('./controllers/importUser');
const chartHistory = require('./controllers/chartHistory');
const templateDownload = require('./controllers/templateDownload');
const generateChart = require('./controllers/generateChart');
const buyQuotas = require('./controllers/buyQuotas');
const storeChart = require('./controllers/storeChart');
const getChart = require('./controllers/retrieveChart');
const getUser = require('./controllers/getUser');
const getRemainingQuotas = require('./controllers/getRemainingQuotas');
const updateLoginUser = require('./controllers/updateLoginUser');

/* Middleware to parse the request body */
app.use(express.json());

/* HTTP Server */
const httpServer = http.createServer(app);
httpServer.listen(4000, () => {
    console.log('HTTP Orchestrator running on port 4000');
});

// The following routes serve the use cases that the orchestrator implements (by interructing with many different microservices - buissness logic)
// Each function is declared in the controllers folder of the orchestrator

// Endpoint for new user entry!
app.post('/importUser', (req, res) => importUser(req, res));

// Request Template from Template download microservice
app.get('/templateDownload/:ChartType',  (req, res) => templateDownload(req, res));

// Generate Chart Use Case
app.post('/generateChart/:ChartType', multer().single('file'), (req, res) => generateChart(req, res));

// Chart History Use Case
app.get('/chartHistory/:email', (req, res) => chartHistory(req, res));

// Buy Use Case
app.post('/purchaseQuotas', (req, res) => buyQuotas(req, res));

// Store Chart Use Case
app.post('/storeChart/:email/:ChartType', (req, res) => storeChart(req, res));

// Get Chart Use Case
app.get('/retrieveChart/:email/:chartTitle', (req, res) => getChart(req, res));

// Get User Use Case
app.get('/getUser/:email', (req, res) => getUser(req, res));

// Get Chart Use Case
app.get('/remainingQuotas/:email', (req, res) => getRemainingQuotas(req, res));

// Update Lasto Login of User Use Case
app.post('/lastLogin', (req, res) => updateLoginUser(req, res));