/* This file describes every route that userQuotas Microservice can support.
   router.get or router.post redirects the call to a function in 
   controllers folder. The function is called by the second parameter in
   router.get(1st parameter, 2nd parameter); */
   
const express = require('express');
const storeController = require('../controllers/store.js');
const retrieveController = require('../controllers/retrieve.js');
const retrieveChartsController = require('../controllers/retrieveCharts.js');

const router = express.Router();

// store route
router.post("/storeJson/:email/:type", storeController.store);
// retrieve route
router.get("/retrieveJson/:email/:chartTitle", retrieveController.retrieve);
//retrieve all charts for a user
router.get("/retrieveCharts/:email", retrieveChartsController.retrieveCharts)

module.exports = router;