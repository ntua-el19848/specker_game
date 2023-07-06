var mongoose = require('mongoose');
var jsonModel = require('../models/jsonModel.js');

/* Controller that retrieves all charts of a User based on its email (to identify user).
   Again with a chart we imply a Json string ready to be input to highcharts. 
   For example this controller is used to retrieved all charts for chartHistory to diplay them on chart table */
exports.retrieveCharts = async (req, res) => {
    try {
        const email_param = req.params.email;

        // Check for unspecified call parameter
        if (email_param === undefined) {
            console.log("storeGet (retrieveCharts): no userEmail specified");
            res.status(400).json({
                status: "failed",
                reason: "no userEmail specified",
              });
        }
        // Retrieve charts based on email
        const chart = await jsonModel.find({
            emailUser: email_param,
        }).select({ emailUser: 1, creationDate: 1, typeFrontend: 1, title: 1, _id: 0});

        if (chart == "") {
            res.send({
                status: 204,
                message: "No content"
            });
        }
        else
            res.send(chart);
    }
    catch (error) {
        res.status(500).json({
            reason: error.message
        });
        console.log(error)
    }
}