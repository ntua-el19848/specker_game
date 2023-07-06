/* Use Case: Chart History. User requests the chart history of a certain email. */

/* imports */
const axios = require('axios');

/* helper function that checks that every microservice required is up and running */
const checkMicroserviceStatus = require('./checkMicroservice');

/* configuration of the microservices names (decides between docker deployment and localhost deployment) */
const config = require('../config.json');

/* function that implements the use case */
async function chartHistory(req, res){    
    try{
        /* check that microservice are up */
        const StorenGetStatus = await checkMicroserviceStatus(""+config.storeGetMicroservice+":3200");
        if (!StorenGetStatus){
            res.status(503).json({
                message: "One or more microservices that are critical is down or the connection with the DB is down"
            });
        }
        /* call the microservice */
        else{
            const response = await axios.get('http://'+config.storeGetMicroservice+':3200/retrieveCharts/'+req.params.email+'');
            res.status(200).json(response.data);
        }
    }
    /* catch errors */
    catch(error){
        console.log(error.message);
    }
}

module.exports = chartHistory;