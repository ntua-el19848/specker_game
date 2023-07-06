var mongoose = require('mongoose');
var jsonModel = require('../models/jsonModel.js');

/* Controller that retrieves a chart from User's charts based on email (to identify user)
   and on chartTitle (to identify a chart). With a chart we imply a Json string ready to be input to highcharts */
exports.retrieve = async (req, res) => {
    try {
        const email_param = req.params.email;
        const chart_title = req.params.chartTitle;
        /* We check if both parameters are defined. If one of them is missing we stop the process marked as failed */
        if (email_param === undefined || chart_title == undefined) {
            console.log("storeGet (retrieve): no userEmail specified or chartTitle specified");
            res.status(400).json({
                status: "failed",
                reason: "no userEmail specified or chartTitle specified",
              });
        }

        // Retrieve chart Json based on email and chartTitle
        const chart = await jsonModel.find({
            emailUser: email_param,
            'title.text': chart_title,
        }).select({ _id: 0, __v: 0,emailUser: 0, typeFrontend: 0, creationDate: 0 });
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