/* This file describes every route that userInfo Microservice can support.
   router.get or router.post redirects the call to a function in 
   controllers folder. The function is called by the second parameter in
   router.get(1st parameter, 2nd parameter); */
   
const express = require('express');
const importUserController = require('../controllers/importUser.js');
const retrieveUserController = require('../controllers/retrieveUser.js');
const deleteUserController = require('../controllers/deleteUser.js');
const updateLastLoginController = require('../controllers/updateLastLogin.js');

const router = express.Router();


router.post("/importUser", importUserController.import);
router.post("/deleteUser", deleteUserController.delete);
router.post("/updateLastLogin", updateLastLoginController.update);
router.get("/retrieveUser/:email", retrieveUserController.retrieve);

module.exports = router;