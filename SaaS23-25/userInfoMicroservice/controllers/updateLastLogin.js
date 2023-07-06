var mongoose = require('mongoose');
var userModel = require('../models/userModel.js');

/* Controller that updates last Login of user */
exports.update = async (req, res) => {
    try{
        const userUpdate = await userModel.updateOne({email: req.body.email}, { $set: { lastLogin: req.body.lastLogin} })
			if (userUpdate.matchedCount==1) {
				console.log("Last Login of the user is succesfully updated");
				res.status(200).json({
                    reason: "Last Login of the user succesfully updated"
                });
			}
            else {
                res.status(400).json({
                    reason: "Some error occured with matched objects for this email"
                });
            }
    }
    catch(error){
        res.status(500).json({
            reason: error.message
        });
        console.log(error)
    }
}