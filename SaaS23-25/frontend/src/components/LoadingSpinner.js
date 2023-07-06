/* Loading Spinner component to diplay it when we have to wait for some data
   before we are ready to display a page. 
   One usually use case of it, is when we are waiting keycloak to be initialised */
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container" style={{margin:250}}>
      <div className="loading-spinner">
      </div>
    </div>
  );
}