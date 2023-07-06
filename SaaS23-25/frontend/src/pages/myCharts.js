/* myCharts Page */

/* Imports */
import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useKeycloak } from '@react-keycloak/web';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsDependencyWheel from 'highcharts/modules/dependency-wheel';
import HighchartsNetworkGraph from 'highcharts/modules/networkgraph';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsSankey from 'highcharts/modules/sankey';
import ScrollableTable from '../components/ScrollableTable';
import LoadingSpinner from '../components/LoadingSpinner';

/* Highcharts modules */
HighchartsExporting(Highcharts);
HighchartsAccessibility(Highcharts);
HighchartsSankey(Highcharts);
HighchartsDependencyWheel(Highcharts);
HighchartsNetworkGraph(Highcharts);

/*  myCharts Page */
const MyCharts = ({user}) => {
  /* Parameters */
  const [jsonChart, setJsonChart] = useState(null);
  const {keycloak, initialized} = useKeycloak();

  useEffect(() => {
    // Retrieve data from session storage and update state
    const retrievedData = sessionStorage.getItem('myChart');
    if (retrievedData) {
      setJsonChart(JSON.parse(retrievedData));
    }
    else{
      setJsonChart(null);
    }
  }, []);
  
  /* Wait until Keycloak is initialized */
  if(initialized){
    /* If the user is authenticated, return the page */
    if(keycloak.authenticated){
      if (user === 1 || user === 2) {
        return(
          <div>
            <h2 style={{ textAlign:'center' }}>
            In the following table you can see information about all of your stored Charts.
            </h2>
            <h3 style={{ textAlign:'center' }}>
            Pick a chart of your choice in order to see a preview of it.<br/><br/>You can use the button on right top of chart to maximize the chart preview or to download the chart in a form of your choice.
            </h3>
            <div className='container'>
              <div className='ScrollableTable'>
                <ScrollableTable/>
              </div>
              <div className="chart-container">
              {(jsonChart!==null) && <HighchartsReact highcharts={Highcharts} options={jsonChart}></HighchartsReact>}
              </div>
            </div>
          </div>
        );
        }
        /* If the user is not registered, return a message */
        else if (user === 0 || user === -1) {
          return (<h2>You are not registered. Please go to landing page in order to register.</h2>);
        }
    }
    /* If the user is not logged in, show a message */
    else{
      return (<h2>You are not logged in. Please go to landing page in order to login.</h2>);
    }
  }
  /* If the state of login is not determined yet, show a loading spinner */
  else{
    return(
      <LoadingSpinner/>
    )
  }
};
  
export default MyCharts;