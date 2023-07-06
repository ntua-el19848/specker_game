/* This component is for adding data (charts information) in Scrollable Table in myCharts page. */
import axios from 'axios';
import config from '../config.json';

/* This function returns one integer to detect in which case we are to display the appropriate thing in myCharts page
   For example in case of 0, we display the data in Scrollable table, 
   in case of -1, we display a message that an error has occured to inform the user */
const fetchData = async (email) => {
  try {
    /* orchestrator call with email as path paremeter to retrieve all charts of a User */
    const response = await axios.get('http://'+config.orchestrator+':4000/chartHistory/'+email+'');
    const data = response.data;

    /* if we have not yet charts */
    if(data.status===204){
      return 0;
    }
    else{
      // Perform any necessary data transformation here with the following function
      const tableData = transformData(data);
      return tableData;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return -1;
  }
};

const transformData = (data) => {
  // Perform data transformation as per your requirement
  // For example, extract necessary fields, modify the structure, etc.
  // Return the transformed data in the desired format (array of JSON objects)
  return data.map((item) => {
    return {
      creationDate: item.creationDate,
      typeFrontend: item.typeFrontend,
      emailUser: item.emailUser,
      title: item.title.text,
      // Add more properties as needed
    };
  });
};


export default fetchData;