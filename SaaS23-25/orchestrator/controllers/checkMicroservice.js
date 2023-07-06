/* Helper function to check the status of a microservice */

/* imports */
const axios = require('axios');

/* function that checks the status of a microservice */
async function checkMicroserviceStatus(microservice) {
  try {
    // Make a test POST request to the microservice
    const response = await axios.get('http://'+microservice+'/healthcheck', {
      timeout: 5000, // Set a timeout value (in milliseconds)
    });

    if (response.status === 200) {
      // Microservice is up and running
      //console.log('Microservice is available!');
      return true;
    } else {
      // Microservice returned an unexpected status code. The microservice is up but not working properly
      //console.error('Microservice returned the following error message: ', response.message);
      return false;
    }
  } 
  // the microservice is down!
  catch (error) {
    if (error.code === 'ECONNREFUSED') {
      // Connection refused error - Microservice is down or inaccessible
      //console.error('Microservice is down or inaccessible:', error.message);
      return false;
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error - Microservice did not respond within the specified timeout
      //console.error('Microservice did not respond within the specified timeout:', error.message);
      return false;
    } else {
      // Other error occurred
      //console.error('An unexpected error occurred:', error.message);
      return false;
    }
  }
}

module.exports = checkMicroserviceStatus; 