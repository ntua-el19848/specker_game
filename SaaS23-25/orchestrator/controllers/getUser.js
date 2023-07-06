/* Use Case: Get User. User requests the user info of a certain email. */

/* imports */
const axios = require('axios');

/* helper function that checks that every microservice required is up and running */
const checkMicroserviceStatus = require('./checkMicroservice');

/* configuration of the microservices names (decides between docker deployment and localhost deployment) */
const config = require('../config.json');

/* function that implements the use case */
async function getUser(req, res){    
    try{
        /* check that microservice are up */
        const UserInfoStatus = await checkMicroserviceStatus(""+config.userInfoMicroservice+":3000");
        if (!UserInfoStatus){
            console.log("getUser: cannot establish connection with userInfoMicroservice");
            res.status(503).json({
                message: "One or more microservices that are critical is down or the connection with the DB is down"
            });
        }
        /* call the microservice */
        else{
            const response = await axios.get('http://'+config.userInfoMicroservice+':3000/retrieveUser/'+req.params.email+'');
            // if the user exists in db
            if(response.status===200){
                res.status(200).json(response.data);
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

module.exports = getUser;