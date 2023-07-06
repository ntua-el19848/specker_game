var mongoose = require('mongoose');
var userModel = require('../models/userModel.js');

/* Retrieve controller that retrieves a user based on email. 
   From Response we ignore _id and __v. */
exports.retrieve = async (req, res) => {
    try{
        const email_param = req.params.email;
        const user = await userModel.find({
            email: email_param
        }).select({ _id: 0 , __v: 0});
        if(user==""){
            res.status(204).json({
                message: "No content" 
            });
        }
        else
            res.send(user);
    }
    catch(error){
        res.status(500).json({
            reason: error.message
        });
        console.log(error)
    }
}