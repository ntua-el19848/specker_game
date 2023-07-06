/* NewChart Page, this is the page you go to create a new chart */

/* Imports */
import React from "react";
import FileUploadComponent from '../components/FileUpload'
import ChartDemos from "../components/ChartDemos";
import { useKeycloak } from "@react-keycloak/web";
import LoadingSpinner from "../components/LoadingSpinner";

/* NewChart Page */
const NewChart = ({user}) => {
  /* Keycloak */
  const { keycloak, initialized } = useKeycloak();

  /* Wait until Keycloak is initialized */
  if(initialized){
    /* If the user is authenticated, return the page */
    if(keycloak.authenticated){
      if (user === 1 || user === 2) {
          return(
            <div>
                <ChartDemos />
                <br></br>
                <br></br>
                <div className="fileupload">
                  <FileUploadComponent />
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </div>
          );
      }
      /* If the user is not registered, return a message */
      else if(user === 0 || user === -1){
        return (<h2>You are not registered. Please go to landing page in order to register.</h2>);
      }
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

export default NewChart;