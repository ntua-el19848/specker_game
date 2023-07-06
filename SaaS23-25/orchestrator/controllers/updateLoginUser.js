/* Use Case: Update Login. User requests to update the last login of a certain email. */

/* imports */
const axios = require('axios');

/* helper function that checks that every microservice required is up and running */
const checkMicroserviceStatus = require('./checkMicroservice');

/* configuration of the microservices names (decides between docker deployment and localhost deployment) */
const config = require('../config.json');

/* function that implements the use case */
async function updateLogin(req, res){    
    try{
        const email = req.body.email;
        const lastLogin = req.body.lastLogin;

        //check for correct call parameters
        if(email === undefined || lastLogin === undefined) {
            console.log("orchestrator (updateLoginUser): no email or lastLogin Date specified");
            res.status(400).json({
                status: "failed",
                reason: "no mail or quotas no email or lastLogin Date specified specified",
              });
        }
        /* check that microservice are up */
        const UserInfoStatus = await checkMicroserviceStatus(""+config.userInfoMicroservice+":3000");
        if (!UserInfoStatus){
            res.status(503).json({
                message: "userInfoMicroservice is down or the connection with the DB is down"
            });
        }
        /* call the microservice */
        else{
            const response = await axios.post('http://'+config.userInfoMicroservice+':3000/updateLastLogin', {
                email: email,
                lastLogin: lastLogin
            });
            res.status(200).json({
                message: "Last Login of the user is succesfully updated"
            });
        }
    }
    /* catch errors */
    catch(error){
        console.log(error.message);
    }
}

module.exports = updateLogin;