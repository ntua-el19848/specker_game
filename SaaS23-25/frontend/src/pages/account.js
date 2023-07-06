/* Page that provides account information for a user.
   It has information about user's fullname,email, lastLogin and how much remaining credits does a user have. 
   We have to highlight that account page is locked when a user is not authenticated with keycloak 
   or is not registered to our database */
import React,{useState, useEffect} from "react";
import { useKeycloak } from "@react-keycloak/web";
import axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config.json";
  
const Account = ({user}) => {
  // user = 1 --> user exists in db
  // user = 0 --> does not exist in db
  // user = -1 --> unknown state
  // user = 2 --> you registered just now
  const { keycloak, initialized } = useKeycloak();
  const [quotas, setQuotas] = useState(0);
  const [lastLogin, setLastLogin] = useState("");

  /* if the user is authenticated we call two functions ,with email taken from keycloak as parameter, 
     that implements two orchestrator call. */
  useEffect(() => {
    if(keycloak.authenticated && user >=1){
      const fetchInfo = async () => {
        await retrieveQuotas(keycloak.idTokenParsed.email);
        await retrieveLastLogin(keycloak.idTokenParsed.email);
      };
      fetchInfo();
    }
  });
  /* This function makes a call to orchestrator for retrieving remaining credits of a user */
  const retrieveQuotas = async (email) => {
    try{
      const orchestratorResponse = await axios.get('http://'+config.orchestrator+':4000/remainingQuotas/'+email+'');
      /* if everything is ok we set Quotas from the http response */
      if (orchestratorResponse.status===200){
        setQuotas(orchestratorResponse.data);
      }
      /* if the status code is not equals with 200 we set Quotas to -1 to detect some problematic behavior */
      else {
        setQuotas(-1)
      }
    }
    catch(error){
      /* if an error occured we set Quotas to  -1 to detect some problematic behavior */
      setQuotas(-1)
    }
  }

  /* This function makes a call to orchestrator for retrieving last Login Date of a user */
  const retrieveLastLogin = async (email) => {
    try{
      const orchestratorResponse = await axios.get('http://'+config.orchestrator+':4000/getUser/'+email+'');
      if (orchestratorResponse.status===200){
        setLastLogin(orchestratorResponse.data[0].lastLogin);
        console.log(orchestratorResponse.data[0].lastLogin);
      }
      else {
        setLastLogin("-1")
      }
    }
    catch(error){
      setLastLogin("-1")
    }
  }

  /* Conditional rendering: if keycloak is initialized (display page) or not (display loading spinner) */
  if(initialized){
    if(keycloak.authenticated){
      if(user===1 || user===2){
        return(
          <div>
              <h2 style={{ textAlign:'left' }}>Fullname: {keycloak.idTokenParsed.name}</h2>
              <br></br>
              <h2 style={{ textAlign:'left' }}>Email: {keycloak.idTokenParsed.email}</h2>
              <br></br>
              {(lastLogin!=-1) &&
                <h2 style={{ textAlign:'left' }}>Last Login: {lastLogin}</h2>
              }
              {(lastLogin==-1) &&
                <h2 style={{ textAlign:'left' }}>Last Login: A problem with the database occured, please try to see your last login later</h2>
              }
              <br></br>
              {(quotas!=-1) && 
                <h2 style={{ textAlign:'left' }}>Remaining Credits: {quotas}</h2>
              }
              {(quotas==-1) && 
                <h2 style={{ textAlign:'left' }}>Remaining Credits: A problem with the database occured, please try to see your credits later</h2>
              }
              <br></br>
               <h3 style={{ textAlign:'left' }}>To buy some more Credits go to Credits page and get them!</h3>
            </div>
        );
      }
      else if(user===0 || user===-1){
        return(<h2>You are not registered. Please go to landing page in order to register.</h2>);
      }
    }
    else{
      return(<h2>You are not logged in. Please go to landing page in order to login.</h2>);
    }
  }
  else{
    return ( <LoadingSpinner/>);
  }
};
  
export default Account;