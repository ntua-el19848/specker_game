/* This component is a scrollable table that is used in myCharts page to display the charts of a user */
import React, { useMemo,useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import fetchData from './makeData';
import axios from 'axios';
import { useKeycloak } from "@react-keycloak/web";
import config from "../config.json";

const ScrollableTable = () => {

  const {keycloak} = useKeycloak();
  const [tableData, setTableData] = useState([]);
  /* successCall state parameter to detect if we have an error from fetchind data or not */
  const [successCall, setSuccessCall] = useState(0);

  useEffect(() => {
    /* check if user is authenticated, 
       if so fetch data from fetchData function with email from keycloak as parameter */
    if(keycloak.authenticated){
      const fetchDataFromAPI = async () => {
        const data = await fetchData(keycloak.idTokenParsed.email);
        /* case of database error */
        if(data===-1){
          setSuccessCall(-1)
        }
        else{
          setSuccessCall(1)
          setTableData(data);
        } 
      };
      fetchDataFromAPI();
    }
  }, [keycloak.authenticated]);
  
  /* define the onClick function on table's row */
  const handleRowClick = async (row) => {
    try{
      const email = row.original.emailUser;
      const title = row.original.title;
      sessionStorage.setItem('myChart', null);
      // here goes the code that that calls the orchestrator to retrieve a json chart and store it on sessionStorage
      const orchestratorResponse = await axios.get('http://'+config.orchestrator+':4000/retrieveChart/'+email+'/'+title+'');
      /* we perform a reload to display the chart next to the table */
      if (orchestratorResponse.status===200){
        sessionStorage.setItem('myChart', JSON.stringify(orchestratorResponse.data[0]));
        window.location.reload();
      }
      else {
        sessionStorage.setItem('myChart', null);
      }
    }
    catch(error){
      sessionStorage.setItem('myChart', null);
    }
  }
  

  const columns = useMemo(
    () => [
      {
        accessorKey: 'typeFrontend',
        header: 'Type',
        size: 70,
      },
      {
        accessorKey: 'emailUser',
        header: 'Email',
      },
      {
        accessorKey: 'creationDate',
        header: 'Created On',
        size: 70,
      },
      {
        accessorKey: 'title',
        header: 'Title',
      }
    ],
    [],
  );
  /* Conditional rendering: if data for table is succesfully retrieved we display the table 
     (even if it has no records) */
  if(successCall==1){
    return (
      <MaterialReactTable /*className="ScrollableTable"*/
        columns={columns}
        data={tableData}
        columnS
        initialState={{ density: 'compact' }}
        enableDensityToggle={false}
        enableStickyHeader
        muiTableContainerProps={{ sx: { maxHeight: '200px'} }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row),
          sx: {
            cursor: 'pointer', //you might want to change the cursor too when adding an onClick
          },
        })}
        
      />
    );
  }
  /* Conditional rendering: if an error has occured and we cannot retrieved the data for the table.
     Instead we display an information message */
  else if(successCall==-1){
    return(
      <div>A database error occured, try to see your charts again later</div>
    );
  }
};


export default ScrollableTable;
