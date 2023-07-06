var mongoose = require('mongoose');
var userModel = require('../models/userModel.js');

/* delete controller that deletes a user based on an email parameter */
exports.delete = async (req, res) => {
    try{
        /* Retrieve the email parameter from req.body */
        const email_param = req.body.email;
        /* Query based on email parameter */
        const user = await userModel.deleteOne({
            email: email_param
        });
        /* check response of query and send the appropriate message */
        if(user==""){
            res.send({
                status: 204,
                message: "No such a user to delete" 
            });
        }
        else
            res.send({
                status: 200,
                message: "User deleted succesfully" 
            });
    }
    catch(error){
        res.status(500).json({
            reason: error.message
        });
        console.log(error)
    }
}