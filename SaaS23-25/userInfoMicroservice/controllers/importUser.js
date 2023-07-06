var mongoose = require('mongoose');
var userModel = require('../models/userModel.js');

/* import controller that adds a new user with personal info retrieved from req.body */
exports.import = async (req, res) => {
    try{
        /* firsly we check if already exists a user with this email 
           ,if so we do not add again this user and inform with appropriate message */

        const user = await userModel.findOne({ email: req.body.email });
			if (user) {
				console.log("This email already exists");
				res.status(400).json({
                    reason: "This email already exists"
                });
			}
			else {
                // Create a new user and insert into database
                const user = await userModel.create({
                    name: req.body.name,
                    lastname: req.body.lastname,
                    lastLogin: req.body.lastLogin,
                    email: req.body.email,
                });
                 res.send(user);
            }
    }
    catch(error){
        res.status(500).json({
            reason: error.message
        });
        console.log(error)
    }
}