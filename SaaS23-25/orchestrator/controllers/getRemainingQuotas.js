/* Use Case: Get Remaining Quotas. User requests the remaining quotas of a certain email. */

/* imports */
const axios = require('axios');

/* helper function that checks that every microservice required is up and running */
const checkMicroserviceStatus = require('./checkMicroservice');

/* configuration of the microservices names (decides between docker deployment and localhost deployment) */
const config = require('../config.json');

/* function that implements the use case */
async function getRemainingQuotas(req, res){    
    try{
        /* check that microservice are up */
        const UserQuotasStatus = await checkMicroserviceStatus(""+config.userQuotasMicroservice+":3400");
        if (!UserQuotasStatus){
            res.status(503).json({
                message: "User Quotas microservices is propably down or the connection with the DB is down"
            });
        }
        /* call the microservice */
        else{
            const response = await axios.get('http://'+config.userQuotasMicroservice+':3400/remainingQuotas/'+req.params.email+'');
            // if the user exists in db
            if(response.status===200){
                res.status(200).json(response.data.totalQuotas);
            }
            // if user does not exist in db
            else if(response.status===204){
                res.status(204).json({
                    message: "No user registered with that email",
                });
            }
            // if something unpredictable happened
            else{
                res.status(400).json({
                    message: "something totally unpredictable happened",
                });
            }
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500);
    }
}

module.exports = getRemainingQuotas;