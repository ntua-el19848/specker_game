/* Landing page of the website. It is the first page that the user sees when he visits the website. */

/* Imports */
import React, {useState, useEffect} from "react";
import { useKeycloak } from "@react-keycloak/web";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import config from "../config.json";

/* Landing Page */
const Landing = ({user, setUser}) => {
  const { keycloak, initialized } = useKeycloak();
  const [registered, setRegistered] = useState(0);

  useEffect(() => {
    if (keycloak.authenticated) {
      handleSuccessfulLogin();
    }
  }, [keycloak.authenticated]);

  /* Function that runs after the page is loaded */
  async function handleSuccessfulLogin(){
    try{
      const response = await axios.get("http://"+config.orchestrator+":4000/getUser/"+keycloak.idTokenParsed.email+"");

      if (response.status === 200){
        // user exists
        setUser(1);
        sessionStorage.setItem("user", "1");
      }
      else if(response.status === 204){
        // user does not exists
        setUser(0);
        sessionStorage.setItem("user", "0");
      }
      else{
        // something went wrong
        setUser(-1); // state of user in db --> unknown
        sessionStorage.setItem("user", "-1");
      }
    }
    catch(error){
      // Handle the error
      setUser(-1);
      sessionStorage.setItem("user", "-1");
      console.error(error);
    }
  };

  /* Function that runs when the logout button is pressed */
  const handleLogoutButton = async (event) => {
    /*  Logs out of Keycloak  and sets lastLogin */
    event.preventDefault();
    try{
      /* Get the current time in specific format */
      let options = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };

    const formatter = new Intl.DateTimeFormat([], options);
    const currentTime = formatter.format(new Date());

    const lastloginresponse = await axios.post("http://"+config.orchestrator+":4000/lastLogin",{
      email: keycloak.idTokenParsed.email,
      lastLogin: currentTime,
    });

    if (lastloginresponse.status === 200){
      console.log("Last login updated");
    }
    else{
      // something went wrong
      console.log("Could not update last login");
    }
    }
    catch(error){
      // Handle the error
      console.error(error);
    }
    await keycloak.logout();
    sessionStorage.removeItem("user");
  };

  /* Function that runs when the login button is pressed */
  const handleLoginButton = async (event) => {
    event.preventDefault();
    keycloak.login();
  };

  /* Function that runs when the register button is pressed */
  const handleRegisterButton = async (event) => {
    event.preventDefault();
    try{
      /* Get the current time in specific format */
      let options = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };

      const formatter = new Intl.DateTimeFormat([], options);
      const currentTime = formatter.format(new Date());

      // check if the user exists
      const response = await axios.post("http://"+config.orchestrator+":4000/importUser",{
        name: keycloak.idTokenParsed.given_name,
        lastname: keycloak.idTokenParsed.family_name,
        lastLogin: currentTime,
        email: keycloak.idTokenParsed.email,
      });
      if (response.status === 200){
        // user now exists
        setUser(2);
        sessionStorage.setItem("user", "2");
      }
      else{
        // something went wrong
        setUser(-1); // state of user in db --> unknown
        sessionStorage.setItem("user", "-1");
      }
    }
    catch(error){
      setRegistered(-1); //could not register user
      console.log(error.message);
    }
  };
  
  /* The Actual Page that is Redndered * /

  /* Wait until Keycloak is initialized */
  if(initialized){
    return (
      <div>
       <div className="row">
          <div className="column">
            <div>
              <h1>Welcome to myCharts</h1>
              <h2>Join to our team and explore our website to create the charts you want!</h2>
            </div>
          </div>

          <div className="column">
            {/* if you are not logged in */}
            {!keycloak.authenticated && (
                    <button
                      type="button"
                      className="centered-button" style={{ marginRight: '50px' }}
                      onClick={handleLoginButton}
                    >
                    Login
                    </button>
              )}

              {/* if you are logged in --> insert google logout button */}
              {keycloak.authenticated && (
                <button
                  type="button"
                  className="centered-button" style={{ marginRight: '50px' }}
                  onClick={handleLogoutButton}
                >
                Logout
                </button>
              )}
          </div>
        </div>
        
        <br></br>

        {/* if you are logged in and you dont exist in db */}
        {(keycloak.authenticated && user===0) && (
          <div className="row">
            <div className="column">
              <h2>Please register to our service</h2>
            </div>

            <div className="column">
              <button
                  type="button"
                  className="centered-button" style={{ marginRight: '50px' }}
                  onClick={handleRegisterButton}
                >
                Register
              </button>
            </div>
          </div>
        )}

        {/* if you are logged in and you already exist in db */}
        {(keycloak.authenticated && user===1) && (
          <div>
            <h2 style={{ textAlign: "center" , fontSize: '30px' }}>Welcome Back {keycloak.idTokenParsed.given_name}</h2>
          </div>
        )}
        
        {/* if you just registered */}
        {(keycloak.authenticated && user===2) && (
          <h2>You just registered to our service!</h2>
        )}

        {/* if a problem in backend has occured and we cannot identify user state */}
        {(keycloak.authenticated && user===-1) && (
          <h2 style = {{ textAlign: "center" , fontSize: '30px' }}> Unfortunately an error in our backend has occured. Seems we cannot identify you right now, please try again later </h2>
        )}

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="banner">
          <h2 className="banner-text">A powerful chart-building software for analyzing your data</h2>

          <div className="photo-container">
            <img className="photo" src="https://img.freepik.com/free-photo/business-presentation-laptop-screen_53876-94704.jpg?w=1800&t=st=1688338813~exp=1688339413~hmac=a657e88d6a476da1873f6a1630c0e8260e0a021dc975a8727219102417b08d0d" alt="Photo 1" />
            <img className="photo" src="https://img.freepik.com/free-photo/business-people-working-laptop_53876-40330.jpg?w=1800&t=st=1688338869~exp=1688339469~hmac=90cc83e6b686132cb4bec71eae3ee754505e3c82265bf402498264879578bb23" alt="Photo 2" />
            <img className="photo" src="https://img.freepik.com/free-photo/contemporary-room-workplace-office-supplies-concept_53876-165288.jpg?w=1480&t=st=1688338929~exp=1688339529~hmac=39915f4e081d118b02912d642e59bc04d896bc7e7ab06c68e55577794ba22350" alt="Photo 3" />
          </div>
        </div>
      

        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
  /* If the state of login is not determined yet, show a loading spinner */
  else{
    return(
      <div>
        <div>
              <h1>Welcome to myCharts</h1>
              <h2>Register to our team and explore our website to create the charts you want!</h2>
        </div>
        <br></br>
        <LoadingSpinner/>
      </div>
    );
  }
};
  
export default Landing;

