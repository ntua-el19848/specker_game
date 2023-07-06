/* Page that provides the functionality of purchasing Credits.
   In this page a user can buy quotas (pick an amount of your choice among the available ones)
   We have to highlight that credits page is locked when a user is not authenticated with keycloak 
   or is not registered to our database */
import React, { useState } from "react";
import axios from 'axios';
import { useKeycloak } from "@react-keycloak/web";
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config.json";

const Credits = ({user}) => {
  const { keycloak, initialized } = useKeycloak();
  const [purchased, setPurchased] = useState(0);
  const [quotas, setQuotas] = useState(0);

  /* This function makes a call to orchestrator for purchasing credits for a user 
     It implements the onClick function of each button and taking the appropriate amount as parameter*/
  const BuyQuotas = async (amount) => {
    try {
      const responseFromUserQuotas = await axios.post('http://' + config.orchestrator + ':4000/purchaseQuotas', {
        email: keycloak.idTokenParsed.email, // here keycloak takes over!
        quotas: amount
      });
      if (responseFromUserQuotas.status === 200) {
        setPurchased(1);
        setQuotas(amount)
      }
      // Handle the response as needed
    } catch (error) {
      setPurchased(-1);
    }
  };

  /* Conditional rendering: if keycloak is initialized (display page) or not (display loading spinner) */
  if (initialized) {
    if (keycloak.authenticated) {
      if (user === 1 || user === 2) {
        return (
          <div>
            <h1>
              Credits page
            </h1>
            <h2>
              Choose an option to purchase the corresponding Quotas
            </h2>
            <button className="my-button" onClick={() => BuyQuotas(1)}>1 Credit</button>
            <br></br>
            <button className="my-button" onClick={() => BuyQuotas(2)}>2 Credits</button>
            <br></br>
            <button className="my-button" onClick={() => BuyQuotas(5)}>5 Credits</button>
            <br></br>
            <button className="my-button" onClick={() => BuyQuotas(10)}>10 Credits</button>
            {(purchased === 1) && <p style={{ color: 'green', fontWeight: 'bold', fontSize: '20px' }}>You have successfully purchased {quotas} Quota(s)</p>}
            {(purchased === -1) && <p style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}> Something went wrong with the purchase. Please try again!</p>}
          </div>
        );
      }
      else if (user === 0 || user === -1) {
        return (<h2>You are not registered. Please go to landing page in order to register.</h2>);
      }
    }
    else {
      return (<h2>You are not logged in. Please go to landing page in order to login.</h2>);
    }
  }
  else {
    return (<LoadingSpinner />);
  }
};

export default Credits;