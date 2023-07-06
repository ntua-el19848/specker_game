/* Page that is shown when a chart is successfully created. It shows the chart and two buttons, one to store the chart and one to discard it. */
/* After you press the store button, the chart is stored to the user's mycharts page and the button Store disappears. */

/* imports */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom'
import Highcharts from 'highcharts';
import HighchartsStored from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsDependencyWheel from 'highcharts/modules/dependency-wheel';
import HighChartsNetwork from 'highcharts/modules/networkgraph'
import HighchartsSankey from 'highcharts/modules/sankey';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsExporting from 'highcharts/modules/exporting';
import axios from 'axios';
import { useKeycloak } from "@react-keycloak/web";
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config.json";

/* Highcharts modules */
HighchartsSankey(Highcharts);
HighchartsDependencyWheel(Highcharts);
HighChartsNetwork(Highcharts);
HighchartsMore(Highcharts);
HighchartsAccessibility(Highcharts);

/* Highcharts modules */
HighchartsSankey(HighchartsStored);
HighchartsDependencyWheel(HighchartsStored);
HighChartsNetwork(HighchartsStored);
HighchartsExporting(HighchartsStored);
HighchartsMore(HighchartsStored);
HighchartsAccessibility(HighchartsStored);
  
/* Page */
const SuccessfulCreate = () => {
  /* Parameters */
  const { keycloak, initialized } = useKeycloak();
  const [data, setData] = useState(null);
  const [stored, setStored] = useState(0);
  const [type, setType] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  /* Function that runs after the page is loaded */
  useEffect(() => {
    /* Set storedData and storedType to the data and type that are stored in sessionStorage */
    const storedData = sessionStorage.getItem('myData');
    const storedType = sessionStorage.getItem('myChartType');
    /* If the data and type are not null, set them in state */
    if (location.state!=null && location.state.responseData!=null && location.state.ChartType!=null) {
      // Data available in location.state, set it in state and localStorage
      location.state.responseData.exporting= {enabled:false};
      setData(location.state.responseData);
      setType(location.state.ChartType);
      /* Store the data and type in sessionStorage */
      sessionStorage.setItem('myData', JSON.stringify(location.state.responseData));
      sessionStorage.setItem('myChartType', location.state.ChartType);
    } else if (storedData!=null && storedType!=null) {
      // Data available in localStorage, set it in state
      setData(JSON.parse(storedData));
      setType(storedType);
    }
  },[]);

  /* Function that runs when the store button is pressed */
  const handleStoreButton = async (event) => {
    event.preventDefault();
    // here goes the code that that calls the orchestrator to store the diagram and remove 1 quota.
    try{
      event.preventDefault();
      /* Make the data available for exporting in all supported formats */
      data.exporting.enabled = true;
      sessionStorage.setItem('myData', JSON.stringify(data));
      // here goes the code that that calls the orchestrator to store the diagram and remove 1 quota.
      const orchestratorResponse = await axios.post('http://'+config.orchestrator+':4000/storeChart/'+keycloak.idTokenParsed.email+'/'+type+'', data, {timeout:1000});
      if (orchestratorResponse.status===200){
        setStored(1);
      }
      else if(orchestratorResponse.status===204){
        setStored(-3);
        data.exporting.enabled = false;
        sessionStorage.setItem('myData', JSON.stringify(data));
      }
      /* If the user doesn't have enough credits, set stored to -1 */
      else if(orchestratorResponse.status===210){
        setStored(-1);
        data.exporting.enabled = false;
        sessionStorage.setItem('myData', JSON.stringify(data));
      }
    }
    /* If the orchestrator is not available, set stored to -2 */
    catch(error){
      setStored(-2);
      data.exporting.enabled = false;
      sessionStorage.setItem('myData', JSON.stringify(data));
    }
  };

  /* Function that runs when the back button is pressed */
  const handleBackButton = async (event) => {
    event.preventDefault();
    navigate('/newChart');
  };

  /* Wait for state of login to be determined */
  if(initialized){
    /* If the user is logged in, show the chart and the buttons */
    if(keycloak.authenticated){
      return(
        <div>
            {(data!==null && data.exporting!==null && !data.exporting.enabled) && <HighchartsReact highcharts={Highcharts} options={data}></HighchartsReact>}
            {data!==null && data.exporting!==null && data.exporting.enabled && <HighchartsReact highcharts={HighchartsStored} options={data}></HighchartsReact>}
            <br></br>
            <br></br>
            {data!==null && data.exporting!==null && !data.exporting.enabled && <button className="centered-button" onClick={handleStoreButton}>Store Chart</button>}
            <br></br>
            {data!==null && data.exporting!==null && !data.exporting.enabled && <button className="centered-button" onClick={handleBackButton}>Discard Chart</button>}
            {data!==null && data.exporting!==null && data.exporting.enabled && <button className="centered-button" onClick={handleBackButton}>Go Back</button>}

            <br></br>
            <br></br>
            {(stored===1) && <p style={{ color: 'green', fontWeight: 'bold', fontSize:'20px'}}>Chart has been successfully stored to your library!</p>}
            {(stored===-1) && <p style={{ color: 'red', fontWeight: 'bold', fontSize:'20px'}}>You don't have enough credits to perform this action. Please purchase some credits and try again.</p>}
            {(stored===-2) && <p style={{ color: 'red', fontWeight: 'bold', fontSize:'20px'}}>One or more services that are responsible for storing this chart are currently unavailable. Please try again later.</p>}
            {(stored===-3) && <p style={{ color: 'red', fontWeight: 'bold', fontSize:'20px'}}>You cannot store this chart with this title. You have already have a chart with this title in the database, please change the title</p>}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
      );
    }
    /* If the user is not logged in, show a message */
    else{
      return(<h2>You are not logged in. Please go to landing page in order to login.</h2>);
    }
  }
  /* If the state of login is not determined yet, show a loading spinner */
  else{
    return ( <LoadingSpinner/>);
  }
};
  
export default SuccessfulCreate;