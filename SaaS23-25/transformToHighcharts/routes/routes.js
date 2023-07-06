/*  This file is responsible for the routes of the application. */

/*  The dependencies we need */
const express = require('express');

/*  Import controllers */
const basicLine = require('../controllers/basicLine.js');
const annotationsLine = require('../controllers/annotationsLine.js');
const dependency = require('../controllers/dependency.js');
const network = require('../controllers/network.js');
const polar = require('../controllers/polar.js');
const basicColumn = require('../controllers/basicColumn.js');

/*  Initialize express router */
const router = express.Router();

/*  Define routes */
router.post("/basicLine", basicLine.transform); //Done
router.post("/annotationsLine", annotationsLine.transform);
router.post("/dependency", dependency.transform);
router.post("/network", network.transform);
router.post("/polar", polar.transform);
router.post("/basicColumn", basicColumn.transform);


module.exports = router;