/* Use Case: Import User. User requests to import a new user. */

/* imports */
const axios = require('axios');

/* helper function that checks that every microservice required is up and running */
const checkMicroserviceStatus = require('./checkMicroservice');

/* configuration of the microservices names (decides between docker deployment and localhost deployment) */
const config = require('../config.json');

/* function that implements the use case */
async function importUser(req, res){    
    try{
        /* check that microservice are up */
        const UserInfoStatus = await checkMicroserviceStatus(""+config.userInfoMicroservice+":3000");
        const UserQuotasStatus = await checkMicroserviceStatus(""+config.userQuotasMicroservice+":3400");
        // check that microservices are up
        if (!UserInfoStatus||!UserQuotasStatus){
            res.status(503).json({
                message: "One or more microservices that are critical is down or the connection with the DB is down"
            });
        }
        /* call the microservice */
        else{
            // add user to User Information Microservice with post request
            const UserInfoResponse = await axios.post('http://'+config.userInfoMicroservice+':3000/importUser', {
                name: req.body.name,
                lastname: req.body.lastname,
                lastLogin: req.body.lastLogin,
                email: req.body.email,
            });
            // if something goes wrong in user information microservice respond with error and do not continue
            if (UserInfoResponse.status==400){
                res.status(400).json({
                    message: "Something went wrong with the UserInfoMicroservice",
                    reason: UserInfoResponse.data.reason,
                });
                return;
            }
            // add user to User Quotas Microservice with post request
            const UserQuotasResponse = await axios.post('http://'+config.userQuotasMicroservice+':3400/initializeUser', {
                userEmail: req.body.email,
                defaultBalance: 10,
            });
            // if everything went ok
            if(UserQuotasResponse.status==200){
                // response to web server that everything has been imported successfully!
                res.status(200).json({
                message: "New user has been imported successfully"
                });
            }
            // if something goes wrong in user quotas microservice respond with error and delete the previous entry in user information microservice
            else{
                const deleteresponse = await axios.post('http://'+config.userInfoMicroservice+':3000/deleteUser', {
                    email: req.body.email,
                });
                res.status(400).json({
                    message: "Something went wrong with the UserQuotasMicroservice, also deleted enrty from userInfo Microservice"
                });
                return;
            }
        }
    }
    /* catch errors */
    catch(error){
        console.log(error.message);
    }
}

module.exports = importUser;