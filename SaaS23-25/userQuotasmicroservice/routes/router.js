/* The dependencies we need */
const express = require('express');

/* Import controllers */
const initializeUsercontroller = require('../controllers/initializeUser');
const remainingQuotascontroller = require('../controllers/remainingQuotas');
const updateQuotascontroller = require('../controllers/updateQuotas');

/* Initialize express router */
const router = express.Router();

/* Define routes */
router.post("/initializeUser", initializeUsercontroller.initializeUser);
router.get("/remainingQuotas/:email", remainingQuotascontroller.remainingQuotas);
router.post("/updateQuotas", updateQuotascontroller.updateQuotas);

module.exports = router;