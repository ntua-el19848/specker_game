/* This file describes the route that validate Microservice can support.
   router.post redirects the call to a function in controllers folder. 
   The function is called by the second parameter in
   router.get(1st parameter, 2nd parameter); */
   
const express = require('express');
const transformController = require('../controllers/transform.js');

const router = express.Router();
const multer = require('multer');

router.post("/transform", transformController.transform);

module.exports = router;