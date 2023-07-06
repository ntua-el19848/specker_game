/* Use Case: Template Download. User requests the template of a certain chart type. */

/* imports */
const axios = require('axios');

/* helper function that checks that every microservice required is up and running */
const checkMicroserviceStatus = require('./checkMicroservice');

/* configuration of the microservices names (decides between docker deployment and localhost deployment) */
const config = require('../config.json');

/* function that implements the use case */
async function templateDownload(req, res) {
    try {
        // check that all the microservices required for this action are up!
        const TemplateDownloadStatus = await checkMicroserviceStatus("" + config.templateMicroservice + ":3100");
        if (!TemplateDownloadStatus) {
            res.status(503).json({
                message: "One or more microservices that are critical is down or the connection with the DB is down"
            });
        }
        // call the microservice
        else {
            axios.get('http://' + config.templateMicroservice + ':3100/download/' + req.params.ChartType + '')
                .then(function (response) {
                    const filename = req.params.ChartType + '.csv'; // Set the desired custom filename with extension
                    res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"'); // Set the response header to indicate a file download
                    res.send(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                    res.status(500).json({
                        message: "An error occurred while downloading the file"
                    });
                });
        }
    }
    /* catch errors */
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "An error occurred while downloading the file"
        })
    }
}

module.exports = templateDownload;