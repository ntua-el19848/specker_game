/* Use Case: Retrieve Chart. User requests the chart history of a certain email. */

/* imports */
const axios = require('axios');

/* helper function that checks that every microservice required is up and running */
const checkMicroserviceStatus = require('./checkMicroservice');

/* configuration of the microservices names (decides between docker deployment and localhost deployment) */
const config = require('../config.json');

/* function that implements the use case */
async function getChart(req, res){    
    try{
        // check that all the microservices required for this action are up!
        const StoreGetStatus = await checkMicroserviceStatus(""+config.storeGetMicroservice+":3200");
        // check that microservices are up
        if (!StoreGetStatus){
            res.status(503).json({
                message: "Retrieve microservice  is down or the connection with the DB is down"
            });
        }
        // call the microservice
        const ChartTitle = req.params.chartTitle;
        const email = req.params.email;
        const responseFromGet = await axios.get('http://'+config.storeGetMicroservice+':3200/retrieveJson/'+email+'/'+ChartTitle+'');
        if(responseFromGet.status===204){
            res.status(204).json({
                message:"It seems that this chart doesn't exist in our database. Please try again"
            });
        }
        res.send(responseFromGet.data);
        
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Could not retrieve the chart from database. Try again later."
        });
    }
}

module.exports = getChart;