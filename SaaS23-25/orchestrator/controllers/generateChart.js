/* Use Case: Generate Chart. User uploads a file and requests a chart. */

/* imports */
const axios = require('axios');

/* helper function that checks that every microservice required is up and running */
const checkMicroserviceStatus = require('./checkMicroservice');

/* configuration of the microservices names (decides between docker deployment and localhost deployment) */
const config = require('../config.json');

/* function that implements the use case */
async function generateChart(req, res){ 
    /* check for correct call parameters */
    if(!req.file){
        res.status(400).json({
            message: "No file uploaded"
        });
        return;
    }
    try{
        /* check that microservice are up */
        const TransformToHighchartsStatus = await checkMicroserviceStatus(""+config.transformToHighcharts+":3300");
        const ValidateStatus = await checkMicroserviceStatus(""+config.validateMicroservice+":3500");
        // check that microservices are up
        if ((!TransformToHighchartsStatus)||(!ValidateStatus)){
            res.status(503).json({
                message: "One or more microservices that are critical is down or the connection with the DB is down"
            });
        }
        /* call the microservice to generate the chart  */
        else{
            // Make a POST request with Axios
            const ResponseFromValidate = await axios.post('http://'+config.validateMicroservice+':3500/transform', req.file);

            const TransformToHighchartsResponse = await axios.post('http://'+config.transformToHighcharts+':3300/transform/'+req.params.ChartType+'', JSON.parse(ResponseFromValidate.data));
            console.log("TransformToHighchartsResponse Done");
            res.status(200).json(TransformToHighchartsResponse.data);
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
            message: "Cannot generate chart"
        })
    }
}

module.exports = generateChart;