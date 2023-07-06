/* ErrorCreate Page. This page is loaded when you try to generate a chart and something goes wrong. */

/* Imports */
import React from 'react'
import { useKeycloak } from "@react-keycloak/web";
import LoadingSpinner from "../components/LoadingSpinner";

/* ErrorCreate Page */
function Error() {
  const { keycloak, initialized } = useKeycloak();
  let errorMessage = sessionStorage.getItem("errorMessage");
  if (errorMessage == null) {
    errorMessage = "Something Went Terribly Wrong";
  }

  /* Wait until Keycloak is initialized */
  if (initialized) {
    /* If the user is authenticated, return the page */
    if (keycloak.authenticated) {
      return (
        <div>
          <h1>Could not import the CSV to myCharts</h1>
          <h2>Error:</h2>
          <p>{errorMessage}</p>
        </div>
      );
    }
    /* If the user is not logged in, show a message */
    else {
      return (<h2>You are not logged in. Please go to landing page in order to login.</h2>);
    }
  }
  /* If the state of login is not determined yet, show a loading spinner */
  else {
    return (<LoadingSpinner />);
  }
}
export default Error;