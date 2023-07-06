/* Use Case: Store Chart. User requests to store a chart. */

/* imports */
const axios = require('axios');

/* helper function that checks that every microservice required is up and running */
const checkMicroserviceStatus = require('./checkMicroservice');

/* configuration of the microservices names (decides between docker deployment and localhost deployment) */
const config = require('../config.json');

/* function that implements the use case */
async function storeChart(req, res){    
    try{
        // check that all the microservices required for this action are up!
        const UserQuotasStatus = await checkMicroserviceStatus(""+config.userQuotasMicroservice+":3400");
        const StoreGetStatus = await checkMicroserviceStatus(""+config.storeGetMicroservice+":3200");
        // check that microservices are up
        if (!StoreGetStatus||!UserQuotasStatus){
            res.status(503).json({
                message: "One or more microservices that are critical is down or the connection with the DB is down"
            });
            return;
        }
        const ChartType = req.params.ChartType;
        const email = req.params.email;
        
        // check that the user has enough credits to perform this action
        const remainingQuotas = await axios.get('http://'+config.userQuotasMicroservice+':3400/remainingQuotas/'+email);
        if(remainingQuotas.data.totalQuotas<1){
            res.status(210).json({
                message: "You have not enough credits to perform this action. Please buy credits from credits page and come back!"
            });
            return;
        }
        

        // procced to store the chart
        const dataToStore = req.body;
        const responseFromStore = await axios.post('http://'+config.storeGetMicroservice+':3200/storeJson/'+email+'/'+ChartType+'', dataToStore);
        
        // if the chart already exists
        if(responseFromStore.status==204){
            res.status(204).json({
                message: "Chart already exists. Please try again with a different name"
            });
            return;
        }
        // if the chart was stored successfully
        else if(responseFromStore.status===200){
            res.status(200).json({
                message: "Chart stored successfully. You can now view it in Chart History page"
            });
        }

        // substract one quota from the user!
        const respoonseFromUserQuotas = await axios.post('http://'+config.userQuotasMicroservice+':3400/updateQuotas', {
            userEmail: email,
            quotas: -1
        });
        // if the user hasnt got enough credits
        if(respoonseFromUserQuotas.status===210){
            res.status(210).json({
                message: "You have not enough credits to perform this action. Please buy credits from credits page and come back!"
            });
            return;
        }

    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Could not store the chart into database. Try again later."
        });
    }
}

module.exports = storeChart;