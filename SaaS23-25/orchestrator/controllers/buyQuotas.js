/* Use case : Buy Quotas. User buys a certain amount of quotas. */

/* imports */
const axios = require('axios');

/* helper function that checks that every microservice required is up and running */
const checkMicroserviceStatus = require('./checkMicroservice');

/* configuration of the microservices names (decides between docker deployment and localhost deployment) */
const config = require('../config.json');

/* function that implements the use case */
async function buyQuotas(req, res){    
    try{
        /* get the parameters from the request body */
        const usermail = req.body.email;
        const addedQuotas = req.body.quotas;

        /* check for correct call parameters */
        if(usermail === undefined || addedQuotas === undefined) {
            console.log("orchestrator (buyQuotas): no mail or quotas amount specified");
            res.status(400).json({
                status: "failed",
                reason: "no mail or quotas amount specified",
              });
        }

        /* check that microservice are up */
        const UserQuotasStatus = await checkMicroserviceStatus(""+config.userQuotasMicroservice+":3400");
        // check that microservices are up
        if (!UserQuotasStatus){
            res.status(503).json({
                message: "One or more microservices that are critical is down or the connection with the DB is down"
            });
        }
        /* call the microservice */
        else{
            const response = await axios.post('http://'+config.userQuotasMicroservice+':3400/updateQuotas', {
                userEmail: usermail,
                quotas: addedQuotas
            });
            res.status(200).json({
                message: "Purchase successfull!"
            });
        }
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = buyQuotas;